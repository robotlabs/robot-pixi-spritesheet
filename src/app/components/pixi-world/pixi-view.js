import React, { Component } from 'react'
import Pixi from './pixi/pixi'
import './pixi-view.scss'

class PixiView extends Component {
  state = {
    enabled: false
  }

  constructor (props) {
    super(props)
    this.myRef = React.createRef()
  }

  componentDidMount () {
    this.pixi = Pixi.i = new Pixi()
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.loaded !== this.props.loaded) {
      this.pixi.setup({
        animationsManifest: this.props.animationsManifest,
        node: this.myRef.current,
        backgroundColor: this.props.backgroundColor
      })

      this.pixi.startWorld()
      this.setState({
        enabled: true
      })
    }
    return true
  }

  componentWillUnmount () {
    this.pixi.willUnmount()
  }

  render () {
    const { enabled } = this.state
    const pixiViewCss = enabled ? 'pixi-view show' : 'pixi-view'
    return (
      <div>
        <div
          className={pixiViewCss}
          ref={this.myRef}
        />
      </div>
    )
  }
}

export default PixiView
