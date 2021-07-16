const users = [
    {id: "sahayford", name: "Stanley Hayford", email: "hayfordstanley@gmail.com"},
    {id: "asad", name: "Antoinette Dewortor", email: "asad@gmail.com"},
    {id: "florence", name: "Florence Kyei-Baffour", email: "phlorince1999@gmail.com"}
]

const posts = [
    {
        id: "1",
        title: "Lorem Ipsum",
        body: "Lorem Ipsum dolor ",
        published: true,
        author: "asad"
    },
    {
        id: "2",
        title: "Nodemon",
        body: "Restarting with nodemon",
        published: true,
        author: "florence"
    },
    {
        id: "3",
        title: "Jesuits",
        body: "Ignatius of loyola is the founder of the Jesuit order",
        published: true,
        author: "sahayford"
    }
]

const comments = [
    {id: "1", text: "Sieg Heil", author: "sahayford", post: '1'},
    {id: "2", text: "Heil Fuhrer", author: "asad", post: '1'},
    {id: "3", text: "Hitler fahren uber alle strassen", author: "florence", post: '2'},
    {id: "4", text: "The greatest story never told - Adolf Hitler", author: "sahayford", post: '3'}
]

const db = {
    users,
    posts,
    comments
}

export {db as default};
