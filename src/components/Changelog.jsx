import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";

import changelogData from "../changelog.json";
import { FaGithub } from "react-icons/fa";

const specialCharacters = ["*", "_", ">"];

function formatString(text) {
    /*
        Formats the text:
        - Surrounding text bits with...
            - '*' => bolds inner text
            - '_' => italicizes inner text
            - '>' => bullet point
        - To escape a specialCharacter, add '/' before it
        - Only works one level down (i.e. "_*WOoooO*_" won't work as intended)
    */
    const tokens = [];
    let start = 0;
    let inside = false;
    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        if (
            specialCharacters.includes(char) &&
            (i == 0 || text[i - 1] != "/")
        ) {
            inside = !inside;
            if (i != 0) {
                const token = text.substring(start, i);
                tokens.push(token);
            }

            start = i + (inside ? 0 : 1);
        }
    }
    if (start != text.length) {
        // tokenize last bit
        const token = text.substring(start, text.length);
        tokens.push(token);
    }

    return tokens.map((token, index) => {
        if (token.length == 0) return;
        const startChar = token[0];
        const cutToken = token.substring(1, token.length);
        switch (startChar) {
            case "*":
                return <b key={index}>{cutToken.replaceAll("/", "")}</b>;
            case "_":
                return <i key={index}>{cutToken.replaceAll("/", "")}</i>;
            case ">":
                return (
                    <span className="bullet">
                        <b>{"\n•  "}</b>
                        {cutToken.replaceAll("/", "")}
                    </span>
                );
            default:
                return token.replaceAll("/", "");
        }
    });
}

function Changelog({ show, onHide, ...props }) {
    return (
        <Modal
            id="changelog"
            aria-labelledby="changelog-title"
            show={show}
            fullscreen={false}
            onHide={onHide}
            {...props}
        >
            <Modal.Header closeButton>
                <Modal.Title id="changelog-title">Changelog</Modal.Title>
                <a
                    href="https://github.com/leeyaz/The-Stupid-Math-Game"
                    aria-label="github page"
                >
                    <FaGithub className="mx-2" size={25} />
                </a>
            </Modal.Header>
            <Modal.Body className="background">
                {changelogData.map((data, i) => {
                    return (
                        <div key={i}>
                            <h2 className="update">Update {data.version}</h2>

                            <span className="date">{data.date}</span>

                            {data.description && (
                                <p className="description">
                                    {formatString(data.description)}
                                </p>
                            )}
                            {data.added.length > 0 && (
                                <div className="added">
                                    <h3>Added:</h3>
                                    <ul>
                                        {data.added.map((d, i) => {
                                            return (
                                                <li key={i}>
                                                    <p>{formatString(d)}</p>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                            {data.changed.length > 0 && (
                                <div className="changed">
                                    <h3>Changed:</h3>
                                    <ul>
                                        {data.changed.map((d, i) => {
                                            return (
                                                <li key={i}>
                                                    <p>{formatString(d)}</p>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                            {data.fixed.length > 0 && (
                                <div className="fixed">
                                    <h3>Fixed:</h3>
                                    <ul>
                                        {data.fixed.map((d, i) => {
                                            return (
                                                <li key={i}>
                                                    <p>{formatString(d)}</p>
                                                </li>
                                            );
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
