const Subscription = {
    comment: {
        subscribe(parent, args, {pubsub, db}, info) {
            const {postID} = args;
            const post = db.posts.find(post => post.id === postID && post.published);
            if (!post) return new Error(`Post with id ${postID} not found`);

            return pubsub.asyncIterator(`comment ${postID}`);
        }
    },
    post: {
        subscribe(parent, args, {pubsub}, info) {
            return pubsub.asyncIterator('post');
        }
    }
};

export {Subscription as default};
