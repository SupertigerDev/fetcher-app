import { useState } from "react";
import style from "./App.module.scss";
import { Input } from "./Input";
import { RequestType, RequestTypeList } from "./RequestTypeList";
import { ResponseList, ResponseType } from "./ResponseList";

function App() {
  const [url, setUrl] = useState("");
  const [requestType, setRequestType] = useState<RequestType>("GET");
  const [responseType, setResponseType] = useState<ResponseType>("RAW");

  const [res, setRes] = useState<string | null>(null);

  const onSend = async () => {
    const res = await fetch(url, { method: requestType }).then((res) =>
      res.text()
    );
    setRes(res);
  };

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
          Send
        </button>
      </div>
      {res && (
        <>
          <ResponseList selectedId={responseType} onChange={setResponseType} />
          <div className={style.responseContainer}>
            {responseType === "RAW" ? (
              <pre className={style.rawResponse}>{res}</pre>
            ) : (
              <iframe
                style={{}}
                className={style.responseIframe}
                srcDoc={res}
                sandbox=""
              ></iframe>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default App;
