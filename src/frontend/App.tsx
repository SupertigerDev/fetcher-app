import { useState } from "react";
import style from "./App.module.scss";
import { Input } from "./components/Input";
import { RequestType, RequestTypeList } from "./components/RequestTypeList";
import { Footer } from "./components/Footer";
import { textFetcher, TextFetcherResult } from "./Fetcher";
import { RequestResponsePane } from "./components/RequestResponsePane";
import { WebSocketPane } from "./components/WebSocketPane";
import { useWebSocket } from "./useWebSocket";

function App() {
  const [url, setUrl] = useState("");
  const [requestType, setRequestType] = useState<RequestType>("GET");
  const isWebSocket = requestType === "WS";

  const ws = useWebSocket();

  const [fetcherResult, setFetcherResult] = useState<TextFetcherResult | null>(
    null
  );

  const onSend = async () => {
    if (isWebSocket) {
      ws.connect(url);
      return;
    }
    const res = await textFetcher(url, requestType);
    setFetcherResult(res);
  };

  const noResponse =
    (isWebSocket && !ws.events.length) || (!isWebSocket && !fetcherResult);

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
        <RequestResponsePane res={fetcherResult} />
      )}

      {isWebSocket && ws.events.length > 0 && <WebSocketPane ws={ws} />}

      {noResponse && (
        <div className={style.noResponseContainer}>
          Enter URL and select request type. <br />
          Click "{isWebSocket ? "Connect" : "Send"}" to start.
        </div>
      )}
      <Footer res={fetcherResult} />

    </>
  );
}

export default App;
