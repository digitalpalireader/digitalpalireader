'use strict';

var DPRComponentRegistry = (function () {
  const componentTypeTranslation = 'translation'
  const componentTypeTipitaka = 'tipitaka'
  const componentTypeLanguage = 'language'

  const registry = [
    {
      id: 'my',
      name: 'Myanmar',
      shortDescription: 'mūla, aṭṭhakathā, tīkā',
      capture: ({url}) => url.origin === self.location.origin && /^\/tipitaka\/my\//i.test(url.pathname),
      isAvailable: () => true,
      type: componentTypeTipitaka,
      sizeMB: 113,
      getFileList: async () => {
        await DPR_PAL.addOneJS('/components/tipitaka/my/my_list.js')
        return DPR_G.myFiles.map(f => `/tipitaka/my/${f}.xml`)
      },
    },
    {
      id: 'th',
      name: 'Thai',
      shortDescription: 'mūla',
      capture: ({url}) => url.origin === self.location.origin && /^\/tipitaka\/th\//i.test(url.pathname),
      isAvailable: () => true,
      type: componentTypeTipitaka,
      sizeMB: 21,
      getFileList: async () => {
        await DPR_PAL.addOneJS('/components/tipitaka/th/th_list.js')
        return DPR_G.thFiles.map(f => `/tipitaka/th/${f}.xml`)
      },
    },
    {
      id: 'en',
      name: 'English',
      shortDescription: 'PED, CPED & DPPN',
      capture: ({url}) => url.origin === self.location.origin && /^\/en\//i.test(url.pathname),
      isAvailable: () => true,
      type: componentTypeLanguage,
      sizeMB: 19,
      getFileList: async () => {
        await DPR_PAL.addOneJS('/components/language/en/en_list.js')
        return DPR_G.enFiles.map(f => `/en/${f}`)
      },
    },
    {
      id: 'sa',
      name: 'Sanskrit',
      shortDescription: 'dictionary & roots',
      capture: ({url}) => url.origin === self.location.origin && /^\/sa\//i.test(url.pathname),
      isAvailable: () => true,
      type: componentTypeLanguage,
      sizeMB: 94,
      getFileList: async () => {
        await DPR_PAL.addOneJS('/components/language/sa/sa_list.js')
        return DPR_G.saFiles.map(f => `/sa/${f}`)
      },
    },
    {
      id: 'bt',
      name: 'Buddhist Texts',
      shortDescription: '',
      capture: ({url}) => url.origin === self.location.origin && /^\/_translations\/bt-/i.test(url.pathname),
      isAvailable: () => !!DPR_G.DPR_prefs['buddhist_texts'] && !!DPR_G.DPR_prefs['btloc'],
      type: componentTypeTranslation,
      sizeMB: 53,
      getFileList: async () => {
        await DPR_PAL.addOneJS('/components/translation/bt/bt_list.js')
        return DPR_G.btFiles.map(x => `${DPR_Translations.trProps.bt.baseUrl}/${x}`)
      },
    },
    {
      id: 'dt',
      name: 'DhammaTalks',
      shortDescription: '',
      capture: ({url}) => url.origin === self.location.origin && /^\/_translations\/dt\//i.test(url.pathname),
      isAvailable: () => true,
      type: componentTypeTranslation,
      sizeMB: 22,
      getFileList: async () => {
        await DPR_PAL.addOneJS('/components/translation/dt/dt_list.js')
        return DPR_G.dtFiles.map(x => `${DPR_Translations.trProps.dt.baseUrl}/${x}`)
      },
    },
    {
      id: 'ati',
      name: 'Access to Insight',
      shortDescription: '',
      capture: ({url}) => url.origin === self.location.origin && /^\/_translations\/ati\//i.test(url.pathname),
      isAvailable: () => true,
      type: componentTypeTranslation,
      sizeMB: 6,
      getFileList: async () => {
        await DPR_PAL.addOneJS('/components/translation/ati/ati_list.js')
        return DPR_G.atiFiles.map(x => `${DPR_Translations.trProps.ati.baseUrl}/${x}`);
      },
    },
  ]

  const getComponentFromId = id => registry.find(c => c.id === id)

  const componentInstallDoneMarkerKeyName = id => `Component: ${getComponentFromId(id).name} installed`

  const isComponentInstalled = id => !!localStorage[componentInstallDoneMarkerKeyName(id)]

  const getComponentCacheName = id => {
    const prefix = getComponentFromId(id).type === componentTypeLanguage ? 'lang' : getComponentFromId(id).type

    return `${prefix}-${id}`
  }

  const componentToVM = c => {
    const description = c.shortDescription ? ` (${c.shortDescription})` : ''

    return {
      id: c.id,
      name: c.name,
      sizeMB: c.sizeMB,
      install: ko.observable(isComponentInstalled(c.id)),
      getName: _ => `${c.name} ${c.type}${description} [download ${Math.ceil(c.sizeMB * 0.2)}MB, uncompressed on disk ${c.sizeMB}MB]`,
    }
  }

  const getAvailableComponentVMs = () => registry.filter(c => c.isAvailable()).map(componentToVM)

  return {
    getComponentFromId: getComponentFromId,
    componentInstallDoneMarkerKeyName: componentInstallDoneMarkerKeyName,
    isComponentInstalled: isComponentInstalled,
    getComponentCacheName: getComponentCacheName,
    getAvailableComponentVMs: getAvailableComponentVMs,
    registry: Object.freeze(registry),
  }
})()

class InstallationViewModel {
  constructor() {
    this.components = ko.observableArray()

    this.componentsToInstall = ko.pureComputed(function() {
      return this.components().filter(c => !DPRComponentRegistry.isComponentInstalled(c.id) && c.install())
    }, this)

    this.componentsToUninstall = ko.pureComputed(function() {
      return this.components().filter(c => DPRComponentRegistry.isComponentInstalled(c.id) && !c.install())
    }, this)
  }

  showInstallationDialog() {
    this.components(DPRComponentRegistry.getAvailableComponentVMs())

    if (!__dprViewModel.installationOngoing()) {
      $('#installation-dialog-root').modal('show')
    }
  }

  async applyChanges() {
    const toastDisplayTimeMS = 600000
    try {
      this.initializeInstall()

      await this.installAllComponents(this.componentsToInstall())
      await this.uninstallAllComponents(this.componentsToUninstall())

      DPR_Chrome.showSuccessToast('Installation completed successfully. You can now disconnect from the network and use DPR offline.', toastDisplayTimeMS)
    } catch (e) {
      console.error('Error during install', e)
      DPR_Chrome.showErrorToast('Installation failed. Please ensure the following and try the same steps again. <br><ul><li>Device is connected to the network</li><li>Ad or content blockers such as uBlock are not active</li></ul>Download will resume from the point of error.', toastDisplayTimeMS)
    }

    this.finalizeInstall()
  }

  initializeInstall() {
    const toastDisplayTimeMS = 60000
    DPR_Chrome.showSuccessToast('Installing DPR for offline use. You may continue to work as per usual. You will be notified once installation is completed. Please stay connected to the network till then.', toastDisplayTimeMS)
    __dprViewModel.installationOngoing(true)
    this.updateProgressBar(0)
  }

  finalizeInstall() {
    this.updateProgressBar(100)
    __dprViewModel.installationOngoing(false)
  }

  updateProgressBar(percentDone) {
    __dprViewModel.installationBarWidth(percentDone + '%');
    __dprViewModel.installationBar(Math.round(percentDone) + '%');
  }

  async installAllComponents(components) {
    const tasks = components.map(c => DPRComponentRegistry.getComponentFromId(c.id).getFileList().then(fileList => ({ id: c.id, fileList })))
    const componentInfos = await Promise.all(tasks)
    const totalFiles = componentInfos.reduce((acc, e) => acc + e.fileList.length, 0)
    let filesDownloaded = 0
    for (let i = 0; i < componentInfos.length; i++) {
      filesDownloaded = await this.installOneComponent(componentInfos[i], filesDownloaded, totalFiles)
    }
  }

  async installOneComponent(componentInfo, filesDownloaded, totalFiles) {
    const component = DPRComponentRegistry.getComponentFromId(componentInfo.id)
    const cache = await caches.open(DPRComponentRegistry.getComponentCacheName(component.id))
    for (let i = 0; i < componentInfo.fileList.length; i++) {
      if (!(await cache.match(componentInfo.fileList[i]))) {
        await this.retryFunction(() => cache.add(componentInfo.fileList[i]))
      }

      filesDownloaded += 1
      if (filesDownloaded % Math.floor(totalFiles / 100) === 0) {
        this.updateProgressBar(filesDownloaded / totalFiles * 100)
      }
    }

    localStorage[DPRComponentRegistry.componentInstallDoneMarkerKeyName(component.id)] = true

    return filesDownloaded
  }

  async uninstallAllComponents(components) {
    for (let i = 0; i < components.length; i++) {
      await this.uninstallOneComponent(components[i]);
    }
  }

  async uninstallOneComponent(component) {
    try {
      localStorage.removeItem(DPRComponentRegistry.componentInstallDoneMarkerKeyName(component.id))

      if (await caches.has(DPRComponentRegistry.getComponentCacheName(component.id))) {
        await caches.delete(DPRComponentRegistry.getComponentCacheName(component.id))
      }
    } catch (e) {
      console.warn('Failed to uninstall component', component, e)
    }
  }

  async retryFunction(asyncFn, maxRetries = 3) {
    for (let retryCount = 0; ; retryCount++) {
      let error = null

      try {
        await asyncFn()
      } catch (e) {
        error = e
      }

      if (error) {
        if (retryCount < maxRetries) {
          continue
        } else {
          console.warn('Hit error too many times, giving up', error, maxRetries, retryCount)
          throw error
        }
      } else {
        break
      }
    }
  }
}
