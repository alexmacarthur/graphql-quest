import { quest, QuestClient } from "./index";
import { vi, describe, it, expect, Mock } from "vitest";

const query = `
  {
    comments {
      content
    }
  }
`;

const getFetchSpy = () => {
  return vi.spyOn(global, "fetch").mockImplementation(() => {
    return Promise.resolve({
      json: () => Promise.resolve({ data: {}, errors: [] }),
    }) as any;
  }) as Mock;
};

describe("quest", () => {
  it("makes request with correct url, headers, and body", async () => {
    const fetch = getFetchSpy();
    await quest("https://some-domain.com/graphql", query);
    const fetchArgs = fetch.mock.calls[0];
    const fetchOptions = fetchArgs[1];
    const parsedBody = JSON.parse(fetchOptions.body);

    expect(fetchOptions.method).toEqual("POST");
    expect(fetchOptions.headers["Content-Type"]).toEqual("application/json");
    expect(parsedBody).toHaveProperty("query");
    expect(parsedBody).toHaveProperty("variables");
  });

  it("passes variables correctly", async () => {
    const fetch = getFetchSpy();
    const queryWithVariables = `
      query Comments($domain: String!) {
        comments(domain: $domain) {
          content
        }
      }
  `;

    const variables = {
      domain: "macarthur.me",
    };

    await quest(
      "https://some-domain.com/graphql",
      queryWithVariables,
      variables
    );
    const fetchArgs = fetch.mock.calls[0];
    const fetchOptions = fetchArgs[1];
    const parsedBody = JSON.parse(fetchOptions.body);

    expect(parsedBody.variables).toEqual(
      JSON.stringify({ domain: "macarthur.me" })
    );
  });

  it("makes request with correct url when GET is specified", async () => {
    const fetch = getFetchSpy();
    await quest(
      "https://some-domain.com/graphql",
      query,
      {},
      { method: "get" }
    );
    const fetchArgs = fetch.mock.calls[0];
    const fetchOptions = fetchArgs[1];

    expect(fetchArgs[0]).toEqual(
      "https://some-domain.com/graphql?query=%0A++%7B%0A++++comments+%7B%0A++++++content%0A++++%7D%0A++%7D%0A&variables=%7B%7D"
    );
    expect(fetchOptions.method).toEqual("GET");
  });

  it("existing url parameters are preserved", async () => {
    const fetch = getFetchSpy();
    await quest(
      "https://some-domain.com/graphql?someVar=true",
      query,
      {},
      { method: "get" }
    );
    const fetchArgs = fetch.mock.calls[0];

    expect(fetchArgs[0]).toMatch(/\?someVar=true\&/);
  });
});

describe("QuestClient", () => {
  it("makes request based on provided configuration", async () => {
    const fetch = getFetchSpy();
    const client = QuestClient({
      endpoint: "http://some-domain.com/graphql",
      headers: {
        "x-api-key": "ABC-123",
      },
    });

    await client.send(query);

    const fetchArgs = fetch.mock.calls[0];
    const fetchOptions = fetchArgs[1];
    const parsedBody = JSON.parse(fetchOptions.body);

    expect(fetchOptions.method).toEqual("POST");
    expect(fetchOptions.headers["Content-Type"]).toEqual("application/json");
    expect(fetchOptions.headers["x-api-key"]).toEqual("ABC-123");
    expect(parsedBody).toHaveProperty("query");
    expect(parsedBody).toHaveProperty("variables");
  });
});
