import Calculator from "./components/Calculator";
import { GetDailyNumbers } from "./utils/DailyNumbers";
import "./App.css";

function App() {
    const { start, continuing, target } = GetDailyNumbers();

    return (
        <div className="container">
            <div className="title">
                <h1>
                    <b>STUPID MATH</b>
                    <span style={{ fontSize: "10px" }}> the </span>
                    <b>GAME</b>™
                </h1>
            </div>

            {/*at the centre*/}
            <Calculator />

            {/*on the left top, tells user what the starting, continuing and target numbers are*/}
            <div className="info-bracket">
                <h5>TODAY'S NUMBERS</h5>
                <p>Start: {start}</p>
                <p>Continuing: {continuing}</p>
                <p>Target: {target}</p>
                <p>
                    Available Operations: +, -, *, /, (, ), ^ (power), %
                    (modulus or percentage), ! (factorial), sin, cos, tan, sec,
                    csc, cot, floor, pi, e, ...and more. Check out{" "}
                    <a href="https://mathjs.org/docs/expressions/syntax.html">
                        this website
                    </a>{" "}
                    for more information.
                </p>
            </div>

            {/*on the left bottom, includes valid operations*/}
            <div className="instructions">
                <h6>
                    <b>INSTRUCTIONS TO THE GAME</b>
                </h6>
                <p>
                    Your expression MUST begin with the Start number once,
                    today's is {start}. After {start}, you may only use the
                    Continuing number, which is {continuing} today, which you
                    may use any number of times. Your goal is to bring the
                    operation to equal to the target number, that number is{" "}
                    {target} today. Your score is counted by the length of your
                    expression, your goal is to find the shortest expression.
                    All number combinations are possible. See above for
                    available operations, numbers randomize from 0 to 100 every
                    day. Have fun playing!! :)
                </p>
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
