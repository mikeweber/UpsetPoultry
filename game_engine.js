window.UpsetPoultry.Engine = (function() {
  function GameEngine(canvas, width, height, options) {
    if (!options) options = {}
    this.canvas           = canvas
    this.canvas.width     = width
    this.canvas.height    = height
    this.frame_length     = options.frame_length || 16 // default to 60 FPS
    this.renderer         = new UpsetPoultry.Renderer(canvas)
    this.addMouseListeners()
  }

  (function(klass) {
    klass.prototype.run = function(level) {
      this.last_run = new Date()
      var self = this

      function render() {
        var now = new Date(),
            dt  = now - self.last_run

        if (dt >= self.frame_length) {
          level.updateActors(dt * 0.001)
          self.renderer.renderScene(level)
          self.last_run = now
          self.clearMouseClick()
        }

        self.requestAnimationFrame(render)
      }
      this.requestAnimationFrame(render)
    }

    klass.prototype.requestAnimationFrame = function(fn) {
      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame =
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          function (callback) {
            setTimeout(callback, 1)
          }
      }
      window.requestAnimationFrame(fn)
    }

    klass.prototype.addMouseListeners = function() {
      window.mouse_click = false

      this.canvas.onmousemove = function(event) {
        setMousePosition(event)
      }

      this.canvas.onmousedown = function(event) {
        setMousePosition(event)
        window.mouse_click = true
        window.mouse_down  = true
      }

      this.canvas.onmouseup = function(event) {
        window.mouse_click = false
        window.mouse_down  = false
      }
    }

    function setMousePosition(event) {
      var rect = canvas.getBoundingClientRect()
      window.mouse_x = event.clientX - rect.left
      window.mouse_y = event.clientY - rect.top
    }

    klass.prototype.clearMouseClick = function() {
      // A mouse is no longer considered 'clicked' after the first frame check
      if (window.mouse_click) window.mouse_click = false
    }
  })(GameEngine)

  return GameEngine
})()

