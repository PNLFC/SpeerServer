const api = require('./api')
const port = 5000

api.listen(port, () => {
    console.log('Server is up on port ' + port)
})