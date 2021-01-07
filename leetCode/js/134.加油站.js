var canCompleteCircuit = function (gas, cost) {
  let total = 0;
  let curr = 0;
  let start = 0;
  for (let i = 0; i < gas.length; i++) {
    curr += gas[i] - cost[i];
    if (curr < 0) {
      start = i + 1;
      curr = 0;
    }
    total += gas[i] - cost[i]
  }
  return total >= 0 ? start : -1;
};

const gas = [1, 2, 3, 4, 5];
const cost = [3, 4, 5, 1, 2];
canCompleteCircuit(gas, cost);