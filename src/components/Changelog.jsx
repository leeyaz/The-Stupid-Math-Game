import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";

import changelogData from "../changelog.json";

function Changelog({ show, onHide }) {
    return (
        <Modal show={show} fullscreen={false} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Changelog</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {changelogData.map((data, i) => {
                    return (
                        <div key={i}>
                            <span
                                style={{ fontSize: "24px", fontWeight: "bold" }}
                            >
                                Update {data.version}
                            </span>
                            <br />
                            <span
                                style={{ fontSize: "14px", fontWeight: "bold" }}
                            >
                                {data.date}
                            </span>
                            {data.description && (
                                <p className="my-2">{data.description}</p>
                            )}
                            {data.added.length > 0 && (
                                <div>
                                    <b>Added:</b>
                                    <ul>
                                        {data.added.map((d, i) => {
                                            return <li key={i}>{d}</li>;
                                        })}
                                    </ul>
                                </div>
                            )}
                            {data.fixed.length > 0 && (
                                <div>
                                    <b>Fixed:</b>
                                    <ul>
                                        {data.fixed.map((d, i) => {
                                            return <li key={i}>{d}</li>;
                                        })}
                                    </ul>
                                </div>
                            )}
                            <hr />
                        </div>
                    );
                })}
            </Modal.Body>
        </Modal>
    );
}

export default Changelog;
