import http from 'http';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import config from 'config';
import cors from 'cors';
import connectDB from './utils/connectDB.js';
import app from './app.js';
import getAuthUser from './middleware/authUser.js';

const httpServer = http.createServer(app);

const corsOptions = {
    origin: ['https://studio.apollographql.com', 'http://localhost:8000'],
    credentials: true
};

app.use(cors(corsOptions));

(async function() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        context: async ({ req, res }) => ({ req, res, getAuthUser }),
    });

    // Connect DB
    await connectDB();

    // Start Apollo server
    await server.start();

    server.applyMiddleware({ app, cors:  corsOptions});

    const port = 8000;

    await new Promise((resolve) => httpServer.listen(port, '0.0.0.0', resolve));

    console.log(
        `🔥Server started at http://localhost:${port}${server.graphqlPath}`
    )
})();