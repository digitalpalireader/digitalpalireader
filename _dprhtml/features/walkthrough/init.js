"use strict";

(() => {
  // Depending on what action a user takes, either the `hide` or `destroy`
  // event will be triggered on a Step, but not both. For Steps containing
  // side-effects that necessitate cleanup in both cases, a custom `cleanup`
  // event will be fired when a Step is either hidden or destroyed.
  const __stepDestroy = Shepherd.Step.prototype.destroy;
  Shepherd.Step.prototype.destroy = function () {
    __stepDestroy.apply(this, arguments);
    this.trigger("cleanup");
  };
  const __stepHide = Shepherd.Step.prototype.hide;
  Shepherd.Step.prototype.hide = function () {
    __stepHide.apply(this, arguments);
    this.trigger("cleanup");
  };
})();
