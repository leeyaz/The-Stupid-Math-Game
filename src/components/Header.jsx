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

import {
    getStreak,
    hasDeclinedCookies,
    hasPlayedToday,
    setDeclinedCookies,
    deleteStreakCookie,
} from "../utils/Streak";

function HeaderButton({ onClick, id, children, overlay, className }) {
    return (
        <OverlayTrigger
            overlay={<Tooltip id={id}>{id}</Tooltip>}
            placement={"bottom"}
            delay={{ show: 500, hide: 0 }}
            // below: hacky workaround the warnings in console...
            // fine b/c tooltip isn't very important anyways
            //trigger={["hover", "hover"]}
            // trigger="hover"
        >
            <Button
                className={`header-button rounded-0 ${className}`}
                onClick={onClick}
                aria-label={id}
            >
                {children}
            </Button>
        </OverlayTrigger>
    );
}

function Header({ streakEnabled, setStreakEnabled, ...props }) {
    const [showChangelog, setShowChangelog] = useState(false);
    const [showStats, setShowStats] = useState(false);
    const [streak, setStreak] = useState(getStreak());

    const playedToday = hasPlayedToday();
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("theme");
        if (saved) return saved == "dark";
        return false;
    });
    const [showStreakNotice, setShowStreakNotice] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    const handleConfirm = () => {
        if (streakEnabled) {
            // now enabled
            localStorage.removeItem("cookiesDeclined");
            window.dispatchEvent(new Event("streakChanged"));
        } else {
            // now disabled
            setDeclinedCookies();
            deleteStreakCookie();
        }
        setShowStreakNotice(false);
    };

    const handleNotConfirm = () => {
        setStreakEnabled(!streakEnabled);
        setShowStreakNotice(false);
    };

    useEffect(() => {
        window.addEventListener("streakChanged", () => {
            setStreak(getStreak());
        });
    }, []);

    const settings = (
        <Popover id="settings">
            <Popover.Body className="p-2 d-flex flex-column align-items-left">
                <Form.Check
                    type="switch"
                    id="dark-mode"
                    label="Dark Mode"
                    checked={darkMode}
                    onChange={(e) => {
                        setDarkMode(e.target.checked);
                    }}
                />
                <Form.Check
                    type="switch"
                    id="streak-toggle"
                    label="Streak?"
                    checked={streakEnabled}
                    disabled={showStreakNotice}
                    onChange={() => {
                        setStreakEnabled(!streakEnabled);
                        setShowStreakNotice(true);
                    }}
                />
            </Popover.Body>
        </Popover>
    );

    const contRef = useRef(null);

    return (
        <Navbar ref={contRef} className="header py-0" sticky="top" {...props}>
            <HeaderButton id="Changelog" onClick={() => setShowChangelog(true)}>
                <FaClockRotateLeft size={27} />
            </HeaderButton>
            <HeaderButton id="Streak">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: "4px",
                    }}
                >
                    <FaFireAlt
                        size={27}
                        color={
                            !hasDeclinedCookies() &&
                            hasPlayedToday() &&
                            streak > 0
                                ? "orange"
                                : "gray"
                        }
                        id="streak-icon"
                    />
                    {
                        <span
                            style={{
                                fontSize: "17px",
                                fontWeight: "bold",
                                marginLeft: "4px",
                                marginRight: "4px",
                                verticalAlign: "bottom",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {!hasDeclinedCookies() ? streak : "N/A"}{" "}
                        </span>
                    }
                </div>
            </HeaderButton>
            <HeaderButton id="Settings" onClick={() => setShowSettings(true)}>
                <IoSettings size={27} />
            </HeaderButton>

            <Changelog
                show={showChangelog}
                onHide={() => setShowChangelog(false)}
            />

            <Settings
                show={showSettings}
                onHide={() => setShowSettings(false)}
            />

            <Modal show={showStreakNotice} centered onHide={handleNotConfirm}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {streakEnabled
                            ? "Turning your Streak ON!!"
                            : "Turning your Streak OFF!!"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {streakEnabled
                        ? "Your Streak will be be kept as a cookie across visits"
                        : "Your Streak will be completely deleted, gone forever. If you re-enable your Streak, it will be back to 0"}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleConfirm}>
                        Yeah I want that
                    </Button>
                    <Button
                        variant="outline-secondary"
                        onClick={handleNotConfirm}
                    >
                        {" "}
                        {streakEnabled
                            ? "No I do not want a Streak"
                            : "No I want to keep my Streak"}{" "}
                    </Button>
                </Modal.Footer>
            </Modal>
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
