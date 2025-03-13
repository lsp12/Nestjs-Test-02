# Score Calculator

## Description

This project contains a function to calculate a total score based on an array of integers. The scoring rules are:

1. Add **1 point** for every even number in the array (including 0).
2. Add **3 points** for every odd number, except for the number **5**.
3. Add **5 points** every time the number **5** appears in the array.

## Installation

To use this project, ensure you have [Node.js](https://nodejs.org/) installed.

Clone the repository and install dependencies:

```sh
npm install
```

## Usage

To use the function, import and call it with an array of integers:

```js
const calculateScore = require("./index");
console.log(calculateScore([1, 2, 3, 4, 5])); // Output: 13
```

## Running Tests

This project includes unit tests using Jest. To run the tests, use:

```sh
npm test
```

## Examples

### Example 1:

**Input:** `[1, 2, 3, 4, 5]`
**Output:** `13`

### Example 2:

**Input:** `[17, 19, 21]`
**Output:** `9`

### Example 3:

**Input:** `[5, 5, 5]`
**Output:** `15`

## License

This project is licensed under the MIT License.
