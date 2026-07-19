import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState, useRef } from "react";
import { saveScore } from "../utils/Scoreboard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ScoreSubmission(props) {
    const [showInput, setShowInput] = useState(false);
    const [playerName, setPlayerName] = useState("");
    const [validated, setValidated] = useState(false);

    const formRef = useRef(null);

    const handleAddScore = async () => {
        if (playerName && props.lastScore != null) {
            await saveScore(playerName, props.lastScore);
        }
    };

    const handleChange = (e) => {
        if (validated) {
            setValidated(false);
        }
        setPlayerName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form) {
            if (form.checkValidity() === false) {
                setValidated(true);
            } else {
                setShowInput(false);
                handleAddScore();
            }
        }
    };

    return (
        <div className="score-submission-box d-flex  justify-content-evenly mx-auto align-items-center pt-2 pb-5 gap-4">
            <p className="p-2 m-0">
                Most Recent Score: {props.lastScore || "nil"}
            </p>
            <Button
                variant="secondary"
                disabled={!props.lastScore}
                onClick={() => setShowInput(true)}
                aria-controls="score-submission-modal"
                aria-haspopup="dialog"
            >
                Submit Score to Leaderboard
            </Button>

            <Modal
                id="score-submission-modal"
                show={showInput}
                onHide={() => setShowInput(false)}
                centered
                aria-labelledby="submission-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="submission-title">
                        Submit to Leaderboard
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        ref={formRef}
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                        className="d-flex flex-column"
                    >
                        <Form.Group as={Row}>
                            <Form.Label column sm="2" htmlFor="name-input">
                                Name
                            </Form.Label>

                            <Col sm="10">
                                <Form.Control
                                    required
                                    maxLength={40}
                                    type="name"
                                    id="name-input"
                                    placeholder="Your name here"
                                    autoFocus
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please input a name.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Button
                            className="mt-3"
                            variant="primary"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ScoreSubmission;
