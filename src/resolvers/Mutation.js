import uuid from "uuid";

const Mutation = {
    createUser(parent, args, {db}, info) {
        const emailTaken = db.users.some(user => user.email === args.data.email);
        if (emailTaken) throw new Error('Email taken');

        const user = {
            id: uuid(),
            ...args.data
        }
        db.users.push(user);
        return user;
    },
    updateUser(parent, args, {db}, info) {
        if (!args.id) return new Error(`User ID required`);
        let user = db.users.find(user => user.id === args.id);
        if (!user) return new Error(`User with id ${args.id} not found`);

        if (typeof args.data.email === 'string') {
            const emailTaken = db.users.some(user => user.email === args.data.email);
            if (emailTaken) return new Error(`Email ${args.data.email} already taken`);
            user.email = args.data.email;
        }

        if (typeof args.data.name === 'string') {
            user.name = args.data.name;
        }

        if (typeof args.data.age !== "undefined") {
            user.age = args.data.age;
        }
        return user;
    },
    deleteUser(parent, args, {db}, info) {
        if (!args.id) return new Error('Missing userID');
        const index = db.users.findIndex(user => user.id === args.id);
        if (index === -1) return new Error(`User with id ${args.id} not found`);
        const deletedUsers = db.users.splice(index, 1);

        db.posts = db.posts.filter(post => {
            const match = post.author === args.id;
            if (match) {
                db.comments = db.comments.filter(comment => comment.post !== post.id);
            }
            return !match;
        });
        db.comments = db.comments.filter(comment => comment.author !== args.id);
        return deletedUsers[0];
    },
    createPost(parent, args, {db, pubsub}, info) {
        const userExist = db.users.some(user => user.id === args.data.author);
        if (!userExist) return new Error('User not found');
        const post = {
            id: uuid(),
            ...args.data
        };
        db.posts.push(post);
        if (args.data.published) {
            pubsub.publish('post',
                {
                    post: {
                        mutation: 'CREATED',
                        data: post
                    }
                });
        }
        return post;
    },
    updatePost(parent, args, {db, pubsub}, info) {
        const {id, data} = args;
        if (!id) return new Error(`Missing field ID`);
        const post = db.posts.find(post => post.id === id);
        const originalPost = {...post};
        if (!post) return new Error(`Post with id ${id} not found`);

        if (typeof data.title === "string") {
            post.title = data.title;
        }
        if (typeof data.body === "string") {
            post.body = data.body;
        }
        if (typeof data.published === "boolean") {
            post.published = data.published;
            if(originalPost.published && !post.published){
                pubsub.publish('post', {
                    post: {
                        mutation: 'DELETED',
                        data: originalPost
                    }
                })
            }else if(!originalPost.published && post.published){
                pubsub.publish('post', {
                    post: {
                        mutation: 'CREATED',
                        data: post
                    }
                });
            }
        }else if(post.published){
            pubsub.publish('post', {
                post: {
                    mutation: 'UPDATED',
                    data: post
                }
            })
        }
        return post;
    },
    deletePost(parent, args, {db, pubsub}, info) {
        if (!args.id) return new Error('ID of post must be present');
        const index = db.posts.findIndex(post => post.id === args.id);
        if (index === -1) return new Error(`Post with id ${args.id} not found`);
        db.comments = db.comments.filter(comment => comment.post !== args.id);
        const [post] = db.posts.splice(index, 1);
        if(post.published){
            pubsub.publish('post', {
                post: {
                    mutation: 'DELETED',
                    data: post
                }
            })
        }
        return post;
    },
    createComment(parent, args, {db, pubsub}, info) {
        const userExist = db.users.some(user => user.id === args.data.author);
        const postExist = db.posts.some(post => post.id === args.data.post && post.published);
        if (!userExist || !postExist) return new Error('User or Post not found');
        const comment = {
            ...args.data,
            id: uuid()
        }
        db.comments.push(comment);
        pubsub.publish(`comment ${comment.post}`, {
            comment: {
                mutation: 'CREATED',
                data: comment
            }
        });
        return comment;
    },
    updateComment(parent, args, {db, pubsub}, info) {
        const {id, data} = args;
        const comment = db.comments.find(comment => comment.id === id);
        if (!comment) return new Error(`No Comment with id ${id}`);

        if (typeof data.text === "string") {
            comment.text = data.text;
        }
        pubsub.publish(`comment ${comment.post}`, {
            comment: {
                mutation: 'UPDATED',
                data: comment
            }
        });
        return comment;
    },
    deleteComment(parent, args, {db, pubsub}, info) {
        if (!args.id) return new Error(`Supply ID to be deleted`)
        const index = db.comments.findIndex(comment => comment.id === args.id);
        if (index === -1) return new Error(`Comment with id ${args.id} not found`);
        const [comment] = db.comments.splice(index, 1);
        pubsub.publish(`comment ${comment.post}`, {
            comment: {
                mutation: 'DELETED',
                data: comment
            }
        });
        return comment;
    },
};

export {Mutation as default};
