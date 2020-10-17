# Quest

A minimal library for making GraphQL requests in JavaScript.

## Usage in Node

You'll need to polyfill the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) before using this library in Node. I tend to use [isomorphic-fetch](https://www.npmjs.com/package/isomorphic-fetch), but it's up to you.

```js
require("isomorphic-fetch");
const Quest = require("graphql-quest");

const q = Quest({
  endpoint: "http://localhost:4000/graphql",
});

q.send(
  `
  {
    comments(domain: "macarthur.me") {
        createdAt
        content
        id
    }
  }
`
).then((result) => {
  // do something
});
```
