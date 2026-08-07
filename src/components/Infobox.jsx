import Instructions from "./Instructions";
import Button from "react-bootstrap/Button";
import Leaderboard from "./Leaderboard";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useState, useEffect, useRef } from "react";

import Collapse from "react-bootstrap/Collapse";

import {
    allowedConstants,
    allowedFunctions,
    allowedOperations,
} from "../utils/ParseExpressionUtil";

const renderAllowed = (props) => (
    <Tooltip role="tooltip" id="allowed-list" {...props}>
        <aside className="text-start">
            <b>Operations</b>:{" "}
            <small>{[...allowedOperations].join(", ")}</small>
            <br></br>
            <b>Functions</b>: <small>{[...allowedFunctions].join(", ")}</small>
            <br></br>
            <b>Constants</b>: <small>{[...allowedConstants].join(", ")}</small>
        </aside>
    </Tooltip>
);

function Infobox(props) {
    const { start, continuing, target } = props;

    const [placement, setPlacement] = useState("right");
    const [showInstructions, setShowInstructions] = useState(false);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [showAllowed, setShowAllowed] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 900) {
                setPlacement("bottom");
            } else {
                setPlacement("right-start");
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const targ = useRef(null);
    return (
        <div id="info">
            <div className="d-flex gap-3 justify-content-center mb-3">
                <Button
                    variant="warning"
                    role="button"
                    aria-controls="instructions"
                    aria-haspopup="dialog"
                    onClick={() => {
                        setShowInstructions(true);
                    }}
                >
                    How to Play
                </Button>
                <Button
                    variant="info"
                    role="button"
                    aria-controls="leaderboard"
                    onClick={() => setShowLeaderboard(!showLeaderboard)}
                    aria-expanded={showLeaderboard}
                >
                    Daily Leaderboard
                </Button>{" "}
                <OverlayTrigger
                    placement={placement}
                    trigger="click"
                    delay={{ show: 0, hide: 0 }}
                    overlay={renderAllowed}
                >
                    <Button
                        id="allowed-list-button"
                        aria-controls="allowed-list"
                        style={{ cursor: "pointer" }}
                        tabIndex={0}
                    >
                        What's Allowed?
                    </Button>
                </OverlayTrigger>
            </div>
            <Collapse in={showLeaderboard}>
                <div>
                    <Leaderboard scores={props.scores} />
                </div>
            </Collapse>

            <div className="pt-5">
                <h2>Today's Numbers</h2>
                <div className="daily-numbers d-flex justify-content-evenly flex-column">
                    <span>
                        START: <b>{start}</b>
                    </span>
                    <span>
                        PROPAGATE: <b>{continuing}</b>
                    </span>
                    <span>
                        TARGET: <b>{target}</b>
                    </span>
                </div>
            </div>
            <Instructions
                show={showInstructions}
                onHide={() => setShowInstructions(false)}
                fullscreen={"sm-down"}
                start={start}
                continuing={continuing}
                target={target}
            />
        </div>
    );
}

export default Infobox;
