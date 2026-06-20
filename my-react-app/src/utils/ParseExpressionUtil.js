import { all, create, exp } from "mathjs";
import { GetDailyNumbers } from "./DailyNumbers";

const math = create(all);
const limitedEvaluate = math.evaluate;
const { start, continuing, target } = GetDailyNumbers();

math.import(
    {
        import: function () {
            throw new Error("Function import is disabled");
        },
        createUnit: function () {
            throw new Error("Function createUnit is disabled");
        },
        evaluate: function () {
            throw new Error("Function evaluate is disabled");
        },
        parse: function () {
            throw new Error("Function parse is disabled");
        },
        simplify: function () {
            throw new Error("Function simplify is disabled");
        },
        derivative: function () {
            throw new Error("Function derivative is disabled");
        },
    },
    { override: true },
);

export function evaluate(expression) {
    return limitedEvaluate(expression);
}

// will return an array: [0] is the output string, [1] is the number of continuing digits (-1 if output didnt meet all requirements)
export function ParseExpression(expression) {
    let output;
    let startingNumber = start;
    let continuingNumber = continuing;
    let targetNumber = target;

    // Check if its legit math
    const trimmedExpr = expression.replace(/\s/g, "");

    try {
        output = limitedEvaluate(expression).toString();
    } catch (error) {
        return ["Error in Math Expression", -1];
    }

    /*
        Checks if it...
            a: Starts with the starting number (must be solely that number, not meaning leading digit)
            b: Only contains the continuing number afterwards
    */

    const numbersFound = trimmedExpr.match(/-?\d+/g);
    const regEx = new RegExp(`^-?${Math.abs(continuingNumber)}+$`);

    for (let i = 0; i < numbersFound.length; i++) {
        const currentNum = numbersFound[i];
        if (i === 0) {
            if (currentNum !== startingNumber.toString()) {
                return ["Does not start with " + startingNumber.toString(), -1];
            }
        } else {
            if (!regEx.test(currentNum)) {
                return [
                    "At least one subsequent digit is not " +
                        continuingNumber.toString(),
                    -1,
                ];
            }
        }
    }

    // check if output equals the target number
    if (output !== targetNumber.toString()) {
        return ["Didn't reach target of "+targetNumber.toString(), -1];
    }

    return [output, numbersFound.length - 1];
}
