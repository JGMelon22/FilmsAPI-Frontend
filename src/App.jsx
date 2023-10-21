import { useEffect, useState } from 'react'
import axios from 'axios'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import pageIcon from './assets/clapperboard.png'

import './App.css'

function App() {

  const baseUrl = "https://localhost:7126/api/Movies"
  const [data, setData] = useState([]);
  const [includeModal, setIncludeModal] = useState(false);

  // Bind input user data from modal window
  const [selectedMovie, setSelectedMovie] = useState(
    {
      movieId: '',
      title: '',
      isInCinema: 0,
      releaseDate: '',
      genre: 0,
      actorId: 0,
      character: ''
    })

  // Handles open/close modal logic
  const openCloseIncludeModal = () => {
    setIncludeModal(!includeModal);
  }

  // Modal window input data
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setSelectedMovie({
      ...selectedMovie,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    });
    console.log(selectedMovie);
  }

  // Get Data
  const requestGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data.data) // Data.data
      }).catch(error => {
        alert(error.get);
      })
  }

  // Post Data
  const requestPost = async () => {
    delete selectedMovie.movieId;
    selectedMovie.genre = parseInt(selectedMovie.genre); 
    selectedMovie.actorId = parseInt(selectedMovie.actorId);
    selectedMovie.isInCinema = selectedMovie.isInCinema ? true : false; // Cast due to checkbox type
    await axios.post(baseUrl, selectedMovie)
      .then(response => {
        setData(data.concat(response.data));
        openCloseIncludeModal();
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
        <button id='create-button' className='btn btn-success' onClick={() => openCloseIncludeModal()}>Create</button>
      </header>

      <p id="film-poster" float="left">
        <img src="https://lh5.googleusercontent.com/Pd-YAUizQ_zKjSFr98K61pI4SbZFCbJ0zBJyy2RLcv1gDhdjQn-s1C7Xu4JbWWX21PB_CiJGwlc_XVCp4k3R4gA7RLgzbM2Mhjxd9XgtaQbfvgIbHYO3-IYimwl5UNCmWJebNpcm" width="200" height="auto" /> <span>&nbsp;</span>
        <img src="https://m.media-amazon.com/images/I/713BWZgZgtL._AC_UF894,1000_QL80_.jpg" width="200" height="auto" />  <span>&nbsp;</span>
        <img src="https://m.media-amazon.com/images/I/51Suhr1p+VL._AC_UF894,1000_QL80_.jpg" width="200" height="auto" /> <span>&nbsp;</span>
        <img src="https://m.media-amazon.com/images/I/81UOBSDQh0L._AC_UF894,1000_QL80_.jpg" width="200" height="auto" />
      </p>

      <h2 id='white-space'></h2>

      <table className='table table-secondary table-hover table-bordered'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Is in cinema?</th>
            <th>Release date</th>
            <th  className='ont-weight-bold'>Options</th>
          </tr>
        </thead>
        <tbody>
          {data.map((film, index) => (
            <tr key={index}>
              <td>{film.movieId}</td>
              <td>{film.title}</td>
              <td>{film.isInCinema ? 'Yes' : 'No'}</td>
              <td>{new Date(film.releaseDate).toLocaleDateString('pt-br')}</td>
              <td className='text-center'>
                <button className='btn btn-info'>Edit</button> {" "}
                <button className='btn btn-danger'>Delete</button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>

      {/* Include new Movie */}
      <Modal isOpen={includeModal}>
        <ModalHeader>Register a new movie</ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>Title</label>
            <br />
            <input type='text' className='form-control' name='title' onChange={handleChange}></input>
            <label>Is In Cinema?</label>
            <br />
            <input type='checkbox' className='form-check-input' name='isInCinema' onChange={handleChange}></input>
            <br />
            <label>Release Date</label>
            <br />
            <input type='date' name='releaseDate' onChange={handleChange}></input>
            <br />
            <label>Genre Code</label>
            <br />
            <input type='number' min='1' className='form-control'></input>
            <label>Actor Id</label>
            <br />
            <input type='number' min='1' className='form-control' name='actorId' onChange={handleChange}></input>
            <label>Character</label>
            <br />
            <input type='text' className='form-control' name='character' onChange={handleChange}></input>
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-success' onClick={() => requestPost()}>Include</button> {" "}
          <button className='btn btn-warning' onClick={() => openCloseIncludeModal()} >Cancel</button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default App
