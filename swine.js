window.UpsetPoultry.Swine = (function() {
  function Swine(x, y) {
    this.x = x
    this.y = y
    this.radius = 20
    this.alive = true
    this.color = '#6de249'
    this.mass = 5
    this.cr   = 0.5
    this.friction = 0.05
  }

  (function(klass) {
    klass.prototype.hit = function() {
      this.explode()
      this.alive = false
    }

    klass.prototype.step = function(dt) {
      if (!this.isExploding()) return
      this.current_explode_step += dt
    }

    klass.prototype.isAlive = function() {
      return this.alive
    }

    klass.prototype.draw = function(ctx) {
      if (this.isExploding()) return this.drawExplosion(ctx)
      if (!this.isAlive()) return

      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false)
      ctx.fillStyle = this.color
      ctx.fill()
      ctx.lineWidth = 2
      ctx.strokeStyle = this.border
      ctx.stroke()
    }

    klass.prototype.drawExplosion = function(ctx) {
      var progress = (2 * this.getExplosionProgress() - 0.5) * Math.PI
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, Math.PI * 1.5, progress)
      ctx.lineTo(this.x, this.y)
      ctx.lineTo(this.x, this.y - this.radius)
      ctx.fillStyle = this.color
      ctx.fill()
      ctx.lineWidth = 2
      ctx.strokeStyle = this.border
      ctx.stroke()
    }

    klass.prototype.getExplosionProgress = function() {
      if (!this.isExploding()) return 1
      return (1 - this.current_explode_step / this.explode_length)
    }

    klass.prototype.isExploding = function() {
      return this.current_explode_step && this.current_explode_step < this.explode_length
    }

    klass.prototype.explode = function() {
      this.explode_length = 1
      this.current_explode_step = 0.001
    }
  })(Swine)

  return Swine
})()

