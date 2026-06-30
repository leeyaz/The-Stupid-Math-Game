import { all, create, exp } from "mathjs";
import { GetDailyNumbers } from "./DailyNumbers";

const math = create(all);
const { start, continuing, target } = GetDailyNumbers();

export const allowedOperations = new Set(["+", "-", "*", "/", "!", "%", "^", "&", "|"]);
export const allowedFunctions = new Set([
    "floor",
    "ceil",
    "round",
    "abs",
    "sqrt",
    "cbrt",
    "square",
    "cube",
    "log",
    "sin",
    "cos",
    "tan",
    "csc",
    "sec",
    "cot",
    "asin",
    "acos",
    "atan",
    "acsc",
    "asec",
    "acot",
    // add any custom functions below here
    "xten" 
]);

const customFunctions = {
    xten: function (a) {
        return a * 10.0;
    }
}
math.import(customFunctions);

export const allowedConstants = new Set(["pi", "e"]);
const allowedSymbols = allowedFunctions.union(allowedConstants);


function containsOnlyAllowed(expression) {
    let valid = true;
    const nodeTree = math.parse(expression);
    nodeTree.traverse((node) => {
        if (
            (node.type === "FunctionNode" &&
                !allowedFunctions.has(node.name)) ||
            (node.type === "SymbolNode" && !allowedSymbols.has(node.name)) ||
            (node.type === "OperatorNode" && !allowedOperations.has(node.op))
        ) {
            // console.log(
            //     "Disallowed node: ",
            //     node.type === "OperatorNode" ? node.op : node.name,
            // );
            valid = false;
        }
    });

    return valid;
}

export function evaluate(expression) {
    // Remove restrictConstantsScope below, or change the restrictedConstants array if needed.
    if (!containsOnlyAllowed(expression)) {
        throw new Error("Invalid Expression!");
    }

    const result = math.evaluate(expression);
    if (typeof result !== "number") {
        throw new Error("Invalid expression!");
    }
    return result.toString();
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
        output = evaluate(expression).toString();
    } catch (error) {
        return ["Error in Math Expression", -1];
    }

    /*
        Checks if it...
            a: Starts with the starting number (must be solely that number, not meaning leading digit)
            b: Only contains the continuing number afterwards
    */

    const numbersFound = trimmedExpr.match(/\d+/g) || []; //trimmedExpr.match(/-?\d+/g) || [];
    if (numbersFound.length === 0) {
        return ["No relevant numbers found in expression", -1]; // may need to revisit cuz of e and pi
    }

    const regEx = new RegExp(`^${continuingNumber}+$`); //new RegExp(`^-?${Math.abs(continuingNumber)}+$`);

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
        return ["Didn't reach target of " + targetNumber.toString(), -1];
    }

    return [output, numbersFound.length - 1];
}
