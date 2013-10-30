window.UpsetPoultry.Levels = {}

window.UpsetPoultry.Levels[1] = (function() {
  function Level1() {
    this.ground  = { y: 350, mass: 100000, friction: 0.05}
    this.gravity  = 9.8
    this.bounce   = 0.3
    this.launcher= new UpsetPoultry.Launcher(100, this.ground.y - 80, this.ground.y)
    this.poultry = [new UpsetPoultry.Poultry()]
    this.swine   = [new UpsetPoultry.Swine(500, this.ground.y - 20)]
    this.potential_fliers  = []
  }

  (function(klass) {
    klass.prototype.getActors = function() {
      return [this.launcher].concat(this.poultry).concat(this.swine).concat(this.potential_fliers)
    }

    klass.prototype.updateActors = function(dt) {
      if (!this.launcher.current_shot) {
        var next_shot = this.poultry.pop()
        if (next_shot) {
          this.potential_fliers.push(next_shot)
          this.launcher.lockAndLoad(next_shot)
        }
      }

      if (window.mouse_click && this.isMouseOnLauncher()) {
        this.launcher.beginPulling()
      }
      if (this.launcher.isBeingPulled()) {
        this.launcher.pullPoultry(window.mouse_x, window.mouse_y)
        // fire the poultry once the mouse is up and is far enough from the launcher
        if (!window.mouse_down && !this.isMouseOnLauncher()) this.launcher.fire()
      }

      for (var i = 0; i < this.potential_fliers.length; i++) {
        this.potential_fliers[i].step(dt, this)
      }

      for (var i = 0; i < this.swine.length; i++) {
        if (this.swine[i].step(dt, this)) {
          this.swine.splice(i, 1)
          i--
        }
      }
      // detect collision with swine
      for (var i = 0; i < this.potential_fliers.length; i++) {
        var poultry = this.potential_fliers[i]
        if (poultry.isFlying()) {
          for (var j = 0; j < this.swine.length; j++) {
            var swine = this.swine[i]
            if (swine.isAlive()) {
              var dx = swine.x - poultry.x,
                  dy = swine.y - poultry.y,
                  radii = swine.radius + poultry.radius

              if ((dx * dx) + (dy * dy) < (radii * radii)) {
                poultry.collide(swine)
                swine.hit()
              }
            }
          }
        }
      }
    }

    klass.prototype.isMouseOnLauncher = function() {
      var dx = window.mouse_x - this.launcher.x,
          dy = window.mouse_y - this.launcher.y
      // return true if this click was within 10 pixels of the launcher head
      return (dx * dx) + (dy * dy) < 100
    }
  })(Level1)

  return Level1
})()

