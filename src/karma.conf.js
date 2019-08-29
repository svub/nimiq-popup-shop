module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],

    files: [
      '../tests/*.spec.js'
    ]
  })
}
