var MockClass = (function() {
  function MockClass(el) {
    this.el = el
    this.state = 'instantiated'
    this.disposed = false
  }

  MockClass.prototype.dispose = function() {
    return this.disposed = true
  };

  return MockClass

})();
Bindable.register('mock_class_key', MockClass);


describe('Bindable', function() {

  beforeEach(function() {
    this.el = document.querySelector('#fixture')
    this.el.innerHTML = '<div data-bindable="mock_class_key"></div>'
    this.bindable = new Bindable().bindAll()
  })

  afterEach(function() {
    this.bindable.dispose()
  })

  describe('@instance', function() {
    it('is accessible in the global namespace', function() {
      expect(Bindable).not.to.be(null)
    })
  })

  describe('#register', function() {
    it('defines a registry when a reference is registered', function() {
      expect(Bindable.registry).not.to.be(undefined)
    })

    it('adds the MockClass with the "mock_class_key" key in the registry', function() {
      console.log(Bindable.registry)
      expect(Bindable.registry['mock_class_key']['class']).to.be(MockClass)
    })

    it('retrieves the class ref with .getClass', function() {
      expect(Bindable.getClass('mock_class_key')).to.be(MockClass)
    })
  })

  describe('#bindAll', function() {
    return it('instantiates a bound class', function() {
      expect(this.bindable.getRefs('mock_class_key').length).to.be(1)
      expect(this.bindable.getRefs('mock_class_key')[0].state).to.be('instantiated')
    })
  })

  describe('#dispose', function() {
    it('calls dispose on the bindable instances', function() {
      var instance = this.bindable.getRefs('mock_class_key')[0]
      expect(instance.disposed).to.be(false)
      this.bindable.dispose()
      expect(instance.disposed).to.be(true)
    })

    it('removes the instance from bindable', function() {
      this.bindable.dispose()
      expect(this.bindable.getRefs('mock_class_key').length).to.be(0)
    })
  })

  describe('#bind', function() {
    it('binds a class instance with a DOM element', function() {
      var instance = this.bindable.getRefs('mock_class_key')[0]
      expect(instance.el).to.be(this.el.querySelector('[data-bindable="mock_class_key"]'))
    })
  })

  describe('@getClass', function() {
    it('returns the instance from a key', function() {
      expect(Bindable.getClass('mock_class_key')).to.be(MockClass)
    })
  })

  describe('@register', function() {
    it('registers a bindable object through the static method', function() {
      Bindable.register('test_register', MockClass)
      expect(this.bindable.getRefs('test_register').length).to.be(1)
    })
  })

});

