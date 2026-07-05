import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";

import { FaClockRotateLeft } from "react-icons/fa6";
import { FaFireAlt } from "react-icons/fa";
import { FaRegCalendarCheck } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";

import Changelog from "./Changelog";
// https://react-icons.github.io/react-icons/search/

function HeaderButton({ onClick, id, children, overlay }) {
    return (
        <OverlayTrigger
            overlay={<Tooltip id={id}>{id}</Tooltip>}
            placement={"bottom"}
            delay={{ show: 500, hide: 0 }}
            // below: hacky workaround the warnings in console...
            // fine b/c tooltip isn't very important anyways
            //trigger={["hover", "hover"]}
            trigger="click"
        >
            <Button className="header-button rounded-0" onClick={onClick}>
                {children}
            </Button>
        </OverlayTrigger>
    );
}

function Header() {
    const [showChangelog, setShowChangelog] = useState(false);

    return (
        <div className="header d-flex justify-content-start align-items-center">
            <HeaderButton id="Changelog" onClick={() => setShowChangelog(true)}>
                <FaClockRotateLeft size={27} />
            </HeaderButton>
            <HeaderButton id="Daily Streak">
                <FaFireAlt size={27} />
            </HeaderButton>
            

            <Changelog
                show={showChangelog}
                onHide={() => setShowChangelog(false)}
            />
        </div>
    );
}

export default Header;
