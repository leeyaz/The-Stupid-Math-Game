import Input from "./Input";
import Display from "./Display";
import { ParseExpression } from "../utils/ParseExpressionUtil";
import { Fragment, useState } from "react";
import { updateStreak } from "../utils/Streak";

function Calculator({ onSetLastScore }) {
    const [output, setOutput] = useState("");
    const [valid, setValidity] = useState(false);
    const [displayActive, setDisplayActive] = useState(false);

    const handleSubmit = (value) => {
        setDisplayActive(true);
        try {
            const [output, score] = ParseExpression(value);
            setOutput("Yay you did it! Your score is " + score.toString());
            setValidity(true);
            onSetLastScore(score);
            updateStreak();
        } catch (err) {
            setOutput(err.message);
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
