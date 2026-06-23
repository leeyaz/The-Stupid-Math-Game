import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { saveScore, getScores } from "../utils/Scoreboard";

function ScoreSubmission(props) {
    const [showInput, setShowInput] = useState(false);
    const [playerName, setPlayerName] = useState("");
    const [valid, setValid] = useState(false);

    const handleAddScore = async () => {
        if (playerName && props.lastScore != null) {
            await saveScore(playerName, props.lastScore);
            const updated = await getScores();
            props.onScoreAdded(updated);
        }
    };

    const handleChange = (e) => {
        if (valid) {
            setValid(false);
        }
        setPlayerName(e.target.value);
    };

    const handleSubmit = (e) => {
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
            e.preventDefault();
            setValid(true);
        } else {
            setValid(false);
        }
        // setShowInput(false);
        // handleAddScore();
    };

    //     onClick={() => {
    //     if (playerName.length < 32) {
    //         setShowInput(false);
    //         handleAddScore();
    //     }
    // }}

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
                    <Form noValidate onSubmit={handleSubmit} validated={valid}>
                        <Form.Control
                            required
                            maxLength={32}
                            type="name"
                            placeholder="your name here"
                            autoFocus
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please input a name.
                        </Form.Control.Feedback>
                        <Button type="submit" variant="primary">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ScoreSubmission;
