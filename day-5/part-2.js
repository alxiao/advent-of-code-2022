/*
--- Part Two ---
As you watch the crane operator expertly rearrange the crates, you notice the process isn't following your prediction.

Some mud was covering the writing on the side of the crane, and you quickly wipe it away. The crane isn't a CrateMover 9000 - it's a CrateMover 9001.

The CrateMover 9001 is notable for many new and exciting features: air conditioning, leather seats, an extra cup holder, and the ability to pick up and move multiple crates at once.

Again considering the example above, the crates begin in the same configuration:

    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 
Moving a single crate from stack 2 to stack 1 behaves the same as before:

[D]        
[N] [C]    
[Z] [M] [P]
 1   2   3 
However, the action of moving three crates from stack 1 to stack 3 means that those three moved crates stay in the same order, resulting in this new configuration:

        [D]
        [N]
    [C] [Z]
    [M] [P]
 1   2   3
Next, as both crates are moved from stack 2 to stack 1, they retain their order as well:

        [D]
        [N]
[C]     [Z]
[M]     [P]
 1   2   3
Finally, a single crate is still moved from stack 1 to stack 2, but now it's crate C that gets moved:

        [D]
        [N]
        [Z]
[M] [C] [P]
 1   2   3
In this example, the CrateMover 9001 has put the crates in a totally different order: MCD.

Before the rearrangement process finishes, update your simulation so that the Elves know where they should stand to be ready to unload the final supplies. After the rearrangement procedure completes, what crate ends up on top of each stack?
*/

/* 
SOLUTION:
Building off of Part 1's solution except we need to change the way to move items across stacks

*/

const https = require('node:https');
require('dotenv').config();

const INPUT_URL = 'https://adventofcode.com/2022/day/5/input';
const options = {
  headers: {
    Cookie: process.env.COOKIE,
  },
};

const getTopItems = (listOfStacks) => {
  return listOfStacks.reduce(
    (accumulativeValue, stack) => accumulativeValue + stack.slice(-1),
    ''
  );
};

const applyProcedures = (listOfStacks, procedures) => {
  const procedureArray = procedures.split('\n');
  procedureArray.pop(); // unnecessary last line is empty

  procedureArray.forEach((procedure) => {
    const numberMatch = procedure.match(/ \d+/g);
    const [numItems, startIdx, endIdx] = numberMatch;

    const startingStack = listOfStacks[startIdx - 1];
    const subArray = startingStack.splice(startingStack.length - numItems);
    const endingStack = listOfStacks[endIdx - 1];
    endingStack.push(...subArray);
  });

  return listOfStacks;
};

// Create an array of arrays, where each array represents a stack of letters
const getListOfStacks = (stackString) => {
  const stackRows = stackString.split('\n');
  const numOfStacks = (stackRows[0].length + 1) / 4; // Each stack column takes 4 char

  let listOfStacks = Array.from({ length: numOfStacks }, () => []);

  for (let i = stackRows.length - 2; i >= 0; i--) {
    const currentStackRow = stackRows[i];
    const list = currentStackRow.match(/.{1,4}/g); // Split row into groups of 4 chars

    list.forEach((item, idx) => {
      const letter = item.match(/[a-zA-Z]{1}/g)?.[0];

      if (!!letter) {
        listOfStacks[idx].push(letter);
      }
    });
  }

  return listOfStacks;
};

const processData = (data) => {
  const input = String(data).split('\n\n');

  const listOfStacks = getListOfStacks(input[0]);
  const endingListOfStacks = applyProcedures(listOfStacks, input[1]);
  const topItems = getTopItems(endingListOfStacks);

  console.log({ topItems });
};

https.get(INPUT_URL, options, (res) => {
  res.on('data', processData);
});
