/*
--- Day 5: Supply Stacks ---
The expedition can depart as soon as the final supplies have been unloaded from the ships. Supplies are stored in stacks of marked crates, but because the needed supplies are buried under many other crates, the crates need to be rearranged.

The ship has a giant cargo crane capable of moving crates between stacks. To ensure none of the crates get crushed or fall over, the crane operator will rearrange them in a series of carefully-planned steps. After the crates are rearranged, the desired crates will be at the top of each stack.

The Elves don't want to interrupt the crane operator during this delicate procedure, but they forgot to ask her which crate will end up where, and they want to be ready to unload them as soon as possible so they can embark.

They do, however, have a drawing of the starting stacks of crates and the rearrangement procedure (your puzzle input). For example:

    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
In this example, there are three stacks of crates. Stack 1 contains two crates: crate Z is on the bottom, and crate N is on top. Stack 2 contains three crates; from bottom to top, they are crates M, C, and D. Finally, stack 3 contains a single crate, P.

Then, the rearrangement procedure is given. In each step of the procedure, a quantity of crates is moved from one stack to a different stack. In the first step of the above rearrangement procedure, one crate is moved from stack 2 to stack 1, resulting in this configuration:

[D]        
[N] [C]    
[Z] [M] [P]
 1   2   3 
In the second step, three crates are moved from stack 1 to stack 3. Crates are moved one at a time, so the first crate to be moved (D) ends up below the second and third crates:

        [Z]
        [N]
    [C] [D]
    [M] [P]
 1   2   3
Then, both crates are moved from stack 2 to stack 1. Again, because crates are moved one at a time, crate C ends up below crate M:

        [Z]
        [N]
[M]     [D]
[C]     [P]
 1   2   3
Finally, one crate is moved from stack 1 to stack 2:

        [Z]
        [N]
        [D]
[C] [M] [P]
 1   2   3
The Elves just need to know which crate will end up on top of each stack; in this example, the top crates are C in stack 1, M in stack 2, and Z in stack 3, so you should combine these together and give the Elves the message CMZ.

After the rearrangement procedure completes, what crate ends up on top of each stack?
*/

/*
SOLUTION:
1. Retrieve the puzzle input from https://adventofcode.com/2022/day/5/input
2. Split on newline to get an array of size 2 called inputArray. First element, inputArray[0], will be the starting crates, second element, inputArray[1], is the procedures.
3. Split the starting crates string by newline and store in an array called startingCrateStrings.
4. The number of stacks is startingCrateStrings[0].length / 4. Each stack has a width of 4 char
5. Loop through startingCrateStrings in reverse, and then parse each string to push a crate letter on top of the appropriate arrays
*/

const https = require('node:https');
require('dotenv').config();

const INPUT_URL = 'https://adventofcode.com/2022/day/4/input';
const options = {
  headers: {
    Cookie: process.env.COOKIE,
  },
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

  console.log({ listOfStacks });

  return listOfStacks;
};

const processData = (data) => {
  // const input = String(data).split('\n');
  const input = data.split('\n\n');
  // input.pop(); // Remove last empty string array item

  const listOfStacks = getListOfStacks(input[0]);
};

const input = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

processData(input);

// https.get(INPUT_URL, options, (res) => {
//   res.on('data', processData);
// });
