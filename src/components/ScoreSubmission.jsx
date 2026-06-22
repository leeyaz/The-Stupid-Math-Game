import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { saveScore } from "../utils/Scoreboard";

function ScoreSubmission(props) {
    const [showInput, setShowInput] = useState(false);
    const [playerName, setPlayerName] = useState("");

    const handleAddScore = async () => {
        if (playerName && props.lastScore != null) {
            await saveScore(playerName, props.lastScore);
        }
    };

    return (
        <div className="score-submission-box d-flex justify-content-evenly mx-auto align-items-center pt-3 gap-4">
            <p className="p-2 m-0">
                Most Recent Score: {props.lastScore || "nil"}
            </p>
            <Button
                variant="secondary"
                disabled={!props.lastScore}
                onClick={() => setShowInput(true)}
            >
                Submit Score to Leaderboard
            </Button>

            <Modal show={showInput} onHide={() => setShowInput(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Submit to Leaderboard</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control
                            type="name"
                            placeholder="your name here"
                            autoFocus
                            onChange={(e) => setPlayerName(e.target.value)}
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => {
                            setShowInput(false);
                            handleAddScore();
                        }}
                    >
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ScoreSubmission;
