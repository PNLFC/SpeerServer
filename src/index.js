const api = require('./api')
const port = process.env.PORT || 5000

api.listen(port, () => {
    console.log('Server is up on port ' + port)
})