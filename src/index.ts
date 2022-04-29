import { FetchOptions, QueryResponse, QuestConfig, SomeObject } from "./types";

import { makeRequest } from "./utils";

export async function quest(
  endpoint: string,
  query: string,
  variables: SomeObject = {},
  fetchOptions: FetchOptions = {}
): Promise<QueryResponse> {
  return makeRequest({
    endpoint,
    query,
    variables,
    fetchOptions,
  });
}

export function QuestClient({ endpoint, method, headers }: QuestConfig) {
  const send = async (
    query: string,
    variables: SomeObject = {}
  ): Promise<QueryResponse> => {
    return makeRequest({
      endpoint,
      query,
      variables,
      fetchOptions: {
        method,
        headers,
      },
    });
  };

  return { send };
}
