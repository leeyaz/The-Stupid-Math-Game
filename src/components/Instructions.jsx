import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { GetDailyNumbers } from "../utils/DailyNumbers";
const { start, continuing, target } = GetDailyNumbers();

function Instructions(props) {
    return (
        <Modal {...props} size="lg" centered>
            <Modal.Header className="bg-warning" closeButton>
                <Modal.Title>How to Play</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                The goal is to use the <i>START</i> number, along with the{" "}
                <i>PROPAGATE</i> number, to reach the <i>TARGET</i> with the{" "}
                <b>shortest</b> mathematical expression you can find.
                <br></br>
                <br></br>
                <img src="/Ins1.png" className="figure-img p-3 img-fluid"></img>
                <br></br>
                <br></br>
                <mark>
                    Today, the first number that appears in your expression must
                    be <b>{start}</b> and all subsequent numbers must be{" "}
                    <b>{continuing}</b>. The result of your expression must
                    equal <b>{target}</b>.
                </mark>
                <br></br>
                <br></br>
                You have a wide selection of functions and operators available
                to you so go crazy! <br></br>
                <span style={{ fontSize: 13 }}>
                    <i>
                        To see the list of available symbols, see "What's Allowed?"
                    </i>
                </span>
            </Modal.Body>
        </Modal>
    );
}

export default Instructions;
