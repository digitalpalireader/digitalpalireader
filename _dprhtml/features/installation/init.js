/* eslint-disable no-await-in-loop */
import * as DprGlobals from '../../dpr_globals.js'
import * as DprVM from '../../js/dprviewmodel.js'
import * as DprComponentRegistry from './component-registry.js'

export class InstallationViewModel {
  constructor() {
    this.components = ko.observableArray()

    this.componentsToInstall = ko.pureComputed(function _() {
      return this.components().filter((c) => !DprComponentRegistry.isComponentInstalled(c.id) && c.install())
    }, this)

    this.componentsToUninstall = ko.pureComputed(function _() {
      return this.components().filter((c) => DprComponentRegistry.isComponentInstalled(c.id) && !c.install())
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
      InstallationViewModel.initializeInstall()

      await InstallationViewModel.installAllComponents(this.componentsToInstall())
      await InstallationViewModel.uninstallAllComponents(this.componentsToUninstall())

      window.DPR_Chrome.showSuccessToast(
        'Installation completed successfully. You can now disconnect from the network and use DPR offline.',
        toastDisplayTimeMS,
      )
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Error during install', e)
      window.DPR_Chrome.showErrorToast(
        // eslint-disable-next-line max-len
        'Installation failed. Please ensure the following and try the same steps again. <br><ul><li>Device is connected to the network</li><li>Ad or content blockers such as uBlock are not active</li></ul>Download will resume from the point of error.',
        toastDisplayTimeMS,
      )
    }

    InstallationViewModel.finalizeInstall()
  }

  static initializeInstall() {
    const toastDisplayTimeMS = 60000
    window.DPR_Chrome.showSuccessToast(
      // eslint-disable-next-line max-len
      'Installing DPR for offline use. You may continue to work as per usual. You will be notified once installation is completed. Please stay connected to the network till then.',
      toastDisplayTimeMS,
    )
    DprVM.ViewModel.installationOngoing(true)
    InstallationViewModel.updateProgressBar(0)
  }

  static finalizeInstall() {
    InstallationViewModel.updateProgressBar(100)
    DprVM.ViewModel.installationOngoing(false)
  }

  static updateProgressBar(percentDone) {
    DprVM.ViewModel.installationBarWidth(`${percentDone}%`)
    DprVM.ViewModel.installationBar(`${Math.round(percentDone)}%`)
  }

  static async installAllComponents(components) {
    const tasks = components.map(
      (c) => DprComponentRegistry.getComponentFromId(c.id).getFileList().then((fileList) => ({ id: c.id, fileList })),
    )
    const componentInfos = await Promise.all(tasks)
    const totalFiles = componentInfos.reduce((acc, e) => acc + e.fileList.length, 0)
    let filesDownloaded = 0
    for (let i = 0; i < componentInfos.length; i += 1) {
      filesDownloaded = await InstallationViewModel.installOneComponent(componentInfos[i], filesDownloaded, totalFiles)
    }
  }

  static async installOneComponent(componentInfo, filesDownloaded, totalFiles) {
    const component = DprComponentRegistry.getComponentFromId(componentInfo.id)
    const cache = await caches.open(DprComponentRegistry.getComponentCacheName(component.id))
    let totalFilesDownloaded = filesDownloaded
    for (let i = 0; i < componentInfo.fileList.length; i += 1) {
      if (!(await cache.match(componentInfo.fileList[i]))) {
        await InstallationViewModel.retryFunction(() => cache.add(componentInfo.fileList[i]))
      }

      totalFilesDownloaded += 1
      if (totalFilesDownloaded % Math.floor(totalFiles / 100) === 0) {
        InstallationViewModel.updateProgressBar((totalFilesDownloaded / totalFiles) * 100)
      }
    }

    localStorage[DprComponentRegistry.componentInstallDoneMarkerKeyName(component.id)] = true

    return totalFilesDownloaded
  }

  static async uninstallAllComponents(components) {
    for (let i = 0; i < components.length; i += 1) {
      await InstallationViewModel.uninstallOneComponent(components[i])
    }
  }

  static async uninstallOneComponent(component) {
    try {
      localStorage.removeItem(DprComponentRegistry.componentInstallDoneMarkerKeyName(component.id))

      if (await caches.has(DprComponentRegistry.getComponentCacheName(component.id))) {
        await caches.delete(DprComponentRegistry.getComponentCacheName(component.id))
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Failed to uninstall component', component, e)
    }
  }

  static async retryFunction(asyncFn, maxRetries = 3) {
    for (let retryCount = 0; ; retryCount += 1) {
      let error = null

      try {
        await asyncFn()
      } catch (e) {
        error = e
      }

      if (error) {
        if (retryCount < maxRetries) {
          // eslint-disable-next-line no-continue
          continue
        } else {
          // eslint-disable-next-line no-console
          console.warn('Hit error too many times, giving up', error, maxRetries, retryCount)
          throw error
        }
      } else {
        break
      }
    }
  }
}

export const ViewModel = new InstallationViewModel()
DprGlobals.singleton.InstallationViewModel = ViewModel
