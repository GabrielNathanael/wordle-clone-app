export function evaluateGuess(guess, answer) {
    const result = Array(5).fill("absent");
    const answerChars = answer.split("");

    // PASS 1 — correct (green)
    for (let i = 0; i < 5; i++) {
        if (guess[i] === answer[i]) {
            result[i] = "correct";
            answerChars[i] = null; // consume
        }
    }

    // PASS 2 — present (yellow)
    for (let i = 0; i < 5; i++) {
        if (result[i] === "correct") continue;

        const index = answerChars.indexOf(guess[i]);
        if (index !== -1) {
            result[i] = "present";
            answerChars[index] = null; // consume
        }
    }

    return result;
}
