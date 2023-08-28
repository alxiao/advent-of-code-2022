/*
--- Part Two ---
By the time you calculate the answer to the Elves' question, they've already realized that the Elf carrying the most Calories of food might eventually run out of snacks.

To avoid this unacceptable situation, the Elves would instead like to know the total Calories carried by the top three Elves carrying the most Calories. That way, even if one of those Elves runs out of snacks, they still have two backups.

In the example above, the top three Elves are the fourth Elf (with 24000 Calories), then the third Elf (with 11000 Calories), then the fifth Elf (with 10000 Calories). The sum of the Calories carried by these three elves is 45000.

Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?
*/

/*
SOLUTION:
1. Retrieve the list of calories (i.e. the puzzle input) from https://adventofcode.com/2022/day/1/input
2. Store list of calories as an array of arrays - 2D array, where each array element is the list calories for a single elf
3. Iterate through the array and find the sum of the array elements
4. Find the top 3 sums <-- Can be combined with #3 in one iteration of the array as a running sum
*/

const https = require('node:https');
require('dotenv').config();

const INPUT_URL = 'https://adventofcode.com/2022/day/1/input';

const options = {
  headers: {
    Cookie: process.env.COOKIE,
  },
};

https.get(INPUT_URL, options, (res) => {
  res.on('data', (d) => {
    // Split by the empty newline
    const input = String(d).split(/\n\s*\n/);

    let maxCalories = [0, 0, 0];

    input.forEach((elfCalories) => {
      // Split by newline, cast to Number, and get the sum
      const calorieSum = elfCalories
        .split('\n')
        .map(Number)
        .reduce((total, currentValue) => total + currentValue, 0);

      try {
        maxCalories.forEach((calNum, idx) => {
          if (calorieSum > calNum) {
            maxCalories[idx] = calorieSum;
            throw 'Break';
          }
        });
      } catch (e) {
        return;
      }
    });

    const sumOfMaxCalories = maxCalories.reduce(
      (total, currentValue) => total + currentValue,
      0
    );
    console.log({ maxCalories, sumOfMaxCalories });
  });
});
