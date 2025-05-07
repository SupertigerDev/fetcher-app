import style from "./RequestResponsePane.module.scss";
import { useState } from "react";
import { TextFetcherResult } from "./Fetcher";
import { ResponseList, ResponseType } from "./ResponseList";

export const RequestResponsePane = (props: { res: TextFetcherResult }) => {
  const [responseType, setResponseType] = useState<ResponseType>("RAW");

  return (
    <div className={style.requestResponsePane}>
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
    </div>
  );
};
