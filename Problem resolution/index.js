function calculateScore(numbers) {
  return numbers.reduce((total, num) => {
    if (num === 5) {
      return total + 5;
    } else if (num % 2 === 0) {
      return total + 1;
    } else {
      return total + 3;
    }
  }, 0);
}

module.exports = { calculateScore };
