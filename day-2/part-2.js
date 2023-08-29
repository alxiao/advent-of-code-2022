/*
--- Part Two ---
The Elf finishes helping with the tent and sneaks back over to you. "Anyway, the second column says how the round needs to end: X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win. Good luck!"

The total score is still calculated in the same way, but now you need to figure out what shape to choose so the round ends as indicated. The example above now goes like this:

In the first round, your opponent will choose Rock (A), and you need the round to end in a draw (Y), so you also choose Rock. This gives you a score of 1 + 3 = 4.
In the second round, your opponent will choose Paper (B), and you choose Rock so you lose (X) with a score of 1 + 0 = 1.
In the third round, you will defeat your opponent's Scissors with Rock for a score of 1 + 6 = 7.
Now that you're correctly decrypting the ultra top secret strategy guide, you would get a total score of 12.

Following the Elf's instructions for the second column, what would your total score be if everything goes exactly according to your strategy guide?
*/

/*
SOLUTION:
1. Retrieve the list of rounds from https://adventofcode.com/2022/day/2/input
2. Store list of rounds as an array
3. Iterate through the array and collect the following as running sums:
  - The points achieved from the element played (Rock= 1 pt, Paper = 2 pts, Scissors = 3 pts)
    - Now we need to figure out what elements was played
  - The points achieved from whether it's a loss (X) (0 pts), a tie (Y) (3 pts), or a win (Z) (6 pts)
5. Add the two sums together to get the total score
*/

const https = require('node:https');
require('dotenv').config();

const INPUT_URL = 'https://adventofcode.com/2022/day/2/input';

const options = {
  headers: {
    Cookie: process.env.COOKIE,
  },
};

const OUTCOME_POINTS_MAP = {
  X: 0,
  Y: 3,
  Z: 6,
};

const LOSE_MAP = {
  A: 3, // Opponent plays rock, scissors (3 pts) will lose
  B: 1, // Opponent plays paper, rock (1 pt) will lose
  C: 2, // Opponent plays scissors, paper (2 pts) will lose
};

const DRAW_MAP = {
  A: 1,
  B: 2,
  C: 3,
};

const WIN_MAP = {
  A: 2,
  B: 3,
  C: 1,
};

const getElementPlayedScore = (round) => {
  const opponent = round[0];
  const outcome = round[1];

  switch (outcome) {
    case 'X': // lose
      return LOSE_MAP[opponent];
    case 'Y': // draw
      return DRAW_MAP[opponent];
    case 'Z': // win
      return WIN_MAP[opponent];
  }
};

https.get(INPUT_URL, options, (res) => {
  res.on('data', (d) => {
    // Split by newline
    const input = String(d).split('\n');

    input.pop(); // Remove last empty string array item

    let runningPlayedElementSum = 0;
    let runningOutcomeSum = 0;

    input.forEach((round) => {
      const elements = round.split(' ');
      const outcome = elements[1];

      runningOutcomeSum += OUTCOME_POINTS_MAP[outcome];
      runningPlayedElementSum += getElementPlayedScore(elements);
    });

    console.log({ totalScore: runningPlayedElementSum + runningOutcomeSum });
  });
});
