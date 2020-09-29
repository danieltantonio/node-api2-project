const express = require('express');
const server = express();
const port = 5000;

const postsRouter = require('./routers/postsRouter');

server.use(express.json());

server.use('/api/posts', postsRouter);

server.get('/', (req,res) => {
    res.status(200).json({ message: 'Welcome to my api2-project!' });
})

server.listen(port, () => console.log(`Server listening on port: ${port}...`));