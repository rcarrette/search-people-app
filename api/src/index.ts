import server from './server'

const port = process.env.PORT || 3000

server.listen(port, (err) => {
    return console.log(err ?
        'server failed to start: ${err}' :
        'server running on port ${port}')
})