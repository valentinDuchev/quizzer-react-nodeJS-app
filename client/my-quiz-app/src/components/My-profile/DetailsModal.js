import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DetailsModal = () => {


    return (
        <Modal detailsShow={detailsShow} onHide={handleDetailsClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>All solved quizes of {profileData.firstName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>


                <h1>Details</h1>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleDetailsClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}