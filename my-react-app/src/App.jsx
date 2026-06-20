import Display from "./components/Display";
import Input from "./components/Input";
import ListGroup from "./components/ListGroup";
import { Fragment, useState } from "react";
import { ParseExpression } from "./utils/ParseExpressionUtil";
import { GetDailyNumbers } from "./utils/DailyNumbers";
import "./App.css";

function App() {
    const { start, continuing, target } = GetDailyNumbers();
    const [output, setOutput] = useState("");
    const [valid, setValidity] = useState(false);

    const handleSubmit = (value) => {
        const [output, numContinuing] = ParseExpression(value);

        if (numContinuing !== -1) {
            const score = 200 / (numContinuing + 1);
            setOutput(
                "Yay you did it! Your score was " +
                    Math.round(score).toString(),
            );
            setValidity(true);
        } else {
            setOutput(output);
            setValidity(false);
        }
    };

    return (
        <div className = "container">
        {/*at the centre*/}
        <div className="calculator">
            <Input onSubmit={handleSubmit}></Input>
            <Display value={output} valid={valid}></Display>
        </div>

        {/*on the left top, tells user what the starting, continuing and target numbers are*/}
        <div className="info-bracket">
            <h5>TODAY'S NUMBERS</h5>
            <p>Start: {start}</p>
            <p>Continuing: {continuing}</p>
            <p>Target: {target}</p>
        </div>

        {/*on the left bottom, includes valid operations*/}
        <div className="instructions">
            <h6><b>INSTRUCTIONS TO THE GAME</b></h6>
            <p>yap yap yap</p>
        </div>

        {/*on the right top, scrollable*/}
        <div className="scoreboard">
            <p>scoreboard placeholder</p>
        </div>

        {/*on the right bottom*/}
        <div className="nameInput">
            <p>nameInput placeholder</p>
        </div>
        </div>
    );
}

export default App;
