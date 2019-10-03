const server = require('./server.js')

const helmet = require('helmet')

server.listen(5000, () => {
  console.log('\n* Server Running on http://localhost:5000 *\n')
})
