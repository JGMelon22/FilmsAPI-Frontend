import { useState } from 'react'
import pageIcon from './assets/clapperboard.png'

import './App.css'

function App() {
  return (
    <>
      <header id="page-header">
        <a href="https://www.flaticon.com/free-icons/cinema" title="cinema icons">
          <img id="page-icon" src={pageIcon} />
        </a>
        <span id='title' >&nbsp;Films</span>
      </header>

      <p id="film-poster" float="left">
        <img src="https://lh5.googleusercontent.com/Pd-YAUizQ_zKjSFr98K61pI4SbZFCbJ0zBJyy2RLcv1gDhdjQn-s1C7Xu4JbWWX21PB_CiJGwlc_XVCp4k3R4gA7RLgzbM2Mhjxd9XgtaQbfvgIbHYO3-IYimwl5UNCmWJebNpcm" width="200" height="auto" /> <span>&nbsp;</span>
        <img src="https://m.media-amazon.com/images/I/713BWZgZgtL._AC_UF894,1000_QL80_.jpg" width="200" height="auto" />  <span>&nbsp;</span>
        <img src="https://m.media-amazon.com/images/I/51Suhr1p+VL._AC_UF894,1000_QL80_.jpg" width="200" height="auto" /> <span>&nbsp;</span>
        <img src="https://m.media-amazon.com/images/I/81UOBSDQh0L._AC_UF894,1000_QL80_.jpg" width="200" height="auto" />
      </p>
      <h1 id='white-space'></h1>
    </>
  )
}

export default App
