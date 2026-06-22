import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { GetDailyNumbers } from "../utils/DailyNumbers";
const { start, continuing, target } = GetDailyNumbers();

function Instructions(props) {
    return (
        <Modal {...props} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>How to Play</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Your expression MUST begin with the Start number once,
                    today's is <mark>{start}</mark>. After <mark>{start}</mark>, you may
                    only use the Continuing number, which is <mark>{continuing}</mark>{" "}
                    today, which you may use any number of times. Your goal is
                    to bring the operation to equal to the target number, that
                    number is <mark>{target}</mark> today. Your score is counted by
                    the length of your expression, your goal is to find the
                    shortest expression. All number combinations are possible.
                    See above for available operations, numbers randomize from 0
                    to 100 every day, and the scoreboard also resets every day.
                    Have fun playing!! :)
                </p>
            </Modal.Body>
        </Modal>
    );
}

export default Instructions;
