export interface QueryResponse {
  data?: object;
  errors?: any[];
}

export interface FetchOptions {
  headers?: object;
  method?: string;
}

export interface QuestConfig extends FetchOptions {
  endpoint: string;
}

export interface SomeObject {
  [key: string]: any;
}
