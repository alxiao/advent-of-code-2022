/*
--- Part Two ---
Your device's communication system is correctly detecting packets, but still isn't working. It looks like it also needs to look for messages.

A start-of-message marker is just like a start-of-packet marker, except it consists of 14 distinct characters rather than 4.

Here are the first positions of start-of-message markers for all of the above examples:

mjqjpqmgbljsphdztnvjfqwrcgsmlb: first marker after character 19
bvwbjplbgvbhsrlpgdmjqwftvncz: first marker after character 23
nppdvjthqldpwncqszvftbrmjlhg: first marker after character 23
nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg: first marker after character 29
zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw: first marker after character 26
How many characters need to be processed before the first start-of-message marker is detected?
*/

/*
SOLUTION:
1. Build off of solution from part 1
2. Change length check to 14 instead of 4
*/

const https = require('node:https');
require('dotenv').config();

const INPUT_URL = 'https://adventofcode.com/2022/day/6/input';
const options = {
  headers: {
    Cookie: process.env.COOKIE,
  },
};

const MARKER_LENGTH = 14;

const processData = (data) => {
  let numChar = 0;
  let potentialMarker = [];

  for (const b of data) {
    const char = b.toString();

    if (potentialMarker.length === MARKER_LENGTH) break;

    numChar += 1;
    const existingCharIdx = potentialMarker.indexOf(char);
    if (existingCharIdx !== -1) {
      potentialMarker = potentialMarker.splice(existingCharIdx + 1);
    }

    potentialMarker.push(char);
  }

  if (potentialMarker.length === MARKER_LENGTH) {
    console.log({ numChar });
  }
};

https.get(INPUT_URL, options, (res) => {
  res.on('data', processData);
});
