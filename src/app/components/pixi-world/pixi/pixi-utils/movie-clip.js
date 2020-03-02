// import * as PIXI from 'pixi.js'
import Game from '../pixi'
// import SPEED_MULTIPLIER from 'game/constants/speed-multiplier'

class MovieClip extends window.PIXI.Sprite {
  constructor (textures, id, counterStart) {
    super()

    this.name = id
    this.origTextures = textures
    this.textures = this.createFrames(textures)
    this.centreMC()
    this.counter = counterStart
    this.speed = 0.5 * 1
    this.frameStop = -1
    this.endFrame = -1
    this.callBack = null

    this.width = this.textures[0].orig.width
    this.height = this.textures[0].orig.height
  }

  updateTransform () {
    // this.blendMode = PIXI.BLEND_MODES.MULTIPLY

    if (this.visible) {
      this.counter += this.speed * Game.i.pixiApp.ticker.deltaTime
      let frame = Math.floor(this.counter % this.textures.length)
      if (this.endFrame !== -1) {
        if (frame >= this.endFrame - 1) {
          this.counter = this.endFrame - 1

          this.endFrame = -1
          this.frameStop = this.textures.length - 1

          if (this.callBack) {
            this.callBack(this.name)
          }
        }
      }
      this.texture = this.textures[frame]
      if (this.frameStop === -1) {
        this.texture = this.textures[frame]
      } else {
        this.texture = this.textures[this.frameStop]
        frame = this.frameStop
      }
      this.frame = frame
      super.updateTransform()
    }
  }

  goPlayAndCall (callback) {
    this.counter = 0
    this.endFrame = this.textures.length
    this.frameStop = -1
    this.callBack = callback
  }

  goPlayAndStop () {
    this.endFrame = this.textures.length
    this.frameStop = -1
    this.callBack = null
  }

  gotoAndStop (frame) {
    this.frameStop = frame
  }

  play () {
    this.counter = 0
    this.frameStop = -1
    this.endFrame = -1
  }

  pause () {
    this.frameStop = this.frame
  }

  resume () {
    this.frameStop = -1
  }

  createFrames (textures) {
    //* * be sure we order the list alphanumerically */
    var collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })
    const ssIndexes = Object.keys(textures).sort(collator.compare)
    const frames = []
    for (let i = 0; i < ssIndexes.length; i++) {
      frames.push(window.PIXI.Texture.from(ssIndexes[i]))
    }
    return frames
  }

  centreMC () {
    this.x = this.sx = -this.textures[0].orig.width / 2
    this.y = this.sy = -this.textures[0].orig.height / 2
  }

  duplicateMovieClip () {
    return new MovieClip(this.origTextures, this.anim)
  }
}

export default MovieClip
