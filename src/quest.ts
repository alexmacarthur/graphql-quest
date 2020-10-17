interface QueryPayload {
  data: object;
  errors: any[];
  isSuccessful: boolean;
}

interface QuestConfig {
  endpoint: string;
}

interface QueryConfig {
  method: string;
  headers: object;
}

function Quest(config: QuestConfig) {
  const { endpoint } = config;

  const send = async (
    query: string,
    queryConfig: QueryConfig = { headers: {}, method: "" }
  ): Promise<QueryPayload> => {
    const { method, headers } = queryConfig;
    const returnPayload: QueryPayload = {
      data: {},
      errors: [],
      isSuccessful: false,
    };

    try {
      const response = await fetch(endpoint, {
        method: method || "POST",
        headers: {
          ...{ "Content-Type": "application/json" },
          ...headers,
        },
        body: JSON.stringify({ query }),
      });

      Object.assign(returnPayload, await response.json());

      returnPayload.isSuccessful = response.ok;
    } catch (e) {
      returnPayload.errors.push(e);
      returnPayload.isSuccessful = false;
    }

    return returnPayload;
  };

  return { send };
}

export default Quest;
