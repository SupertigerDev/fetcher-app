import { useState } from "react";
import style from "./App.module.scss";
import { Input } from "./Input";
import { RequestType, RequestTypeList } from "./RequestTypeList";
import { RequestResponseDetailsHeader } from "./RequestResponseDetailsHeader";
import { textFetcher, TextFetcherResult } from "./Fetcher";
import { RequestResponsePane } from "./RequestResponsePane";

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
        <RequestResponsePane res={fetcherResult} />
      )}
    </>
  );
}

export default App;
