function log(content, cb) {
  console.log(content)
  cb()
}
module.exports = function(content, map, meta) {
  var callback = this.async()
  log(content, function(err, result, sourceMaps, meta) {
    if (err) {
      return callback(err)
    }
    callback(null, result, sourceMaps, meta)
  })
}

module.exports.pitch = function(remainingRequest, precedingRequest, data) {
  // do
}
