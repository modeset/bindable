window.SimpleBinder = (function() {
  function SimpleBinder(el) {
    this.el = el
    this.el.innerHTML = "<code>Simple Binder Constructor</code>"
  }

  SimpleBinder.prototype.dispose = function() {
    this.el.innerHTML += "<br/><code>Simple Binder Disposed</code>"
  }

  SimpleBinder.prototype.likeAString = function() {
    return "SimpleBinder"
  };

  return SimpleBinder;

})();
Bindable.register('simple-binder', window.SimpleBinder);



window.AnotherBinder = (function() {
  function AnotherBinder(el) {
    this.el = el
    this.el.innerHTML = "<code>Another Binder Constructor</code>"
  }

  AnotherBinder.prototype.dispose = function() {
    this.el.innerHTML += "<br/><code>Another Binder Disposed</code>"
  };

  AnotherBinder.prototype.likeAString = function() {
    return "AnotherBinder"
  };

  return AnotherBinder;

})();
Bindable.register('another-binder', window.AnotherBinder);


(function() {
  var bindable = new Bindable().bindAll();
  var refs = bindable.getRefs()
  var code = document.querySelector('.refs')
  code.innerHTML = ''

  for (var i = 0, len = refs.length; i < len; i += 1) {
    code.innerHTML += "Ref " + i + ": " + refs[i].likeAString() + "<br />"
  }
  bindable.dispose()
}())

