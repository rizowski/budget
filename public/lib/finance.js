module.exports = {
  budget(goal, remainder) {
    if (goal.objective.amount === 0 || remainder === 0) {
      return 0;
    }
    const { objective } = goal;
    const { maxPerPaycheck } = objective;

    const newRemainder = remainder - maxPerPaycheck;

    return newRemainder;
  },
};
