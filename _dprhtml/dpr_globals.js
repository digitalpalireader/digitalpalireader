export class DprGlobals {
  get name() {
    return this._name
  }

  set name(value) {
    if (value.length < 4) {
      return
    }
    this._name = value
  }
}

window.DPR_Globals = new DprGlobals()

export default window.DPR_Globals
