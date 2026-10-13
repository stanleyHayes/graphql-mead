# graphql-mead

graphql mead is an application containing JavaScript. The repository layout and entry points below describe the checked-in implementation.

## Repository layout

- `src/` — 9 tracked file(s); source examples: `src/db.js`, `src/index.js`.

## Local setup

Run each package setup block from the repository root. For workspace repositories, install dependencies at the root before running application-specific scripts.

Clone this repository and enter its directory:

```sh
git clone https://github.com/stanleyHayes/graphql-mead.git
cd graphql-mead
```

### Node package: `package.json`

Use Node.js and npm.

```sh
npm install
```

- `npm run start` — runs the declared `start` script (`nodemon src/index.js --ext js,graphql --exec babel-node`).
- The package test script is a placeholder and exits with an error; it does not run an automated test suite.

## Source entry points

- [src/db.js](src/db.js)
- [src/index.js](src/index.js)
- [src/resolvers/Comment.js](src/resolvers/Comment.js)
- [src/resolvers/Mutation.js](src/resolvers/Mutation.js)
- [src/resolvers/Post.js](src/resolvers/Post.js)
- [src/resolvers/Query.js](src/resolvers/Query.js)
- [src/resolvers/Subscription.js](src/resolvers/Subscription.js)
- [src/resolvers/User.js](src/resolvers/User.js)

## Development notes

Commands above come from the tracked manifests and source layout. External services and runtime configuration may be required. Documentation updates do not establish that the application is deployed or that its tests pass.
