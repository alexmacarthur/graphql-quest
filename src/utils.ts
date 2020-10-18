import { FetchOptions, SomeObject, QueryResponse } from "./interfaces";

export function isEmpty(obj: SomeObject): boolean {
  return Object.keys(obj).length === 0;
}

export function attachParamsToUrl(url: string, params: SomeObject): string {
  const urlObj = new URL(url);

  for (const key in params) {
    if (isEmpty(params[key])) continue;

    urlObj.searchParams.append(key, params[key]);
  }

  return urlObj.toString();
}

export async function makeRequest({
  endpoint,
  fetchOptions,
  query,
  variables,
}: {
  endpoint: string;
  fetchOptions: FetchOptions;
  query: string;
  variables: SomeObject;
}): Promise<QueryResponse> {
  const payload = { query, variables };
  const { method = "POST", headers = {} } = fetchOptions;
  const isGet = method === "GET";
  const preparedEndpoint = isGet
    ? attachParamsToUrl(endpoint, payload)
    : endpoint;

  try {
    const response = await fetch(preparedEndpoint, {
      method,
      headers: {
        ...{
          "Content-Type": `application/${
            isGet ? "x-www-form-urlencoded" : "json"
          }`,
        },
        ...headers,
      },
      body: isGet ? null : JSON.stringify(payload),
    });

    const { data, errors } = await response.json();
    const returnPayload: QueryResponse = { data };

    if (errors) {
      returnPayload.errors = errors;
    }

    return returnPayload;
  } catch (e) {
    return { errors: [e] };
  }
}
