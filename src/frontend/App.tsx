import { useState } from "react";
import style from "./App.module.scss";
import { Input } from "./Input";
import { RequestType, RequestTypeList } from "./RequestTypeList";
import { ResponseList, ResponseType } from "./ResponseList";
import { RequestResponseDetailsHeader } from "./RequestResponseDetailsHeader";
import { textFetcher, TextFetcherResult } from "./Fetcher";

function App() {
  const [url, setUrl] = useState("");
  const [requestType, setRequestType] = useState<RequestType>("GET");

  const [fetcherResult, setFetcherResult] = useState<TextFetcherResult | null>(
    null
  );

  const onSend = async () => {
    const res = await textFetcher(url, requestType);

    setFetcherResult(res);
  };

  const isWebsocket = requestType === "WS";

  return (
    <>
      <RequestTypeList selectedId={requestType} onChange={setRequestType} />
      <div className={style.urlContainer}>
        <Input
          className={style.urlInput}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSend();
            }
          }}
          value={url}
          placeholder="URL"
          type="url"
        />
        <button className={style.sendButton} onClick={onSend}>
          {isWebsocket ? "Connect" : "Send"}
        </button>
      </div>
      {fetcherResult && !isWebsocket && (
        <RequestResponseDetailsHeader res={fetcherResult} />
      )}
      {fetcherResult && !isWebsocket && (
        <RequestResponseContainer res={fetcherResult} />
      )}
    </>
  );
}

const RequestResponseContainer = (props: { res: TextFetcherResult }) => {
  const [responseType, setResponseType] = useState<ResponseType>("RAW");

  return (
    <>
      <ResponseList selectedId={responseType} onChange={setResponseType} />
      <div className={style.responseContainer}>
        {responseType === "RAW" && (
          <pre className={style.rawResponse}>{props.res.text}</pre>
        )}
        {responseType === "PREVIEW" && (
          <iframe
            className={style.responseIframe}
            srcDoc={props.res.text}
            sandbox=""
          ></iframe>
        )}
      </div>
    </>
  );
};

export default App;
