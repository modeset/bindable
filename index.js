window.Bindable = (function() {
  'use strict';

  function Bindable(context, dataKey) {
    context = document[context] || document
    this.dataKey = dataKey || 'data-bindable'
    this.instanceKey = this.dataKey.replace(/data-/g, '') + 'Instance'
    this.bindables = context.querySelectorAll('[' + this.dataKey + ']')
  }


  Bindable.prototype.bindAll = function() {
    for (var i = 0, len = this.bindables.length; i < len; i += 1) {
      this.bind(this.bindables[i])
    }
    return this
  };


  Bindable.prototype.getRefs = function() {
    var refs = []
    for (var i = 0, len = this.bindables.length; i < len; i += 1) {
      refs.push(this.bindables[i][this.instanceKey])
    }
    return refs
  };


  Bindable.prototype.dispose = function() {
    var instance, bindable;
    for (var i = 0, len = this.bindables.length; i < len; i += 1) {
      bindable = this.bindables[i]
      if (instance = bindable[this.instanceKey]) {
        if (typeof (instance != null ? instance.dispose : void 0) === 'function') {
          instance.dispose()
        }
        bindable[this.instanceKey] = null
      }
    }
    this.bindables = []
    return this
  };


  Bindable.prototype.bind = function(el, dataKey) {
    var _class, key;
    dataKey = dataKey || this.dataKey
    key = el.getAttribute(dataKey)
    if (_class = this.constructor.getClass(key)) {
      if (!el[this.instanceKey]) {
        el[this.instanceKey] = new _class(el)
      }
      return el[this.instanceKey]
    } else  {
      if (typeof console !== "undefined" && console !== null) {
        console.error('Bindable for key: ' + key + ' not found in Bindable.registry for instance ' + el)
      }
      return void 0
    }
  };


  Bindable.getClass = function(key) {
    var _key = "" + key
    return (this.registry[_key] ? this.registry[_key]['class'] : void 0)
  };


  Bindable.register = function(key, klass) {
    var _key = "" + key
    this.registry = this.registry || {}
    this.registry[_key] = {'class': klass}
    return this.registry
  };


  return Bindable

})();

