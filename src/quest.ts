import {
  FetchOptions,
  QueryResponse,
  QuestConfig,
  SomeObject,
} from "./interfaces";

import { makeRequest } from "./utils";

export async function quest(
  endpoint: string,
  query: string,
  variables: SomeObject = {},
  fetchOptions: FetchOptions = {}
) {
  return await makeRequest({
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
    return await makeRequest({
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
