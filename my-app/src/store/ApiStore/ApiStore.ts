import axios from "axios";

type RequestType = {
  endpoint: string;
};

export type ApiResponse<Success, Error> = {
  status: HTTPStatus | false | "error";
  success: true | false;
  data: Success | Error | null;
};

export enum HTTPStatus {
  OK = 200,
}

export default class ApiStore {
  readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async request<Success, Error = any>(
    values: RequestType
  ): Promise<ApiResponse<Success, Error>> {
    try {
      const response = await axios(this.baseUrl + values.endpoint);
      return {
        status: response.status,
        success: response.status === HTTPStatus.OK,
        data: response.data,
      };
    } catch {
      return {
        status: "error",
        success: false,
        data: null,
      };
    }
  }
}
