import { Fragment, useState } from "react";
import { evaluate, ParseExpression } from "../utils/ParseExpressionUtil.js";
import { GetDailyNumbers } from "../utils/DailyNumbers.js"

function Input({ onSubmit }) {
    const { start, continuing, target } = GetDailyNumbers();
    const [currInput, setCurrInput] = useState("");
    const [currResult, setCurrResult] = useState("~");

    const handleInputChange = (e) => {
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
        <div className="d-flex flex-column p-2">
            <textarea
                type="text"
                className="text-center"
                placeholder="Enter the MATH EXPRESSION"
                value={currInput}
                onChange={handleInputChange}
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
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => onSubmit(currInput)}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default Input;
