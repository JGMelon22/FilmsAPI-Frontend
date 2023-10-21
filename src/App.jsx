import { useEffect, useState } from 'react'
import axios from 'axios'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import pageIcon from './assets/clapperboard.png'

import './App.css'

function App() {

  const baseUrl = "https://localhost:7126/api/Movies"
  const [data, setData] = useState([]);
 
  // Get Data
  const requestGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data.data) // Data.data
      }).catch(error => {
        alert(error.get);
      })
  }

  useEffect(() => {
    requestGet();
  }, []);

  return (
    <>
      <header id="page-header">
        <span id='title'>&nbsp;Films &nbsp;
          <a href="https://www.flaticon.com/free-icons/cinema" title="cinema icons">
            <img id="page-icon" src={pageIcon} />
          </a>
        </span>
        <button id='list-button' className='btn btn-primary'>List All</button>
        <button id='create-button' className='btn btn-success'>Create</button>
      </header>

      <p id="film-poster" float="left">
        <img src="https://lh5.googleusercontent.com/Pd-YAUizQ_zKjSFr98K61pI4SbZFCbJ0zBJyy2RLcv1gDhdjQn-s1C7Xu4JbWWX21PB_CiJGwlc_XVCp4k3R4gA7RLgzbM2Mhjxd9XgtaQbfvgIbHYO3-IYimwl5UNCmWJebNpcm" width="200" height="auto" /> <span>&nbsp;</span>
        <img src="https://m.media-amazon.com/images/I/713BWZgZgtL._AC_UF894,1000_QL80_.jpg" width="200" height="auto" />  <span>&nbsp;</span>
        <img src="https://m.media-amazon.com/images/I/51Suhr1p+VL._AC_UF894,1000_QL80_.jpg" width="200" height="auto" /> <span>&nbsp;</span>
        <img src="https://m.media-amazon.com/images/I/81UOBSDQh0L._AC_UF894,1000_QL80_.jpg" width="200" height="auto" />
      </p>

      <h2 id='white-space'></h2>

      <table className='table table-light table-hover table-bordered'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Is in cinema?</th>
            <th>Release date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((film, index) => (
            <tr key={index}>
              <td>{film.movieId}</td>
              <td>{film.title}</td>
              <td>{film.isInCinema ? 'Yes' : 'No'}</td>
              <td>{new Date(film.releaseDate).toLocaleDateString('pt-br')}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Include new Movie */}
      <Modal>
        <ModalHeader>Register a new movie</ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>Title</label>
            <br />
            <input type='text' className='form-control'></input>
            <br />
            <label>Is In Cinema?</label>
            <br />
            <input type='checkbox' className='form-check-input'></input>
            <br />
            <label>Release Date</label>
            <br />
            <input type='date'></input>
            <label>Genre</label>
            <br />
            <input type='text' className='form-control'></input>
            <label>Actor Id</label>
            <br />
            <input type='number' className='form-control'></input>
            <label>Character</label>
            <br />
            <input type='text' className='form-control'></input>
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-success'>Include</button> {" "}
          <button className='btn btn-danger'>Cancel</button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default App
