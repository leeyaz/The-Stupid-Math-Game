import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { GetDailyNumbers } from "../utils/DailyNumbers";
const { start, continuing, target } = GetDailyNumbers();

function Instructions(props) {
    return (
        <Modal
            {...props}
            id="instructions"
            size="lg"
            centered
            aria-labelledby="instructions-title"
        >
            <Modal.Header className="bg-warning" closeButton>
                <Modal.Title id="instructions-title">How to Play</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <p>
                    The goal is to use the <i>START</i> number, along with the{" "}
                    <i>PROPAGATE</i> number, to reach the <i>TARGET</i> with the{" "}
                    <b>shortest</b> mathematical expression you can find.
                    <br></br>
                    <br></br>
                    <div
                        className="p-3 background m-auto"
                        style={{ width: "80%" }}
                        inert
                    >
                        <div className="daily-numbers d-flex justify-content-evenly flex-column pb-3">
                            <span>
                                START: <b>36</b>
                            </span>
                            <span>
                                PROPAGATE: <b>33</b>
                            </span>
                            <span>
                                TARGET: <b>41</b>
                            </span>
                        </div>
                        <div className="d-flex flex-column">
                            <textarea
                                type="text"
                                className="math-input text-center rounded-3"
                                value="ceil(sqr(36)/33 + 33/33)"
                                rows="1"
                                style={{
                                    maxWidth: "500px",
                                    margin: "auto",
                                }}
                                readOnly
                            ></textarea>
                            <p className="m-2">
                                =<b style={{ color: "#00ff00" }}> 41</b>
                            </p>
                        </div>
                    </div>
                    <br></br>
                    <div style={{ maxWidth: "90%", margin: "auto" }}>
                        <mark>
                            Today, <b>{start}</b> must be the first number to
                            appear in your expression, and all subsequent
                            numbers must be <b>{continuing}</b>. The result of
                            your expression must equal <b>{target}</b>.
                        </mark>
                    </div>
                    <br></br>
                    You have a wide selection of functions and operators
                    available to you so go crazy! <br></br>
                    <span style={{ fontSize: 13 }}>
                        <i>
                            To see the list of available symbols, see "What's
                            Allowed?"
                        </i>
                    </span>
                </p>
            </Modal.Body>
        </Modal>
    );
}

export default Instructions;
