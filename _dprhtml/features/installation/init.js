'use strict';

var DPRComponentRegistry = (function () {
  const componentTypeTranslation = 'translation'
  const componentTypeTipitaka = 'tipitaka'
  const componentTypeLanguage = 'language'

  const registry = [
    {
      id: 'my',
      name: 'Myanmar tipitaka (with commentary and sub-commentary)',
      shortDescription: '',
      routeRegExp: ({url}) => url.origin === self.location.origin && /^\/tipitaka\/my\//i.test(url.pathname),
      isAvailable: () => true,
      type: componentTypeTipitaka,
      sizeMB: 113,
      getFileList: async () => {
        // TODO: Generate this list from during the build process.
        const myFiles = ['a10a','a10m','a10t','a11a','a11m','a11t','a1a','a1m','a1t','a2a','a2m','a2t','a3a','a3m','a3t','a4a','a4m','a4t','a5a','a5m','a5t','a6a','a6m','a6t','a7a','a7m','a7t','a8a','a8m','a8t','a9a','a9m','a9t','b1m','b2m','d1a','d1m','d1t','d2a','d2m','d2t','d3a','d3m','d3t','g1m','g2m','g3m','g4m','g5m','k10a','k10m','k11m','k12a','k12m','k13a','k13m','k14a','k14m','k15a','k15m','k16m','k17m','k18m','k19m','k1a','k1m','k20m','k21m','k2a','k2m','k3a','k3m','k4a','k4m','k5a','k5m','k6a','k6m','k7a','k7m','k8a','k8m','k9a','k9m','m1a','m1m','m1t','m2a','m2m','m2t','m3a','m3m','m3t','n1m','n2m','n3m','n4m','n5m','n6m','n7m','n8m','n9m','s1a','s1m','s1t','s2a','s2m','s2t','s3a','s3m','s3t','s4a','s4m','s4t','s5a','s5m','s5t','v10t','v11t','v12t','v13t','v14t','v15t','v16t','v17t','v18t','v1a','v1m','v1t','v2a','v2m','v2t','v3a','v3m','v3t','v4a','v4m','v4t','v5a','v5m','v5t','v6a','v6m','v6t','v7t','v8t','v9t','x1a','x1m','x2a','x2m','y10m','y11m','y12m','y13m','y14m','y1a','y1m','y1t','y2a','y2m','y2t','y3a','y3m','y3t','y4a','y4m','y4t','y5a','y5m','y5t','y6a','y6m','y6t','y7m','y8m','y9a','y9m','y9t',]
        return myFiles.map(f => `/tipitaka/my/${f}.xml`)
      },
    },
    {
      id: 'th',
      name: 'Thai tipitaka (with commentary and sub-commentary)',
      shortDescription: '',
      routeRegExp: ({url}) => url.origin === self.location.origin && /^\/tipitaka\/th\//i.test(url.pathname),
      isAvailable: () => true,
      type: componentTypeTipitaka,
      sizeMB: 21,
      getFileList: async () => {
        // TODO: Generate this list from during the build process.
        const thFiles = ['a10m','a11m','a1m','a2m','a3m','a4m','a5m','a6m','a7m','a8m','a9m','d1m','d2m','d3m','k1m','k2m','k3m','k4m','k5m','m1m','m2m','m3m','s1m','s2m','s3m','s4m','s5m','v1m','v2m','v3m','v4m','v5m','v6m',]
        return thFiles.map(f => `/tipitaka/th/${f}.xml`)
      },
    },
    {
      id: 'en',
      name: 'English language (dictionaries PED, CPED, DPPN)',
      shortDescription: '',
      routeRegExp: ({url}) => url.origin === self.location.origin && /^\/en\//i.test(url.pathname),
      isAvailable: () => true,
      type: componentTypeLanguage,
      sizeMB: 19,
      getFileList: async () => {
        const pedArr = Array.from({ length: 5 }, (_, k)=> k).map(n => `/en/ped/${n}/ped.xml`)
        const cepdArr = '/en/cepd/index.js'
        const cpedArr = '/en/cped/index.js'
        const dppnArr = Array.from({ length: 10 }, (_, k)=> k+1).map(n => `/en/dppn/${n}.xml`).concat('/en/dppn/abbrev.xml')
        return [].concat(...[pedArr, cepdArr, cpedArr, dppnArr])
      },
    },
    {
      id: 'sa',
      name: 'Sanskrit language (dictionary and roots)',
      shortDescription: '',
      routeRegExp: ({url}) => url.origin === self.location.origin && /^\/sa\//i.test(url.pathname),
      isAvailable: () => true,
      type: componentTypeLanguage,
      sizeMB: 94,
      getFileList: async () => {
        await DPR_PAL.addOneJS('/components/sa/sa_dict_list.js')
        await DPR_PAL.addOneJS('/components/sa/sa_roots_list.js')
        const saDictPath = '/sa/dict'
        const saRootsPath = '/sa/roots'
        const saDictFiles = DPR_G.saDictFiles.map(x => `${saDictPath}/${x}`)
        const saRootsFiles = DPR_G.saRootsFiles.map(x => `${saRootsPath}/${x}`)
        return [].concat(...[saDictFiles, saRootsFiles])
      },
    },
    {
      id: 'bt',
      name: 'Buddhist Texts',
      shortDescription: '',
      routeRegExp: /digitalpalireader\.online\/bt-/i,
      isAvailable: () => !!DPR_G.DPR_prefs['buddhist_texts'] && !!DPR_G.DPR_prefs['btloc'],
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
      shortDescription: '',
      routeRegExp: /digitalpalireader\.online\/dt\/suttas/i,
      isAvailable: () => true,
      type: componentTypeTranslation,
      sizeMB: 22,
      getFileList: async () => {
        await DPR_PAL.addOneJS('/components/dt/translations_list.js')
        return DPR_G.dtUrlsToPrefetch.map(x => `${DPR_Translations.trProps.dt.baseUrl}/${x}`)
      },
    },
    {
      id: 'ati',
      name: 'Access to Insight',
      shortDescription: '',
      routeRegExp: /digitalpalireader\.online\/ati\/tipitaka/i,
      isAvailable: () => true,
      type: componentTypeTranslation,
      sizeMB: 6,
      getFileList: async () => {
        await DPR_PAL.addOneJS('/_dprhtml/js/ati_list.js')
        return [].concat(...[DPR_G.atiD, DPR_G.atiM, DPR_G.atiS, DPR_G.atiA, DPR_G.atiK, DPR_G.atiV]).map(c => `${DPR_Translations.trProps.ati.baseUrl}/tipitaka/${c}`);
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
    getName: _ => `${c.name} ${c.type} ${c.shortDescription}[download ${Math.ceil(c.sizeMB * 0.2)}MB, uncompressed on disk ${c.sizeMB}MB]`,
  })

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
      DPR_Chrome.showErrorToast('Installation failed. Please try the same steps again.', toastDisplayTimeMS)
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
