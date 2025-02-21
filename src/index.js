require(`module-alias/register`)

const config = require('@config')

const bodyParser = require('body-parser');

const createServer = require('./server');

const app = require('./app');

async function start() {
	const server = await createServer(app);

  server.get('/', (req, res) => {
    res.send('Welcome to Holafly\'s Technical test!');
  });

	// Start the GraphQL server
  const port = config.port;
	server.listen(port , () => {
		// eslint-disable-next-line no-console
		console.log(`Server is running on port: ${port}`);
	});

}

start();