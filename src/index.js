import {GraphQLServer, PubSub} from 'graphql-yoga';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Comment from './resolvers/Comment';
import User from './resolvers/User';
import Post from './resolvers/Post';
import Subscription from './resolvers/Subscription';

import db from './db';

const pubsub = new PubSub()

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        User,
        Query,
        Post,
        Mutation,
        Comment,
        Subscription
    },
    context: {
        db,
        pubsub
    }
});

server.start(() => {
    console.log('The server is up');
});
