window.UpsetPoultry.Poultry = (function() {
  function Poultry() {
    this.x          = 0
    this.y          = 0
    this.radius     = 15
    this.flying     = false
    this.velocity_x = 0
    this.velocity_y = 0
    this.color      = '#d60a2d'
    this.border     = '#333'
    this.cr         = 0.3
    this.mass       = 20
    this.friction   = 0.05
  }

  (function(klass) {
    klass.prototype.fire = function(init_v) {
      this.flying     = true
      this.velocity_x = init_v[0]
      this.velocity_y = init_v[1]
    }

    klass.prototype.isFlying = function() {
      return this.flying
    }

    klass.prototype.setPosition = function(x, y) {
      this.x = x
      this.y = y
    }

    // equations from http://stackoverflow.com/a/9455734/35564
    klass.prototype.step = function(dt, level) {
      if (!this.isFlying()) return
      if ((this.bottom() > level.ground.y)) {
        this.y = level.ground.y - this.radius
        this.collide(level.ground)
      }

      this.velocity_y += level.gravity * dt
      this.x += this.velocity_x * dt * window.ppm
      this.y += this.velocity_y * dt * window.ppm
    }

    klass.prototype.collide = function(collider) {
      this.velocity_y = (this.cr * collider.mass * -this.velocity_y + this.mass * this.velocity_y) / (this.mass + collider.mass)
      this.velocity_x = (this.velocity_x * (1 - collider.friction))
    }

    klass.prototype.bottom = function() {
      return this.y + this.radius
    }

    klass.prototype.draw = function(ctx) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false)
      ctx.fillStyle = this.color
      ctx.fill()
      ctx.lineWidth = 2
      ctx.strokeStyle = this.border
      ctx.stroke()
    }
  })(Poultry)

  return Poultry
})()

