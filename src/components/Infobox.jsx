import Instructions from "./Instructions";
import Button from "react-bootstrap/Button";
import Leaderboard from "./Leaderboard";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useState, useEffect } from "react";
import { GetDailyNumbers } from "../utils/DailyNumbers";

import Collapse from "react-bootstrap/Collapse";

import {
    allowedConstants,
    allowedFunctions,
    allowedOperations,
} from "../utils/ParseExpressionUtil";

const renderAllowed = (props) => (
    <Tooltip {...props}>
        <div className="text-start">
            <b>Operations</b>:{" "}
            <small>{[...allowedOperations].join(", ")}</small>
            <br></br>
            <b>Functions</b>: <small>{[...allowedFunctions].join(", ")}</small>
            <br></br>
            <b>Constants</b>: <small>{[...allowedConstants].join(", ")}</small>
        </div>
    </Tooltip>
);

function Infobox(props) {
    const { start, continuing, target } = GetDailyNumbers();

    const [placement, setPlacement] = useState("right");
    const [showInstructions, setShowInstructions] = useState(false);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 700) {
                setPlacement("bottom");
            } else {
                setPlacement("right-start");
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="info">
            <div className="top-buttons d-flex gap-3 justify-content-center mb-3">
                <Button
                    variant="warning"
                    onClick={() => {
                        setShowInstructions(true);
                    }}
                >
                    How to Play
                </Button>
                <Button variant="info" onClick={() => setOpen(!open)}>
                    Daily Leaderboard
                </Button>
                <OverlayTrigger
                    placement={placement}
                    trigger="focus"
                    delay={{ show: 0, hide: 0 }}
                    overlay={renderAllowed}
                >
                    <Button variant="outline-dark">What's Allowed?</Button>
                </OverlayTrigger>
            </div>
            <Collapse in={open}>
                <div>
                    <Leaderboard lastScore={props.lastScore} scores={props.scores} />
                </div>
            </Collapse>
            
            <div className="pt-5">
                <h3><b>Today's Numbers</b></h3>
                <div className="daily-numbers d-flex justify-content-evenly flex-column">
                    <span>START: <b>{start}</b></span>
                    <span>PROPAGATE: <b>{continuing}</b></span>
                    <span>TARGET: <b>{target}</b></span>
                </div>
            </div>
            <Instructions
                show={showInstructions}
                onHide={() => setShowInstructions(false)}
                fullscreen={"sm-down"}
            />
        </div>
    );
}

export default Infobox;
