import { useEffect, useState } from 'react'
import axios from 'axios'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import pageIcon from './assets/clapperboard.png'

import './App.css'

function App() {

  const baseUrl = "https://localhost:7126/api/Movies"
  const [data, setData] = useState([]);
  const [includeModal, setIncludeModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  // Use state to help avoid infinity useEffect loop
  const [updateData, setUpdateData] = useState(true);

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

  const openCloseEditModal = () => {
    setEditModal(!editModal);
  }

  const openCloseDeleteModal = () => {
    setDeleteModal(!deleteModal)
  }

  // Input data
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setSelectedMovie({
      ...selectedMovie,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    });
  }

  // Logic to call edit or delete modal window
  const selectMovie = (film, option) => {
    setSelectedMovie(film);
    option === "Edit"
      ? openCloseEditModal()
      : openCloseDeleteModal();
  }

  // Get Data
  const requestGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data.data) // Data.data
      }).catch(error => {
        alert(error);
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
        setUpdateData(true);
        openCloseIncludeModal();
      }).catch(error => {
        alert(error);
      })
  }

  // Put Data
  const requestPut = async () => {
    selectedMovie.isInCinema = selectedMovie.isInCinema ? true : false; // Cast due to checkbox type
    await axios.put(baseUrl + "/" + selectedMovie.movieId, selectedMovie)
      .then(response => {
        var answer = response.data;
        var auxiliaryData = data;

        auxiliaryData.forEach(film => {
          if (film.id === answer.movieId) {
            film.title = answer.title;
            film.isInCinema = answer.isInCinema;
            film.releaseDate = answer.releaseDate;
          }
        });
        setUpdateData(true);
        openCloseEditModal();
      }).catch(error => {
        alert(error)
      });
  }

  // Delete Data
  const requestDelete = async () => {
    await axios.delete(baseUrl + "/" + selectedMovie.movieId)
      .then(response => {
        setData(data.filter(movie => movie.movieId !== response.data));
        setUpdateData(true);
        openCloseDeleteModal();
      }).catch(error => {
        alert(error);
      })
  }

  // Fix infinity loop 
  useEffect(() => {
    if (updateData) {
      requestGet();
      setUpdateData(false);
    }
  }, [updateData]);

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
            <th className='ont-weight-bold'>Options</th>
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
                <button className='btn btn-info' onClick={() => selectMovie(film, "Edit")}>Edit</button> {" "}
                <button className='btn btn-danger' onClick={() => selectMovie(film, "Delete")}>Delete</button>
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

      {/* Update Movie Info */}
      <Modal isOpen={editModal}>
        <ModalHeader>Register a new movie</ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>Id:</label>
            <br />
            <input readOnly value={selectedMovie && selectedMovie.movieId}></input>
            <br />
            <label>Title: </label>
            <br />
            <input type='text' className='form-control' name='title' onChange={handleChange} value={selectedMovie && selectedMovie.title} />
            <label>Is In Cinema?</label>
            <br />
            <input type='checkbox' className='form-check-input' name='isInCinema' onChange={handleChange} checked={selectedMovie && selectedMovie.isInCinema} />
            <br />
            <label>Release Date:</label>
            <br />
            <input type='date' name='releaseDate' onChange={handleChange} value={selectedMovie && selectedMovie.releaseDate} />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={() => requestPut()}>Edit</button> {" "}
          <button className='btn btn-warning' onClick={() => openCloseEditModal()}>Cancel</button>
        </ModalFooter>
      </Modal>

      {/* Delete Film Modal */}
      <Modal isOpen={deleteModal}>
        <ModalBody>
          Are you sure you want to delete this movie? <b>{selectedMovie && selectedMovie.title}</b>
        </ModalBody>

        <ModalFooter>
          <button className='btn btn-danger' onClick={() => requestDelete()}>Delete</button>
          <button className='btn btn-secondary' onClick={openCloseDeleteModal}>Cancel</button>
        </ModalFooter>
      </Modal >
    </>
  )
}

export default App
