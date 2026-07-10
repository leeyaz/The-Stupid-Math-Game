import Input from "./Input";
import Display from "./Display";
import { ParseExpression } from "../utils/ParseExpressionUtil";
import { Fragment, useState } from "react";
import { hasDeclinedCookies, deleteStreakCookie, updateStreak } from "../utils/Streak";

function Calculator({ onSetLastScore }) {
    const [output, setOutput] = useState("");
    const [valid, setValidity] = useState(false);
    const [displayActive, setDisplayActive] = useState(false);

    const handleSubmit = (value) => {
        setDisplayActive(true);
        try {
            const [output, score] = ParseExpression(value);
            // const noWhiteSpace = value.replace(/\s/g, "");
            // const score = Math.round(50000 / noWhiteSpace.length ** 2);

            setOutput("Yay you did it! Your score is " + score.toString());
            setValidity(true);
            onSetLastScore(score);
            
            if (!hasDeclinedCookies()) {
                updateStreak();
            } else {
                deleteStreakCookie();
            }

            //streak for now
            // const newStreak = updateStreak();
            // console.log("Current streak:", newStreak);
        } catch (err) {
            setOutput(err.message);
            setValidity(false);
        }
        // if (numContinuing !== -1) {
        //     const noWhiteSpace = value.replace(/\s/g, "");
        //     const score = Math.round(50000 / noWhiteSpace.length ** 2);

        //     setOutput("Yay you did it! Your score is " + score.toString());
        //     setValidity(true);
        //     onSetLastScore(score);
        // } else {
        //     setOutput(output);
        //     setValidity(false);
        // }
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
