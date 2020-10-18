# Quest

A minimal library for making GraphQL requests in JavaScript, coming in at < 900 bytes.

## Simplest Usage

Quest provides a simple function for sending of quick queries.

```js
import { quest } from "graphql-quest";

const query = `
  {
    comments(domain: "macarthur.me") {
      createdAt
      name
      content
    }
  }
`;

quest("http://some-domain.com/graphql", query).then((result) => {
  console.log(result);
});
```

You can also provide a variables object to be used with a respective query or mutation.

```js
import { quest } from "graphql-quest";

const query = `
  query Comments($domain: String!) {
    comments(domain: $domain) {
      createdAt
      name
      content
    }
  }
`;

const variables = {
  domain: "macarthur.me",
};

quest("http://some-domain.com/graphql", query, variables).then((result) => {
  console.log(result);
});
```

## More Complicated Usage

If you're going to be making repeated requests to the same server, you can preserve your endpoint, headers, etc. by creating a `QuestClient` instance.

```js
import { QuestClient } from "graphql-quest";

const client = QuestClient({
  endpoint: "http://some-domain.com/graphql",
  headers: {
    "x-api-key": "ABC-123",
  },
});

const query = `
  query Comments($domain: String!) {
    comments(domain: $domain) {
      createdAt
      name
      content
    }
  }
`;

const variables = {
  domain: "macarthur.me",
};

client.send(query, variables).then((result) => {
  console.log(result);
});
```

## Returned Payload

Every request (even those that throw exceptions) will return an object containing `data`, `errors`, or both. This pattern is generally intended to stay inline with the [GraphQL specification](https://graphql.org/learn/serving-over-http/#response), but doesn't require that you `.catch()` any errors on your own. Instead, exceptions that are thrown are simply represented in the `errors` array.

```ts
{
  data?: object;
  errors?: any[];
}
```

So, checking the success of the request can be basically performed by checking if the `errors` property exists on the return payload:

```js
import { quest } from "grahpql-quest";

(async () => {
  const query = `your query`;
  const variables = { your: "variables" };

  const result = await quest(
    "http://some-domain.com/graphql",
    query,
    variables
  );

  if (result.errors) {
    console.log("Something went wrong!");
  }
})();
```

## POST vs. GET

By default, requests are sent via `POST`, and the query & variables are sent along with the request body. If you'd like to send them via `GET`, set the `method` parameter accordingly. Instead, the query and variables will be parsed and attached as query string parameters to the endpoint, preserving any parameters that might already be attached.

```js
import { quest, QuestClient } from "graphql-quest";

const client = QuestClient({
  endpoint: "http://some-domain.com/graphql",
  method: "GET",
  headers: {
    "x-api-key": "ABC-123",
  },
});

// or...

const result = await quest("http://some-domain.com/graphql", query, variables, {
  method: "GET",
});
```

## Usage in Node

You'll need to polyfill the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) before using this library in Node. I tend to use [isomorphic-fetch](https://www.npmjs.com/package/isomorphic-fetch), but it's up to you.

```js
require("isomorphic-fetch");
const { quest } = require("graphql-quest");

// The rest of your code...
```

## Usage w/o a Bundler

If not using the ES module, you can access `quest` or `QuestClient` on the global `Quest` object after loading the source in the browser.

```html
<script src="./dist/quest.js"></script>
<script>
  const { quest, QuestClient } = window.Quest;

  // ... the rest of your code.
</script>
```

## Options

```ts
quest(
  endpoint: string,
  query: string,
  variables?: object,
  fetchOptions?: object
);
```

| Option       | Description                                                                                                                 |
| ------------ | --------------------------------------------------------------------------------------------------------------------------- |
| endpoint     | the endpoint that'll be hit for the request                                                                                 |
| query        | the query or mutation you're firing                                                                                         |
| variables    | variables to be supplied to your query or mutation                                                                          |
| fetchOptions | additional options to be passed into the `fetch` implementation under the hood (currently only supports headers and method) |

```ts
QuestClient({
  endpoint,
  method,
  headers,
} : {
  endpoint: string,
  method?: string,
  headers?: object
})
```

| Option   | Description                                         |
| -------- | --------------------------------------------------- |
| endpoint | the endpoint that'll be hit for the request         |
| method   | HTTP method for sending request (default is `POST`) |
| headers  | headers to include in request                       |
