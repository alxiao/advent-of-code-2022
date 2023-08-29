/*
--- Part Two ---
It seems like there is still quite a bit of duplicate work planned. Instead, the Elves would like to know the number of pairs that overlap at all.

In the above example, the first two pairs (2-4,6-8 and 2-3,4-5) don't overlap, while the remaining four pairs (5-7,7-9, 2-8,3-7, 6-6,4-6, and 2-6,4-8) do overlap:

5-7,7-9 overlaps in a single section, 7.
2-8,3-7 overlaps all of the sections 3 through 7.
6-6,4-6 overlaps in a single section, 6.
2-6,4-8 overlaps in sections 4, 5, and 6.
So, in this example, the number of overlapping assignment pairs is 4.

In how many assignment pairs do the ranges overlap?
*/

/*
SOLUTION:
1. Retrieve the list of pairs from https://adventofcode.com/2022/day/4/input
2. Split the input by newline to create an array of strings
3. Parse each string to get ranges
4. Check if the ranges overlap
5. If the lower number of a range (A) is > the higher number of the other range (B) then they do NOT overlap. Must check the other way as well.
6. Keep a running counter of the number of assignments that overlap
*/

const https = require('node:https');
require('dotenv').config();

const INPUT_URL = 'https://adventofcode.com/2022/day/4/input';
const options = {
  headers: {
    Cookie: process.env.COOKIE,
  },
};

const getRangeNumbers = (line) => {
  const ranges = line.split(',');
  const rangeA = ranges[0].split('-').map(Number);
  const rangeB = ranges[1].split('-').map(Number);

  return {
    lowerA: rangeA[0],
    higherA: rangeA[1],
    lowerB: rangeB[0],
    higherB: rangeB[1],
  };
};

const getIsOverlapping = (lowerA, higherA, lowerB, higherB) => {
  if (lowerA > higherB) return false;
  if (lowerB > higherA) return false;

  return true;
};

const processData = (data) => {
  const input = String(data).split('\n');
  input.pop(); // Remove last empty string array item

  let counter = 0;

  input.forEach((line) => {
    const { lowerA, higherA, lowerB, higherB } = getRangeNumbers(line);
    const isOverlapping = getIsOverlapping(lowerA, higherA, lowerB, higherB);
    if (isOverlapping) counter += 1;
  });

  console.log({ counter });
};

https.get(INPUT_URL, options, (res) => {
  res.on('data', processData);
});
