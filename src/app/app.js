import React, { Component } from 'react'
import PixiView from './components/pixi-world/pixi-view'
import { loadStuff } from './loader/loader'
import manifest from './app-manifest'
import './app.scss'

class App extends Component {
  state = {
    loaded: false
  }

  async componentDidMount () {
    // create ref
    this.pixiViewRef = React.createRef()
    // load pixi stuff
    await loadStuff(manifest.assets)
    // enable
    this.setState({
      loaded: true
    })
  }

  render () {
    const { status, loaded } = this.state
    return (
      <div className='app'>
        <PixiView
          loaded={loaded}
          ref={this.pixiViewRef}
          appStatus={status}
          backgroundColor='#ff0099'
          animationsManifest={manifest.animations}
        />
      </div>
    )
  }
}
export default App
