const musicRoute = require('./music.router.js')

function router(app) {
    app.use('/', musicRoute)
}

module.exports = router