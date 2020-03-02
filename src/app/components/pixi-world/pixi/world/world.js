import Game from '../pixi'
import MovieClip from '../pixi-utils/movie-clip'

class World extends window.PIXI.Container {
  init (game) {
    this.game = game
    const batLoop = new MovieClip(Game.assets['texturesbat-loop'], 'loop', 0)
    this.addChild(batLoop)
    batLoop.x = window.innerWidth / 2 - batLoop.width / 2
    batLoop.y = window.innerHeight / 2 - batLoop.height / 2
  }
}

export default World
