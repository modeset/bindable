window.SimpleBinder = (function() {
  function SimpleBinder(el) {
    this.el = el
    console.log(this.el)
    this.el.innerHTML = "<code>Simple Binder Constructor</code>"
  }

  SimpleBinder.prototype.dispose = function() {
    this.el.innerHTML += "<br/><code>Simple Binder Disposed</code>"
  }

  SimpleBinder.prototype.likeAString = function() {
    return "SimpleBinder\n"
  };

  return SimpleBinder;

})();

Bindable.register('simple-binder', window.SimpleBinder);


(function() {
  var bindable = new Bindable().bindAll();
  var refs = bindable.getRefs()
  var code = document.querySelector('.refs')

  for (var i = 0, len = refs.length; i < len; i += 1) {
    code.innerHTML += "Ref " + i + ": " + refs[i].likeAString()
  }
  console.log(refs)
  bindable.dispose()
}())

