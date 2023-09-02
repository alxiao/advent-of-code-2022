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
const { processData } = require('./part-1');
require('dotenv').config();

const INPUT_URL = 'https://adventofcode.com/2022/day/6/input';
const options = {
  headers: {
    Cookie: process.env.COOKIE,
  },
};

https.get(INPUT_URL, options, (res) => {
  res.on('data', (data) => processData(data, 14));
});
