import { all, create, exp } from "mathjs";
import { GetDailyNumbers } from "./DailyNumbers";

const math = create(all);
const { start, continuing, target } = GetDailyNumbers();

export const allowedOperations = new Set([
    "+",
    "-",
    "*",
    "/",
    "!",
    "%",
    "^",
    "~",
    "&",
    "|",
]);
export const allowedFunctions = new Set([
    "floor",
    "ceil",
    "abs",

    "sqr",
    "sqrt",
    "cube",
    "cbrt",

    "log",

    "sign",

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

    "summ", //a special case here, is a custom function outside of customFunctions
]);

const customFunctions = {
    sqr: function (a) {
        return a * a;
    },
};
math.import(customFunctions);

function summ(args, math, scope) {
    const rangeNode = args[0];
    const exprNode = args[1];
    const range = rangeNode.compile().evaluate(scope);
    const arr = range.toArray ? range.toArray() : range;
    let total = 0;
    for (const k of arr) {
        total += exprNode.compile().evaluate({ ...scope, k });
    }
    return total;
}
summ.rawArgs = true;
math.import({ summ });

export const allowedNumConstants = new Set([
    0,
    10,
    Number(start),
    Number(continuing),
]);
export const allowedConstants = new Set(["pi", "e", "k", 0, 10]); // 10 does not get parsed as an allowed constant. it's here for the ui
// it get filters out via allowedNumConstants (never gets checked for invalid number/etc)

const allowedSymbols = allowedFunctions.union(allowedConstants);

function checkAllowed(expression) {
    let nodeTree;
    try {
        nodeTree = math.parse(expression);
    } catch (e) {
        throw new Error("Error in Math Expression!");
    }
    nodeTree.traverse((node) => {
        switch (node.type) {
            case "FunctionNode":
                if (!allowedFunctions.has(node.name)) {
                    throw new Error("'" + node.name + "' is not allowed!");
                }
                break;
            case "SymbolNode":
                if (!allowedSymbols.has(node.name)) {
                    throw new Error("'" + node.name + "' is not allowed!");
                }
                break;
            case "OperatorNode":
                if (!allowedOperations.has(node.op)) {
                    throw new Error("'" + node.op + "' is not allowed!");
                }
                break;
            case "ConstantNode":
                if (
                    typeof node.value == "number" &&
                    !allowedNumConstants.has(node.value)
                ) {
                    throw new Error(node.value + " is not allowed!");
                }
                break;
        }
    });
}

export function evaluate(expression) {
    checkAllowed(expression);
    try {
        const result = math.evaluate(expression);
        if (typeof result !== "number") {
            throw new Error("Invalid expression!");
        }
        return result.toString();
    } catch (e) {
        throw new Error("Error in Math Expression!");
    }
}

// will return an array: [0] is the output string, [1] is the score
export function ParseExpression(expression) {
    let output;
    let startingNumber = start;
    let continuingNumber = continuing;
    let targetNumber = target;

    // Check if its legit math
    const trimmedExpr = expression.replace(/\s/g, "");

    output = evaluate(expression).toString();

    /*
        Checks if it...
            a: Starts with the starting number (must be solely that number, not meaning leading digit)
            b: Only contains the continuing number afterwards
            c: Calculate score
    */
    const numbersFound = trimmedExpr.match(/\d+/g) || []; //trimmedExpr.match(/-?\d+/g) || [];
    if (numbersFound.length === 0) {
        throw new Error(
            "Does not contain the starting number " + startingNumber.toString(),
        );
    }
    if (numbersFound[0] != startingNumber) {
        throw new Error("Does not start with " + startingNumber.toString());
    }

    // check if output equals the target number
    if (output !== targetNumber.toString()) {
        throw new Error("Didn't reach target of " + targetNumber.toString());
    }

    /*
        SCORE SYSTEM |
        =============
        Good Things
        - usually rare for scores to be the same

        Problems
        - 'ceil' has a monopoly on functions 
            > all functions worth the same? so its based off the amount of tokens?
        - not enough creativity (and too many options for functions)
            > purge the functions list
            c: keep sin, cos, tan, but maybe the rest can go
            c: sqr and cube are pretty redundant edit: ACTUALLY I TAKE THAT BACK
        - too much use with pi and e
            > maybe remove pi and e?
            c: certain funcs like sin cos tan or log would have further use with it still
            c: may be less effective because forced ceil/floor

        > Maybe ignore parenthesis entirely?
        c: could discourage people from using funcs if parathensis are counted

        > Maybe like a preferred function?
        c: maybe some funcs are cheaper due to how useless it is?
        c: realistically, probably base it off of parameters
        c: if you think the game is getting too easy maybe we can expand the range to -1000, 1000
        c: do you think difficulty modes are a good idea?
    */
    let score = 0;
    const nodeTree = math.parse(expression);
    nodeTree.traverse((node) => {
        switch (node.type) {
            case "FunctionNode":
                score += 1;
                break;
            case "SymbolNode":
                if (allowedConstants.has(node.name)) {
                    // avoid double-counting functions
                    score += 1;
                }
                break;
            case "OperatorNode":
                score += 1;
                break;
            case "ConstantNode":
                score += 1;
                break;
        }
    });

    return [output, Math.round(5000 / score ** 0.5)];
}
