import * as DprGlobals from '../../dpr_globals.js'

///
/// NOTE: Do not import any other modules into this module as it also consumed by service worker.
///

const componentTypeTranslation = 'translation'
const componentTypeTipitaka = 'tipitaka'
const componentTypeLanguage = 'language'

// eslint-disable-next-line no-use-before-define
const self = window || self

export const registry = [
  {
    id: 'my',
    name: 'Myanmar',
    shortDescription: 'mūla, aṭṭhakathā, tīkā',
    capture: ({ url }) => url.origin === self.location.origin && /^\/tipitaka\/my\//i.test(url.pathname),
    isAvailable: () => true,
    type: componentTypeTipitaka,
    sizeMB: 113,
    getFileList: async () => {
      const files = await import('../../../components/tipitaka/my/my_list.js')
      return files.map((f) => `/tipitaka/my/${f}.xml`)
    },
  },
  {
    id: 'th',
    name: 'Thai',
    shortDescription: 'mūla',
    capture: ({ url }) => url.origin === self.location.origin && /^\/tipitaka\/th\//i.test(url.pathname),
    isAvailable: () => true,
    type: componentTypeTipitaka,
    sizeMB: 21,
    getFileList: async () => {
      const files = await import('../../../components/tipitaka/th/th_list.js')
      return files.map((f) => `/tipitaka/th/${f}.xml`)
    },
  },
  {
    id: 'en',
    name: 'English',
    shortDescription: 'PED, CPED & DPPN',
    capture: ({ url }) => url.origin === self.location.origin && /^\/en\//i.test(url.pathname),
    isAvailable: () => true,
    type: componentTypeLanguage,
    sizeMB: 19,
    getFileList: async () => {
      const files = await import('../../../components/language/en/en_list.js')
      return files.map((f) => `/en/${f}`)
    },
  },
  {
    id: 'sa',
    name: 'Sanskrit',
    shortDescription: 'dictionary & roots',
    capture: ({ url }) => url.origin === self.location.origin && /^\/sa\//i.test(url.pathname),
    isAvailable: () => true,
    type: componentTypeLanguage,
    sizeMB: 94,
    getFileList: async () => {
      const files = await import('../../../components/language/sa/sa_list.js')
      return files.map((f) => `/sa/${f}`)
    },
  },
  {
    id: 'bt',
    name: 'Buddhist Texts',
    shortDescription: '',
    capture: ({ url }) => url.origin === self.location.origin && /^\/_external\/translations\/bt-/i.test(url.pathname),
    isAvailable: () => true,
    type: componentTypeTranslation,
    sizeMB: 53,
    getFileList: async () => {
      const files = await import('../../../components/translation/bt/bt_list.js')
      return files.map((x) => `${DprGlobals.singleton.BTTranslationsBaseUrl}/${x}`)
    },
  },
  {
    id: 'dt',
    name: 'DhammaTalks',
    shortDescription: '',
    capture: ({ url }) => url.origin === self.location.origin && /^\/_external\/translations\/dt\//i.test(url.pathname),
    isAvailable: () => true,
    type: componentTypeTranslation,
    sizeMB: 22,
    getFileList: async () => {
      const files = await import('../../../components/translation/dt/dt_list.js')
      return files.dtFiles.map((x) => `${DprGlobals.singleton.DTTranslationsBaseUrl}/${x}`)
    },
  },
  {
    id: 'ati',
    name: 'Access to Insight',
    shortDescription: '',
    capture: ({ url }) => url.origin === self.location.origin && /^\/_external\/translations\/ati\//i.test(url.pathname),
    isAvailable: () => true,
    type: componentTypeTranslation,
    sizeMB: 6,
    getFileList: async () => {
      const files = await import('../../../components/translation/ati/ati_list.js')
      return files.map((x) => `${DprGlobals.singleton.ATITranslationsBaseUrl}/${x}`)
    },
  },
]

export const getComponentFromId = (id) => registry.find((c) => c.id === id)

export const componentInstallDoneMarkerKeyName = (id) => `Component: ${getComponentFromId(id).name} installed`

export const isComponentInstalled = (id) => !!localStorage[componentInstallDoneMarkerKeyName(id)]

export const getComponentCacheName = (id) => {
  const prefix = getComponentFromId(id).type === componentTypeLanguage ? 'lang' : getComponentFromId(id).type

  return `${prefix}-${id}`
}

const componentToVM = (c) => {
  const description = c.shortDescription ? ` (${c.shortDescription})` : ''

  return {
    id: c.id,
    name: c.name,
    sizeMB: c.sizeMB,
    install: ko.observable(isComponentInstalled(c.id)),
    getName: (_) => `${c.name} ${c.type}${description} [download ${Math.ceil(c.sizeMB * 0.2)}MB, uncompressed on disk ${c.sizeMB}MB]`,
  }
}

export const getAvailableComponentVMs = () => registry.filter((c) => c.isAvailable()).map(componentToVM)
