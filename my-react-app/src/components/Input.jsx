import { Fragment, useState } from "react";
import { evaluate, ParseExpression } from "../utils/ParseExpressionUtil.js";

function Input({onSubmit}) {
    const [currInput, setCurrInput] = useState("");
    const [currResult, setCurrResult] = useState("");
    return (
        <>
            <textarea
                type="text"
                placeholder="Enter the MATH EXPRESSION"
                value={currInput}
                onChange={(e) => {
                    setCurrInput(e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";

                    try {
                        setCurrResult(evaluate(e.target.value))
                    } catch (e) {
                        setCurrResult("~")
                    }

                }}
            ></textarea>
            <button type="button" className="btn btn-primary" onClick={() => onSubmit(currInput)}>
                Submit
            </button>
            <p>
                Current Result: {currResult}
            </p>
        </>
    );
}

export default Input;
