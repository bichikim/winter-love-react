const toBeArray = (data) => {
  return Array.isArray(data) ? data : [data]
}

const margeArray = (tests, source) => {
  const _tests = toBeArray(tests)
  const _source = toBeArray(source)

  return [..._tests, ..._source]
}

module.exports = {
  toBeArray,
  margeArray,
}
