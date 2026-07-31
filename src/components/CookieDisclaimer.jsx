import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";

function CookieDisclaimer({ show, onHide }) {
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
                <Button variant="primary" onClick={() => onHide(true)}>
                    I want to have my streak saved
                </Button>
                <Button
                    variant="outline-secondary"
                    onClick={() => onHide(false)}
                >
                    Nah
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

function CookieConfirmationDialog({
    show,
    onHide,
    setStreakEnabled,
    streakEnabled,
    ...props
}) {
    const [streakState, setStreakState] = useState(streakEnabled);

    useEffect(() => {
        setStreakState(streakEnabled);
    }, [streakEnabled]);

    const footer = (
        <Modal.Footer>
            <Button
                variant="primary"
                onClick={() => {
                    onHide();
                    setStreakState(!streakState);
                }}
            >
                Yeah I want that
            </Button>
            <Button variant="outline-secondary" onClick={() => onHide()}>
                {!streakEnabled
                    ? "No I do not want a Streak"
                    : "No I want to keep my Streak"}{" "}
            </Button>
        </Modal.Footer>
    );

    return (
        <Modal
            id="streak-confirmation-dialog"
            show={show}
            onHide={() => onHide()}
            onExited={() => {
                setStreakEnabled(streakState);
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {streakEnabled
                        ? "Turning your streak OFF!"
                        : "Turning your streak ON!!"}
                    !
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    {streakEnabled
                        ? "Your streak will be completely deleted, gone forever. If you re-enable your streak, it will be back to 0."
                        : "Your streak will be kept as a cookie across visits."}
                </p>
            </Modal.Body>
            {footer}
        </Modal>
    );
}

export { CookieDisclaimer, CookieConfirmationDialog };
