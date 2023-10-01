import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { clearFavourites } from '../features/countries/favoriteSlice';
import { setModalShow } from '../features/countries/modalSlice';

const ModalDelete = () => {
  const modalShow = useSelector((state) => state.modal.modalShow);
  const dispatch = useDispatch()

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={modalShow}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Delete</h4>
        <p>
          Are you shure you want to delete <strong>ALL</strong> favourit countries from the List?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => {
          dispatch(clearFavourites())
          dispatch(setModalShow(false))
        }}>Delete</Button>
        <Button variant='light' onClick={() => dispatch(setModalShow(false))}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDelete;