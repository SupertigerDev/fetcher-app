import { RequestType } from "./RequestTypeList";
export interface TextFetcherResult {
  response: Response;
  text: string;
  requestTime: number;
  totalTime: number;
  startTime: number;
}
export const textFetcher = async (url: string, requestType: RequestType) => {
  const startTime = Date.now();
  const response = await fetch(url, { method: requestType });
  const requestTime = Date.now() - startTime;
  const text = await response.text();
  const totalTime = Date.now() - startTime;
  return {
    response,
    text,
    requestTime,
    totalTime,
    startTime,
  } as TextFetcherResult;
};
