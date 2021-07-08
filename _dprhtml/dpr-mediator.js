'use strict'

const DprMediator = (function _() {
  const ee = new window.EventEmitter()

  return {
    on: ee.on,
    emit: ee.emit,
    listeners: ee.listeners,
  }
}())

window.DPR_Mediator = DprMediator
