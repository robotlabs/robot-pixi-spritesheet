import { fixColor } from './../../../../utils/utils'
const PIXI = window.PIXI
const pixi = (backgroundColor) => {
  var app = new PIXI.Application({
    width: 200,
    height: 200,
    backgroundColor: fixColor(backgroundColor),
    resolution: 1,
    transparent: false,
    autoResize: true,
    antialias: true
  })

  return app
}

export default {
  pixi
}
