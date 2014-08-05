# Bindable
Light weight dependency injection for client side components. Looks for
all DOM elements with a `data-bindable` attribute, stores references
within a registry and instantiates their respective classes.

## WIP
- Cleanup docs and describe a little more behind bindable (i.e. local
  bindables, etc.)
- Link to Jed's presentation
- Wrap more tests around bindable's setup
- Create packages for Bower and Component

## Install
Describe this


## Usage
As a class making use of the `Bindable` registry:

```javascript
var ToggleGroup = (function() {
  function ToggleGroup(el) {
    this.el = el
  }

  ToggleGroup.prototype.dispose = function() {
    // Clean up your mess
  };

  return ToggleGroup

})();
Bindable.register('toggle-group', ToggleGroup);
```

As markup instantiating a class that is registered with `Bindable`:

```html
<nav data-bindable="toggle-group">...</nav>
```

`Bindable` is created after the page has loaded

```javascript
var bindable
window.addEventListener('DOMContentLoaded', function() {
  bindable = new Bindable().bindAll()
  // ...
});
```


## API


### #bindAll
Binds all elements on the page with a `data-bindable` attribute with
it's respective class.

```javascript
var bindable = new Bindable()
bindable.bindAll()
```

### #bind
TODO: Describe This!!!!


### #getRefs
Returns a listing of all bindable objects on the page.

```javascript
var bindable = new utensils.Bindable()
bindable.bindAll()
var binded = bindable.getRefs()
```

### #dispose
Calls the `dispose` method on all bindable objects and cleans out the
instance of `Bindable`.

```javascript
var bindable = new utensils.Bindable()
bindable.bindAll()
bindable.dispose()
```


### Bindable.getClass
Static method for returning a class instance out of the registry from a
key.

```javascript
var object = Bindable.getClass('key')
```

### Bindable.register
Manually add a bindable object to the registry by passing a key and a
class instance.

```javascript
Bindable.register('my_class', new MyClass())
```

