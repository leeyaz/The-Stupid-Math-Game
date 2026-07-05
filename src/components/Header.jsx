import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FaCalendar } from "react-icons/fa";
import { IconContext } from "react-icons";
import { FaFireAlt } from "react-icons/fa";
import { TbExchange } from "react-icons/tb";

function HeaderButton({ onClick, id, children }) {
    return (
        <OverlayTrigger
            overlay={<Tooltip id={id}>{id}</Tooltip>}
            placement={"bottom"}
        >
            <Button
                className="rounded-0"
                onClick={onClick}
                style={{
                    height: "50px",
                    width: "50px",
                    padding: "0",
                    border: "0",
                    "--bs-btn-bg": "#fff",
                    "--bs-btn-color": "#222",
                    "--bs-btn-hover-bg": "#eee",
                    "--bs-btn-hover-color": "#222",
                    "--bs-btn-active-bg": "#ddd",
                    "--bs-btn-active-color": "#222",
                    transition: "all 0s ease",
                }}
            >
                {children}
            </Button>
        </OverlayTrigger>
    );
}

function Header() {
    return (
        <div className="Header  d-flex justify-content-start align-items-center border-bottom ">
            <HeaderButton id="Changelog">
                <TbExchange size={30} />
            </HeaderButton>
            <HeaderButton id="Daily Streak">
                <FaFireAlt size={30} />
            </HeaderButton>
        </div>
    );
}

export default Header;
