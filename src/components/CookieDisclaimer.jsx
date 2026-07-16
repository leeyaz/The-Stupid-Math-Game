import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function CookieDisclaimer({ show, onAccept, onDecline }) {
    return (
        <Modal show={show} centered backdrop="static" keyboard={false}>
            <Modal.Header>
                <Modal.Title>🍪 Cookies</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Stupid Math Game uses cookies to save your streak across visits.
                No personal data is collected or shared. WE DO NOT WANT YOUR
                DATA AT ALL!!!!
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

function CookieConfirmationDialog({ show, onHide, streakEnabled, ...props }) {
    return (
        <Modal show={show} centered onHide={() => onHide(false)}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {streakEnabled
                        ? "Turning your Streak ON!!"
                        : "Turning your Streak OFF!!"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {streakEnabled
                    ? "Your Streak will be be kept as a cookie across visits"
                    : "Your Streak will be completely deleted, gone forever. If you re-enable your Streak, it will be back to 0"}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => onHide(true)}>
                    Yeah I want that
                </Button>
                <Button
                    variant="outline-secondary"
                    onClick={() => onHide(false)}
                >
                    {" "}
                    {streakEnabled
                        ? "No I do not want a Streak"
                        : "No I want to keep my Streak"}{" "}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export { CookieDisclaimer, CookieConfirmationDialog };
