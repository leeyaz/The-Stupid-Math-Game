import { Fragment, useState } from "react";
import { evaluate, ParseExpression } from "../utils/ParseExpressionUtil.js";

function Input({onSubmit}) {
    const [currInput, setCurrInput] = useState("");
    const [currResult, setCurrResult] = useState("");
    return (
        <>
            <input
                type="text"
                placeholder="Enter the MATH"
                value={currInput}
                onChange={(e) => {
                    setCurrInput(e.target.value)

                    try {
                        setCurrResult(evaluate(e.target.value))
                    } catch (e) {
                        setCurrResult("~")
                    }

                }}
            ></input>
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
