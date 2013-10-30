window.UpsetPoultry.Renderer = (function() {
  function Renderer(canvas) {
    this.canvas = canvas
    this.ctx    = canvas.getContext('2d')
  }

  (function(klass) {
    klass.prototype.renderScene = function(scene) {
      this.clearCanvas()
      this.drawGround(scene.ground.y)
      this.renderActors(scene)
    }

    klass.prototype.clearCanvas = function() {
      this.ctx.fillStyle = '#94cede'
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    klass.prototype.drawGround = function(ground_level) {
      this.ctx.fillStyle = '#152053'
      this.ctx.fillRect(0, ground_level, this.canvas.width, this.canvas.height - ground_level)
      this.ctx.fillStyle = '#59a41c'
      this.ctx.fillRect(0, ground_level, this.canvas.width, 5)
    }

    klass.prototype.renderActors = function(scene) {
      var actors = scene.getActors()
      for (var i = 0; i < actors.length; i++) {
        var actor = actors[i]
        this.renderActor(actor)
      }
    }

    klass.prototype.renderActor = function(actor) {
      actor.draw(this.ctx)
    }
  })(Renderer)

  return Renderer
})()

