window.UpsetPoultry.Launcher = (function(){
  function Launcher(x, y, ground_level) {
    this.x = x
    this.y = y
    this.ground = ground_level
    this.dx = 0
    this.dy = 0
    this.current_shot = null
    this.is_being_pulled = false
  }

  (function(klass) {
    klass.prototype.isBeingPulled = function() {
      return this.is_being_pulled
    }

    klass.prototype.beginPulling = function() {
      return this.is_being_pulled = true
    }

    klass.prototype.lockAndLoad = function(poultry) {
      this.current_shot = poultry
      this.current_shot.setPosition(this.x, this.y)
    }

    klass.prototype.fire = function() {
      this.current_shot.fire(this.shotVelocity())
      this.current_shot = null
      this.is_being_pulled = false
    }

    klass.prototype.shotVelocity = function() {
      return [-this.dx * 0.5, -this.dy * 0.5]
    }

    klass.prototype.pullPoultry = function(window_x, window_y) {
      if (this.current_shot) {
        this.current_shot.setPosition(window_x, window_y)
      }
      this.setDeltas(window_x - this.x, window_y - this.y)
    }

    klass.prototype.setDeltas = function(dx, dy) {
      this.dx = dx
      this.dy = dy
      this.limitDeltas()
    }

    klass.prototype.limitDeltas = function() {
      // If the pulled distance is less than the elasticity, we're ok
      if (this.getPullDistanceSquared() <= this.getElasticitySquared()) return

      // Otherwise determine the direction the launcher is being pulled and stretch it to the limit
      var angle = this.getPullAngle()
      this.dx = Math.cos(angle) * this.getElasticity()
      this.dy = Math.sin(angle) * this.getElasticity()
    }

    // The launch angle is 180 degrees from the pull angle
    klass.prototype.getLaunchAngle = function() {
      return this.getPullAngle() + Math.PI
    }

    klass.prototype.getPullAngle = function() {
      return Math.atan(this.dy / this.dx)
    }

    klass.prototype.getPullDistanceSquared = function() {
      return this.dx * this.dx + this.dy * this.dy
    }

    klass.prototype.getElasticitySquared = function() {
      return this.getElasticity() * this.getElasticity()
    }

    klass.prototype.getElasticity = function() {
      return 100
    }

    klass.prototype.draw = function(ctx) {
      ctx.fillStyle = '#000099'
      ctx.beginPath()
      ctx.moveTo(this.x,      this.y + 20)
      ctx.lineTo(this.x + 20, this.y - 15)
      ctx.lineTo(this.x + 24, this.y - 15)
      ctx.lineTo(this.x + 2,  this.y + 23)
      ctx.lineTo(this.x + 2,  this.ground)
      ctx.lineTo(this.x - 2,  this.ground)
      ctx.lineTo(this.x - 2,  this.y + 23)
      ctx.lineTo(this.x - 24, this.y - 15)
      ctx.lineTo(this.x - 20, this.y - 15)
      ctx.closePath()
      ctx.fill()
    }

  })(Launcher)

  return Launcher
})()

