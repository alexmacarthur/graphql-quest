interface QueryResponse {
  data?: object;
  errors?: any[];
}

interface QuestConfig {
  endpoint: string;
  headers: object;
  method: string;
}

function Quest(config: QuestConfig) {
  const { endpoint, method = "POST", headers = {} } = config;

  const send = async (
    query: string,
    variables: object = {}
  ): Promise<QueryResponse> => {
    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          ...{ "Content-Type": "application/json" },
          ...headers,
        },
        body: JSON.stringify({ query, variables }),
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
  };

  return { send };
}

export default Quest;
