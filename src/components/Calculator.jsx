import Input from "./Input";
import Display from "./Display";
import { ParseExpression } from "../utils/ParseExpressionUtil";
import { Fragment, useState } from "react";

function Calculator({ onSetLastScore }) {
    const [output, setOutput] = useState("");
    const [valid, setValidity] = useState(false);
    const [displayActive, setDisplayActive] = useState(false);

    const handleSubmit = (value) => {
        setDisplayActive(true);
        const [output, numContinuing] = ParseExpression(value);

        if (numContinuing !== -1) {
            const noWhiteSpace = value.replace(/\s/g, "");
            const score = Math.round(50000 / noWhiteSpace.length ** 2);

            setOutput("Yay you did it! Your score is " + score.toString());
            setValidity(true);
            onSetLastScore(score);
        } else {
            setOutput(output);
            setValidity(false);
        }
    };

    return (
        <div className="calculator">
            <Input
                onSubmit={handleSubmit}
                showDisplay={setDisplayActive}
            ></Input>
            <Display value={displayActive && output} valid={valid}></Display>
        </div>
    );
}

export default Calculator;
