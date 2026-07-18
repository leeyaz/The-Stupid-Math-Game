import Button from "react-bootstrap/Button";
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

function HeaderButton({
    onClick,
    name,
    children,
    overlay,
    className,
    ...props
}) {
    return (
        <OverlayTrigger
            overlay={
                <Tooltip id={name} className="position-fixed" aria-hidden>
                    {name}
                </Tooltip>
            }
            placement={"bottom"}
            delay={{ show: 500, hide: 0 }}
        >
            <Button
                className={`header-button rounded-0 ${className}`}
                type="button"
                onClick={(e) => {
                    e.currentTarget.blur();
                    onClick && onClick();
                }}
                {...props}
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
        <header ref={contRef} className="header sticky-top" {...props}>
            <HeaderButton
                name="Changelog"
                onClick={() => setShowChangelog(true)}
                aria-label="changelog"
                aria-controls="changelog"
                aria-haspopup="dialog"
            >
                <FaClockRotateLeft size={27} aria-hidden />
            </HeaderButton>
            <HeaderButton name="Streak" aria-label={`${streak} day streak`}>
                <div className="d-flex flex-row align-items-center">
                    <FaFireAlt
                        size={30}
                        id="streak-icon"
                        aria-hidden
                        className={streakActive ? "active" : ""}
                    />
                    <span id="streak-number">{streak}</span>
                </div>
            </HeaderButton>
            <HeaderButton
                name="Settings"
                onClick={() => setShowSettings(true)}
                aria-label="settings"
                aria-controls="settings"
                aria-haspopup="dialog"
            >
                <IoSettings size={27} aria-hidden />
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
        </header>
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
