export interface SomeObject {
  [key: string]: any;
}

export interface QueryResponse {
  data?: SomeObject;
  errors?: any[];
}

export interface FetchOptions {
  headers?: {
    [key: string]: string;
  };
  method?: string;
}

export interface QuestConfig extends FetchOptions {
  endpoint: string;
}
