const safeStringify = data => JSON.stringify(data, (key, val) => (val !== null ? val : undefined));

module.exports = {
  safeStringify,
};
