import { useState } from "react";
import style from "./App.module.scss";
import { Input } from "./components/Input";
import { RequestType, RequestTypeList } from "./components/RequestTypeList";
import { RequestResponseDetailsHeader } from "./components/RequestResponseDetailsHeader";
import { textFetcher, TextFetcherResult } from "./Fetcher";
import { RequestResponsePane } from "./components/RequestResponsePane";
import { WebSocketPane } from "./components/WebSocketPane";

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

  const isWebSocket = requestType === "WS";

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
          {isWebSocket ? "Connect" : "Send"}
        </button>
      </div>
      {fetcherResult && !isWebSocket && (
        <RequestResponseDetailsHeader res={fetcherResult} />
      )}
      {fetcherResult && !isWebSocket && (
        <RequestResponsePane res={fetcherResult} />
      )}

      {isWebSocket && <WebSocketPane res={fetcherResult} />}
    </>
  );
}

export default App;
