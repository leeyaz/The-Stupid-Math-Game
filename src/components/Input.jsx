import { Fragment, useRef, useState } from "react";
import { evaluate, ParseExpression } from "../utils/ParseExpressionUtil.js";
import { GetDailyNumbers } from "../utils/DailyNumbers.js";
import { Button } from "react-bootstrap";

function Input({ onSubmit, showDisplay }) {
    const { start, continuing, target } = GetDailyNumbers();
    const [currInput, setCurrInput] = useState("");
    const [currResult, setCurrResult] = useState("~");
    const taRef = useRef(null);

    const handleKeyDown = (e) => {
        const key = e.key;
        const start = e.target.selectionStart;
        const end = e.target.selectionEnd;
        const selected = currInput.substring(start, end);
        if (key == "(") {
            e.preventDefault();
            // == Handle Parenthesis == \\
            const newValue =
                currInput.substring(0, start) +
                "(" +
                selected +
                ")" +
                currInput.substring(end);
            setCurrInput(newValue);
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";

            try {
                setCurrResult(evaluate(newValue));
            } catch (e) {
                setCurrResult("~");
            }

            setTimeout(() => {
                const cursorPos = start + 1;
                taRef.current.focus();
                taRef.current.setSelectionRange(cursorPos, cursorPos);
            }, 0);
        } else if (key == "Backspace") {
            if (start === end && start > 0) {
                const charBefore = currInput[start - 1];
                const charAfter = currInput[start];
                if (charBefore == "(" && charAfter == ")") {
                    e.preventDefault();

                    const newValue =
                        currInput.substring(0, start - 1) +
                        currInput.substring(start + 1);

                    setCurrInput(newValue);
                }
            }
        }
    };

    const handleInputChange = (e) => {
        if (e.target.value.length == 0) {
            showDisplay(false);
        }
        setCurrInput(e.target.value);
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";

        try {
            setCurrResult(evaluate(e.target.value));
        } catch (e) {
            setCurrResult("~");
        }
    };

    return (
        <div className="d-flex flex-column">
            <textarea
                type="text"
                id="math-input"
                ref={taRef}
                onKeyDown={handleKeyDown}
                className="math-input text-center rounded-3"
                placeholder="Enter the MATH EXPRESSION"
                value={currInput}
                onChange={handleInputChange}
                spellCheck="false"
                autoCorrect="off"
                autoComplete="off"
                autoCapitalize="none"
                rows="1"
            ></textarea>
            <p className="m-2">
                {" "}
                {currResult.length === 0 ? "" : "="}{" "}
                <b
                    style={{
                        color:
                            currResult === "~"
                                ? "gray"
                                : currResult == target
                                  ? "green"
                                  : "red",
                    }}
                >
                    {currResult}
                </b>
            </p>
            <div>
                <Button
                    variant="primary"
                    onClick={() => onSubmit(currInput)}
                    disabled={currInput == ""}
                >
                    Submit
                </Button>
            </div>
        </div>
    );
}

export default Input;
