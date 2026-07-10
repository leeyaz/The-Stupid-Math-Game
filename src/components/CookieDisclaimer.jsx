import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function CookieDisclaimer({ show, onAccept, onDecline }) {
    return (
        <Modal show={show} centered backdrop="static" keyboard={false}>
            <Modal.Header>
                <Modal.Title>🍪 Cookies</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Stupid Math Game uses cookies to save your streak across visits. No personal data is collected or shared. WE DO NOT WANT YOUR DATA AT ALL!!!!
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onAccept}>
                    I want to have my streak saved
                </Button>
                <Button variant="outline-secondary" onClick={onDecline}>
                    Nah
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CookieDisclaimer;