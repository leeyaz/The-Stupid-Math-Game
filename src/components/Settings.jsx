import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";

import { IoMdClose } from "react-icons/io";

import { CookieConfirmationDialog } from "./CookieDisclaimer";

import { THEMES_LIST, getColourTheme, setColourTheme } from "../utils/Theme";

function toTitleCase(str) {
    return str.replace("-", " ").replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
}

function Settings({ show, onHide, ...props }) {
    const [theme, setTheme] = useState(getColourTheme());
    useEffect(() => setColourTheme(theme), [theme]);

    const [showStreakNotice, setShowStreakNotice] = useState(false);

    return (
        <>
            <Modal
                {...props}
                id="settings"
                show={show}
                onHide={onHide}
                centered
                aria-labelledby="settings-title"
                size="md"
                style={{ zIndex: 1050 }}
            >
                <Modal.Header>
                    <Col />
                    <Col className="text-center">
                        <Modal.Title id="settings-title">Settings</Modal.Title>
                    </Col>
                    <Col className="text-end">
                        <Button
                            type="button"
                            aria-label="Close"
                            onClick={() => onHide()}
                        >
                            <IoMdClose size={27} />
                        </Button>
                    </Col>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col
                            xs={7}
                            className="d-flex flex-column align-items-start"
                        >
                            <Form.Check.Label
                                htmlFor="theme-dropdown"
                                className="align-middle"
                                aria-describedby="theme-description"
                            >
                                Theme
                            </Form.Check.Label>
                            <p id="theme-description">
                                Colour themes ranging from calm, subtle hues to
                                eye-piercing neons.
                            </p>
                        </Col>
                        <Col className="d-flex justify-content-end align-items-center">
                            <Dropdown
                                id="theme-dropdown"
                                className="d-inline-block"
                                drop="down"
                                align="end"
                            >
                                <Dropdown.Toggle size="sm">
                                    {toTitleCase(theme)}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="w-100">
                                    {THEMES_LIST.map((themeID) => {
                                        return (
                                            <Dropdown.Item
                                                data-bs-theme={themeID}
                                                onClick={() =>
                                                    setTheme(themeID)
                                                }
                                                key={themeID}
                                            >
                                                {toTitleCase(themeID)}
                                            </Dropdown.Item>
                                        );
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            xs={7}
                            className="d-flex flex-column align-items-start"
                        >
                            <Form.Check.Label
                                htmlFor="streak-checkbox"
                                aria-describedby="streak-description"
                            >
                                Streak Enabled
                            </Form.Check.Label>
                            <p id="streak-description">
                                Keep track of your daily wins.
                            </p>
                        </Col>
                        <Col className="d-flex justify-content-end align-items-center">
                            <Form.Check.Input
                                id="streak-checkbox"
                                type="checkbox"
                                onChange={() => setShowStreakNotice(true)}
                            />
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
            <CookieConfirmationDialog
                show={showStreakNotice}
                onHide={(val) => setShowStreakNotice(false)}
                streakEnabled={true}
            />
        </>
    );
}

export default Settings;
