import Input from "./Input";
import Display from "./Display";
import { ParseExpression } from "../utils/ParseExpressionUtil";
import { Fragment, useState } from "react";

function Calculator() {
    const [output, setOutput] = useState("");
    const [valid, setValidity] = useState(false);

    const handleSubmit = (value) => {
        const [output, numContinuing] = ParseExpression(value);

        if (numContinuing !== -1) {
            const noWhiteSpace = value.replace(/\s/g, "");
            const score = Math.round(50000 / noWhiteSpace.length ** 2);
            console.log(noWhiteSpace.length);
            setOutput("Yay you did it! Your score was " + score.toString());
            setValidity(true);
        } else {
            setOutput(output);
            setValidity(false);
        }
    };

    return (
        <div className="calculator">
            <Input onSubmit={handleSubmit}></Input>
            <Display value={output} valid={valid}></Display>
        </div>
    );
}

export default Calculator;
