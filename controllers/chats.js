

module.exports = {
    index
}

function index(req, res) {
    console.log('chat index controller function hit')
    res.send('server is up and running')
}