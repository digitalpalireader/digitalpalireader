/* eslint-disable no-param-reassign */
const setupMockDprModules = (window) => {
  window.DPR_convert_mod = { convert: () => { }, savePad: () => { } }
  window.DPR_sortaz_mod = { sortaz: () => { } }
  window.DPR_translit_mod = { toVel: () => { }, toUni: () => { }, translit: () => { } }
  window.DPR_send_bottom_mod = { sendTextPad: () => { } }
  window.DPR_translate_mod = { translateText: () => { }, translateTextFromBottomPane: () => { }, insertWordByWord: () => { } }
  window.DPR_conjugate_mod = { insertConj: () => { } }
}

describe('DPR_keypress', () => {
  test('capital R (but not lowercase r) resets settings', async () => {
    setupMockDprModules(window)

    const dprVM = await import('./dprviewmodel.js')

    const { location } = window
    delete window.location
    window.location = { reload: jest.fn() }

    const cmd = dprVM.DprKeyboardHandler({ key: 'R' })
    expect(cmd).not.toBeNull()
    expect(cmd.id).toBe(window.DPR_CMD_RESET_SETTINGS)
    expect(window.location.reload).toHaveBeenCalled()
    window.location = location
  })
})
