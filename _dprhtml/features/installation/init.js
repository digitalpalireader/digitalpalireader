import * as DprGlobals from '../../dpr_globals.js'
import * as DprVM from '../../js/dprviewmodel.js'
import * as DprComponentRegistry from './component-registry.js'

export class InstallationViewModel {
  constructor() {
    this.components = ko.observableArray()

    this.componentsToInstall = ko.pureComputed(function() {
      return this.components().filter(c => !DprComponentRegistry.isComponentInstalled(c.id) && c.install())
    }, this)

    this.componentsToUninstall = ko.pureComputed(function() {
      return this.components().filter(c => DprComponentRegistry.isComponentInstalled(c.id) && !c.install())
    }, this)
  }

  showInstallationDialog() {
    this.components(DprComponentRegistry.getAvailableComponentVMs())

    if (!DprVM.ViewModel.installationOngoing()) {
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
    DprVM.ViewModel.installationOngoing(true)
    this.updateProgressBar(0)
  }

  finalizeInstall() {
    this.updateProgressBar(100)
    DprVM.ViewModel.installationOngoing(false)
  }

  updateProgressBar(percentDone) {
    DprVM.ViewModel.installationBarWidth(percentDone + '%');
    DprVM.ViewModel.installationBar(Math.round(percentDone) + '%');
  }

  async installAllComponents(components) {
    const tasks = components.map(c => DprComponentRegistry.getComponentFromId(c.id).getFileList().then(fileList => ({ id: c.id, fileList })))
    const componentInfos = await Promise.all(tasks)
    const totalFiles = componentInfos.reduce((acc, e) => acc + e.fileList.length, 0)
    let filesDownloaded = 0
    for (let i = 0; i < componentInfos.length; i++) {
      filesDownloaded = await this.installOneComponent(componentInfos[i], filesDownloaded, totalFiles)
    }
  }

  async installOneComponent(componentInfo, filesDownloaded, totalFiles) {
    const component = DprComponentRegistry.getComponentFromId(componentInfo.id)
    const cache = await caches.open(DprComponentRegistry.getComponentCacheName(component.id))
    for (let i = 0; i < componentInfo.fileList.length; i++) {
      if (!(await cache.match(componentInfo.fileList[i]))) {
        await this.retryFunction(() => cache.add(componentInfo.fileList[i]))
      }

      filesDownloaded += 1
      if (filesDownloaded % Math.floor(totalFiles / 100) === 0) {
        this.updateProgressBar(filesDownloaded / totalFiles * 100)
      }
    }

    localStorage[DprComponentRegistry.componentInstallDoneMarkerKeyName(component.id)] = true

    return filesDownloaded
  }

  async uninstallAllComponents(components) {
    for (let i = 0; i < components.length; i++) {
      await this.uninstallOneComponent(components[i]);
    }
  }

  async uninstallOneComponent(component) {
    try {
      localStorage.removeItem(DprComponentRegistry.componentInstallDoneMarkerKeyName(component.id))

      if (await caches.has(DprComponentRegistry.getComponentCacheName(component.id))) {
        await caches.delete(DprComponentRegistry.getComponentCacheName(component.id))
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

export const ViewModel = new InstallationViewModel();
DprGlobals.singleton.InstallationViewModel = ViewModel
