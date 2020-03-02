// import * as PIXI from 'pixi.js'
class Animation extends window.PIXI.Container {
  core (mc, id) {
    this.mc = mc
    this.id = id
  }

  create () {
    const localMC = this.mc.duplicateMovieClip()
    this[this.id] = localMC
    this.addChild(localMC)
    localMC.visible = false
  }

  // addMC (mc, id) {
  //   this[id] = mc
  //   this.addChild(mc)
  //   mc.visible = false
  // }
}

export default Animation
