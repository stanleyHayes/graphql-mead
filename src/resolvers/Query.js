import db from "../db";

const Query =  {
    users(parent, {query}, {db}, info) {
        if (!query) return users;
        return db.users.filter(user => user.name.toLocaleLowerCase().includes(query.toLowerCase()));
    },
    me() {
        return {
            id: "setepenre",
            name: "Userma'atre Setepenre",
            email: "hayfordstanley@gmail.com",
            age: 27
        }
    },
    posts(parent, {query}, {db}, info) {
        if (!query) return db.posts;
        return db.posts.filter(post => {
            return post.title.toLowerCase().includes(query.toLowerCase()) || post.body.toLowerCase().includes(query.toLowerCase())
        });
    },
    post() {
        return {
            id: "truthwill",
            title: 'Adolf Hitler - The Greatest Story Never Told',
            body: "Directed by Dennis Wise. With Eva Braun, Winston Churchill, Charles de Gaulle, Adolf Galland. Adolf Hitler, born in Braunau, one man who will change the ...",
            published: true
        }
    },
    comments() {
        return db.comments
    }
}

export {Query as default};
