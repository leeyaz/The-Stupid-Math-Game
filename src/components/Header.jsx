import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";

import { FaClockRotateLeft } from "react-icons/fa6";
import { FaFireAlt } from "react-icons/fa";
import { FaRegCalendarCheck } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { IoIosStats } from "react-icons/io";

import Changelog from "./Changelog";
// https://react-icons.github.io/react-icons/search/
import Popover from "react-bootstrap/Popover";

import { getStreak, hasDeclinedCookies, hasPlayedToday } from "../utils/Streak";

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
            >
                {children}
            </Button>
        </OverlayTrigger>
    );
}

function Header({ ...props }) {
    const [showChangelog, setShowChangelog] = useState(false);
    const [showStats, setShowStats] = useState(false);
    const streak = getStreak();
    const playedToday = hasPlayedToday();
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("theme");
        if (saved) return saved == "dark";
        return false;
    });

    useEffect(() => {
        const root = document.documentElement;
        if (darkMode) {
            root.classList.add("dark-mode");
            root.setAttribute("data-bs-theme", "dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark-mode");
            root.setAttribute("data-bs-theme", "light");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const settings = (
        <Popover id="settings">
            <Popover.Body className="p-2 d-flex flex-column align-items-center">
                <Form.Check
                    type="switch"
                    id="dark-mode"
                    label="Dark Mode"
                    checked={darkMode}
                    onChange={(e) => {
                        setDarkMode(e.target.checked);
                    }}
                />
            </Popover.Body>
        </Popover>
    );
    return (
        <Navbar className="header py-0" sticky="top" {...props}>
            <HeaderButton id="Changelog" onClick={() => setShowChangelog(true)}>
                <FaClockRotateLeft size={27} />
            </HeaderButton>
            <HeaderButton id="Streak">
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "2px" }}>
                    <FaFireAlt size={27} color={streak > 0 && !hasDeclinedCookies() ? "orange" : "gray"}/>
                    {<span style={{ fontSize: "17px",
                                    fontWeight: "bold",
                                    marginLeft: "4px",
                                    marginRight: "2px",
                                    verticalAlign: "bottom",
                                    whiteSpace: "nowrap" }}> 
                        {!hasDeclinedCookies() ? streak : "N/A"} </span>}
                </div>
            </HeaderButton>
            <OverlayTrigger
                overlay={settings}
                placement={"bottom"}
                delay={{ show: 500, hide: 0 }}
                trigger="click"
                rootClose
            >
                <Button className="header-button rounded-0">
                    <IoSettings size={27} />
                </Button>
            </OverlayTrigger>
            <HeaderButton id="Statistics" onClick={() => setShowStats(true)}>
                <IoIosStats size={27} />
            </HeaderButton>

            <Changelog
                show={showChangelog}
                onHide={() => setShowChangelog(false)}
            />
        </Navbar>
    );

    //... oooh maybe stats could also show like, which functions have been used more often or soemthingg...
}

export default Header;
