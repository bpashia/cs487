import { ApiResponse } from '@interfaces';

const headers = {
  'Content-Type': 'application/json',
  'Cache-control': 'max-age=0',
};

export class Api {
  static async fetch<ResponseType>(
    url: string,
    options: Record<string, unknown>
  ): Promise<ApiResponse<ResponseType>> {
    try {
      const response = await fetch(url, {
        ...options,
      });
      // console.log('FETCH RESPONSE', { response });
      if (!response.ok) {
        if ([401, 403].includes(response.status)) {
          console.error('Unauthorized or Forbidden');
        }
        throw response.statusText;
      }

      const json = (await response.json()) as ApiResponse<ResponseType>;
      // console.log({ response: json, url });
      if (json.error) {
        throw json.error;
        // throw new Error(json.error);
      }
      return json;
    } catch (error) {
      console.log('FETCH ERROR', error);
      throw error;
      // const response = await fetch(url, options);
    }
  }

  static async get<RequestType, ResponseType = RequestType>(
    url: string,
    query?: string | Record<string, unknown>
  ) {
    const options = {
      method: 'GET',
      headers,
    };
    return Api.fetch<ResponseType>(Api.toUrl(url, query), options);
  }

  static async post<RequestType, ResponseType = RequestType>(
    url: string,
    data: Partial<RequestType>,
    meta?: any
  ) {
    const options = {
      method: 'POST',
      body: JSON.stringify({ data, meta }), // data can be `string` or {object}!
      headers,
    };
    return Api.fetch<ResponseType>(url, options);
  }

  static async put<RequestType, ResponseType = RequestType>(
    url: string,
    data: Partial<RequestType>,
    meta?: any
  ) {
    const options = {
      method: 'PUT',
      body: JSON.stringify({ data, meta }), // data can be `string` or {object}!
      headers,
    };
    return Api.fetch<ResponseType>(url, options);
  }

  static defaultErrorHandler(error: string) {
    console.error(error);
    throw error;
  }

  static toQueryString(query?: string | Record<string, unknown>): string {
    const ts = new Date().getTime();
    if (!query) return ``;

    if (typeof query === 'string') {
      if (query.indexOf('ts=') > -1) return query;
      return `${query}&ts=${ts}`;
    }
    return Object.keys({ ts, ...query })
      .reduce((acc: string[], key: string) => {
        acc.push(`${key}=${query[key]}`);
        return acc;
      }, [])
      .join('&');
  }

  static toUrl(url: string, query?: string | Record<string, unknown>) {
    const queryString = Api.toQueryString(query);
    // console.log({ queryString });
    if (!queryString) return url;
    return `${url}?${queryString}`;
  }
}
