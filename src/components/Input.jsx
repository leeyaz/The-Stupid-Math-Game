import { Fragment, useState } from "react";
import { evaluate, ParseExpression } from "../utils/ParseExpressionUtil.js";
import { GetDailyNumbers } from "../utils/DailyNumbers.js";
import { Button } from "react-bootstrap";

function Input({ onSubmit, showDisplay }) {
    const { start, continuing, target } = GetDailyNumbers();
    const [currInput, setCurrInput] = useState("");
    const [currResult, setCurrResult] = useState("~");

    const handleInputChange = (e) => {
        if (e.target.value.length == 0) {
            console.log("FALSE!!");
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
