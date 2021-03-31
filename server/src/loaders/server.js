const app = require('../loaders');
const { port } = require('../config/env');
const string = require('../utilities/strings');

// run the server locally
app.listen(port, () => console.log(`${string.server.listeningTo}` + `${port}`));
