'use strict';

var DPRComponentRegistry = (function () {
  const componentTypeTranslation = 'translation'
  const componentTypeTipitaka = 'tipitaka'
  const componentTypeLanguage = 'lang'

  const registry = [
    {
      id: 'bt',
      name: 'Buddhist Texts',
      available: !!DPR_G.DPR_prefs['buddhist_texts'] && !!DPR_G.DPR_prefs['btloc'],
      type: componentTypeTranslation,
      sizeMB: 53,
      getFileList: async () => {
        await DPR_PAL.addOneJS('/components/bt/translations_list.js')
        return DPR_G.btUrlsToPrefetch.map(x => `${DPR_Translations.trProps.bt.baseUrl}/${x}`)
      },
    },
    {
      id: 'dt',
      name: 'DhammaTalks',
      available: true,
      type: componentTypeTranslation,
      sizeMB: 15,
      getFileList: async () => {
        await DPR_PAL.addOneJS('/components/dt/translations_list.js')
        return DPR_G.dtUrlsToPrefetch.map(x => `${DPR_Translations.trProps.dt.baseUrl}/${x}`)
      },
    },
  ]

  const getComponentFromId = id => registry.find(c => c.id === id)

  const componentInstallDoneMarkerKeyName = id => `Component: ${getComponentFromId(id).name} installed`

  const isComponentInstalled = id => !!localStorage[componentInstallDoneMarkerKeyName(id)]

  const getComponentCacheName = id => `${getComponentFromId(id).type}-${id}`

  const componentToVM = c => ({
    id: c.id,
    name: c.name,
    sizeMB: c.sizeMB,
    install: ko.observable(isComponentInstalled(c.id)),
    getName: _ => `${c.name} ${c.type} [${c.sizeMB} MB]`,
  })

  const getAvailableComponentVMs = () => registry.filter(c => c.available).map(componentToVM)

  return {
    getComponentFromId: getComponentFromId,
    componentInstallDoneMarkerKeyName: componentInstallDoneMarkerKeyName,
    isComponentInstalled: isComponentInstalled,
    getComponentCacheName: getComponentCacheName,
    getAvailableComponentVMs: getAvailableComponentVMs,
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
    try {
      this.initializeInstall()

      await this.installAllComponents(this.componentsToInstall())
      await this.uninstallAllComponents(this.componentsToUninstall())

      DPR_Chrome.showSuccessToast('Installation completed successfully. You can now disconnect from the network and use DPR offline.', 600000)
    } catch (e) {
      console.error('Error during install', e)
      DPR_Chrome.showErrorToast('Installation failed. Please try again.')
    }

    this.finalizeInstall()
  }

  initializeInstall() {
    DPR_Chrome.showSuccessToast('Installing DPR for offline use. You can continue to work as usual. You will be notified once installation is completed. Please stay connected to the network till then.')
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
        await cache.add(componentInfo.fileList[i])
      }

      this.updateProgressBar(filesDownloaded++ / totalFiles * 100)
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
}
