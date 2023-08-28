/*
--- Part Two ---
As you finish identifying the misplaced items, the Elves come to you with another issue.

For safety, the Elves are divided into groups of three. Every Elf carries a badge that identifies their group. For efficiency, within each group of three Elves, the badge is the only item type carried by all three Elves. That is, if a group's badge is item type B, then all three Elves will have item type B somewhere in their rucksack, and at most two of the Elves will be carrying any other item type.

The problem is that someone forgot to put this year's updated authenticity sticker on the badges. All of the badges need to be pulled out of the rucksacks so the new authenticity stickers can be attached.

Additionally, nobody wrote down which item type corresponds to each group's badges. The only way to tell which item type is the right one is by finding the one item type that is common between all three Elves in each group.

Every set of three lines in your list corresponds to a single group, but each group can have a different badge item type. So, in the above example, the first group's rucksacks are the first three lines:

vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
And the second group's rucksacks are the next three lines:

wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
In the first group, the only item type that appears in all three rucksacks is lowercase r; this must be their badges. In the second group, their badge item type must be Z.

Priorities for these items must still be found to organize the sticker attachment efforts: here, they are 18 (r) for the first group and 52 (Z) for the second group. The sum of these is 70.

Find the item type that corresponds to the badges of each three-Elf group. What is the sum of the priorities of those item types?
*/

/*
SOLUTION:
1. Retrieve the list of rucksack items from https://adventofcode.com/2022/day/3/input
2. Store list of rucksacks as an array
3. For every three arrays, find the common types between the first two arrays and store them in an array called potentialBadges.
4. Find the common type between potentialBadges and the 3rd array.
5. Store list of badges in an array
7. Create dictionary of priority values for each item type using String.fromCharCode to convert ascii value to char
8. Add the priorities for all the badges
*/

const https = require('node:https');
require('dotenv').config();

const INPUT_URL = 'https://adventofcode.com/2022/day/3/input';
const options = {
  headers: {
    Cookie: process.env.COOKIE,
  },
};

const getPrioritySum = (badges) => {
  let runningPrioritySum = 0;

  badges.forEach((item) => {
    const asciiValue = item.charCodeAt(0);

    if (asciiValue >= 97) {
      // lowercase
      runningPrioritySum += asciiValue - 96;
    } else if (asciiValue <= 90) {
      // uppercase
      runningPrioritySum += asciiValue - 38;
    }
  });

  return runningPrioritySum;
};

const getCommonTypes = (firstRucksack, secondRucksack) => {
  let firstRucksackDict = {};
  let potentialBadges = {};

  firstRucksack.forEach((item) => {
    firstRucksackDict[item] = 1;
  });

  secondRucksack.forEach((item) => {
    if (firstRucksackDict[item] === 1) {
      potentialBadges[item] = 1;
    }
  });

  return Object.keys(potentialBadges);
};

https.get(INPUT_URL, options, (res) => {
  res.on('data', (d) => {
    // Split by newline
    const input = String(d).split('\n');
    input.pop(); // Remove last empty string array item

    let badges = [];

    for (let i = 0; i < input.length; i += 3) {
      const firstRucksack = input[i].split('');
      const secondRucksack = input[i + 1].split('');
      const thirdRucksack = input[i + 2].split('');

      const potentialBadges = getCommonTypes(firstRucksack, secondRucksack);
      const groupBadge = getCommonTypes(potentialBadges, thirdRucksack);

      if (groupBadge.length !== 1) {
        throw 'ERROR';
      }

      badges.push(groupBadge[0]);
    }

    const sum = getPrioritySum(badges);

    console.log({ sum });
  });
});
