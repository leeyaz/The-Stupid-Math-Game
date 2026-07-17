import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Popover from "react-bootstrap/Popover";
import { useState, useEffect, useRef } from "react";

import { FaClockRotateLeft } from "react-icons/fa6";
import { FaFireAlt } from "react-icons/fa";
import { FaRegCalendarCheck } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { IoIosStats } from "react-icons/io";

import Changelog from "./Changelog";
import Settings from "./Settings";

function HeaderButton({ onClick, name, children, overlay, className }) {
    return (
        <OverlayTrigger
            overlay={<Tooltip id={name} className="position-fixed">{name}</Tooltip>}
            placement={"bottom"}
            delay={{ show: 500, hide: 0 }}
        >
            <Button
                className={`header-button rounded-0 ${className}`}
                onClick={(e) => {
                    e.currentTarget.blur();
                    onClick && onClick();
                }}
                aria-label={name}
            >
                {children}
            </Button>
        </OverlayTrigger>
    );
}

function Header({ streak, streakActive, ...props }) {
    const [showChangelog, setShowChangelog] = useState(false);
    const [showStats, setShowStats] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    const contRef = useRef(null);

    return (
        <Navbar ref={contRef} className="header py-0" sticky="top" {...props}>
            <HeaderButton
                name="Changelog"
                onClick={() => setShowChangelog(true)}
            >
                <FaClockRotateLeft size={27} />
            </HeaderButton>
            <HeaderButton name="Streak">
                <div className="d-flex flex-row align-items-center">
                    <FaFireAlt
                        size={30}
                        id="streak-icon"
                        className={streakActive ? "active" : ""}
                    />
                    <span id="streak-number">{streak}</span>
                </div>
            </HeaderButton>
            <HeaderButton name="Settings" onClick={() => setShowSettings(true)}>
                <IoSettings size={27} />
            </HeaderButton>

            <Changelog
                show={showChangelog}
                onHide={() => setShowChangelog(false)}
            />

            <Settings
                show={showSettings}
                centered
                onHide={() => setShowSettings(false)}
            />
        </Navbar>
    );

    //... oooh maybe stats could also show like, which functions have been used more often or soemthingg...
    // hmmm
    /*
            <HeaderButton id="Statistics" onClick={() => setShowStats(true)}>
                <IoIosStats size={27} />
            </HeaderButton>
    */
}

export default Header;
