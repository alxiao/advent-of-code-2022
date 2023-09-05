/*
--- Part Two ---
Now, you're ready to choose a directory to delete.

The total disk space available to the filesystem is 70000000. To run the update, you need unused space of at least 30000000. You need to find a directory you can delete that will free up enough space to run the update.

In the example above, the total size of the outermost directory (and thus the total amount of used space) is 48381165; this means that the size of the unused space must currently be 21618835, which isn't quite the 30000000 required by the update. Therefore, the update still requires a directory with total size of at least 8381165 to be deleted before it can run.

To achieve this, you have the following options:

Delete directory e, which would increase unused space by 584.
Delete directory a, which would increase unused space by 94853.
Delete directory d, which would increase unused space by 24933642.
Delete directory /, which would increase unused space by 48381165.
Directories e and a are both too small; deleting them would not free up enough space. However, directories d and / are both big enough! Between these, choose the smallest: d, increasing unused space by 24933642.

Find the smallest directory that, if deleted, would free up enough space on the filesystem to run the update. What is the total size of that directory?
*/

const https = require("node:https");
require("dotenv").config();

const INPUT_URL = "https://adventofcode.com/2022/day/7/input";
const options = {
  headers: {
    Cookie: process.env.COOKIE,
  },
};

const FILE_SIZE_LIMIT = 70000000;
const UPDATE_SPACE = 30000000;

const getDirSize = (input) => {
  let dirSize = 0;

  for (let i = 0; i < input.length; i++) {
    const line = input[i];

    if (!!line.match(/^dir [a-zA-Z]+/g)) {
      const commandToFind = `$ cd ${line.split(" ")[1]}`;
      const dirIdx = input.indexOf(commandToFind);
      // Recursively get the dir size
      const numToAdd = getDirSize(input.slice(dirIdx + 2));

      dirSize += numToAdd;
    } else if (!!line.match(/^\$ cd \.\./) || !!line.match(/^\$/)) {
      // End of current dir list, break and return dirSize
      break;
    } else if (!!line.match(/^\d+/)) {
      // Add file size
      const numToAdd = Number(line.match(/^\d+/)[0]);

      dirSize += numToAdd;
    }
  }

  return dirSize;
};

const processData = (data) => {
  const input = String(data).split("\n");
  input.pop();

  let sizeToFree = 0;
  let runningFileSizeToFree = FILE_SIZE_LIMIT;

  input.forEach((line, idx) => {
    if (!!line.match(/\$ cd \//g)) {
      // Root dir
      const dirSize = getDirSize(input.slice(idx + 2));

      const freeSpace = FILE_SIZE_LIMIT - dirSize;
      sizeToFree = UPDATE_SPACE - freeSpace;
      console.log({ dirSize, sizeToFree });
    } else if (!!line.match(/\$ cd [a-zA-Z]+/g)) {
      const dirSize = getDirSize(input.slice(idx + 2));

      // console.log({ line, dirSize });
      if (
        !!sizeToFree &&
        dirSize >= sizeToFree &&
        dirSize < runningFileSizeToFree
      ) {
        runningFileSizeToFree = dirSize;
      }
      // console.log("processData: ", { line, dirSize });
    }
  });

  console.log({ runningFileSizeToFree });
};

// processData(testInput);

https.get(INPUT_URL, options, (res) => {
  res.on("data", processData);
});
