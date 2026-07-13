import { Fragment, useEffect, useRef, useState } from "react";
import { evaluate, ParseExpression } from "../utils/ParseExpressionUtil.js";
import { GetDailyNumbers } from "../utils/DailyNumbers.js";
import { Button } from "react-bootstrap";

function Input({ onSubmit, showDisplay }) {
    const { start, continuing, target } = GetDailyNumbers();
    const [currInput, setCurrInput] = useState("");
    const [currResult, setCurrResult] = useState("~");
    const taRef = useRef(null);

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

    useEffect(() => {
        const ta = taRef.current;
        if (!ta) return;
        // TODO: Highlight the parentheses pair when its selected? honestly seems really hard...
        const onBeforeInput = (e) => {
            const start = ta.selectionStart;
            const end = ta.selectionEnd;
            if (
                e.data?.length === 1 &&
                e.data === "(" &&
                (ta.value[end] === " " || !ta.value[end])
            ) {
                e.preventDefault();
                const selected = ta.value.slice(start, end);
                console.log(
                    start,
                    end,
                    ta.value.slice(0, start),
                    selected,
                    ta.value.slice(end, ta.value.length),
                );
                ta.value =
                    ta.value.slice(0, start) +
                    "(" +
                    selected +
                    ")" +
                    ta.value.slice(end, ta.value.length);
                ta.selectionStart = start + 1;
                ta.selectionEnd = end + 1;

                setCurrInput(ta.value);
            } else if (
                e.data?.length === 1 &&
                e.data == ")" &&
                ta.value[end] == ")"
            ) {
                // ex. typing "ceil(", autofill the ")" then type the ")" which should ignore the autofill
                e.preventDefault();
                ta.selectionStart = end + 1;
                ta.selectionEnd = end + 1;
            } else if (
                start == end &&
                ta.value[end - 1] == "(" &&
                ta.value[end] == ")" &&
                e.inputType == "deleteContentBackward"
            ) {
                e.preventDefault();
                ta.value =
                    ta.value.slice(0, start - 1) +
                    ta.value.substring(start + 1);
                ta.selectionStart = start - 1;
                ta.selectionEnd = start - 1;
                setCurrInput(ta.value);
            }
            try {
                setCurrResult(evaluate(ta.value));
            } catch (e) {
                setCurrResult("~");
            }
        };

        ta.addEventListener("beforeinput", onBeforeInput);
        return () => {
            ta.removeEventListener("beforeinput", onBeforeInput);
        };
    }, []);

    return (
        <div className="d-flex flex-column">
            <textarea
                type="text"
                id="math-input"
                ref={taRef}
                //  onBeforeInput={handleBeforeInput}
                //onKeyDown={handleKeyDown}
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
