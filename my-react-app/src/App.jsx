import Display from "./components/Display";
import Input from "./components/Input";
import ListGroup from "./components/ListGroup";
import { Fragment, useState } from "react";
import { ParseExpression } from "./utils/ParseExpressionUtil";

function App() {
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
        <div className="calculator">
            <Input onSubmit={handleSubmit}></Input>
            <Display value={output} valid={valid}></Display>
        </div>
    );
}

export default App;
