import create from './pixi-utils/create'
import Animation from './pixi-utils/animation'
import MovieClip from './pixi-utils/movie-clip'
import World from './world/world'
import { getNr2 } from './../../../utils/utils'
let PIXI
export default class Game {
  setup (settings) {
    PIXI = window.PIXI
    this.interactionStarted = false
    this.node = settings.node

    this.pixiApp = Game.pixiApp = create.pixi(settings.backgroundColor)

    createAnimations(settings.animationsManifest)

    this.resize()
    this.node.appendChild(this.pixiApp.view)
    this.pixiApp.ticker.add(this.run)
  }

  willUnmount () {
    if (this.world) {
      this.world.willUnmount()
    }
  }

  startWorld () {
    //* * call initial resize */
    this.world = new World()
    this.world.init(this)

    this.pixiApp.stage.addChild(this.world)

    this.resize()
    window.addEventListener('resize', this.resize)
  }

  resize = () => {
    this.w = window.innerWidth
    this.h = window.innerHeight
    this.pixiApp.renderer.resize(this.w, this.h)
  }
}

const createAnimations = (manifest) => {
  Game.assets = {}
  manifest.animations.forEach((d) => {
    const animation = new Animation()
    d.anims.forEach((mc) => {
      const textures = {}
      for (let i = mc.start; i < mc.end; i++) {
        let texture
        let namePng
        if (mc.id === 'bat-loop') {
          namePng = mc.base + '-0' + i + '.png'
          texture = PIXI.utils.TextureCache[namePng]
        } else {
          namePng = mc.base + getNr2(i) + '.png'
          texture = PIXI.utils.TextureCache[namePng]
        }

        //* * trick to optimize for ipad and shit devices */
        if (texture) {
          texture.type = PIXI.TYPES.UNSIGNED_SHORT_4_4_4_4
          textures[namePng] = texture
        }
      }
      var size = Object.size(textures)
      if (size > 0) {
        const movieClip = new MovieClip(textures, mc.id)
        animation.core(movieClip, mc.id)
        Game.assets['textures' + mc.id] = textures
      }
    })
    Game.assets[d.id] = animation
  })
}
