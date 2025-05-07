import style from "./RequestResponsePane.module.scss";
import { useEffect, useRef, useState } from "react";
import { TextFetcherResult } from "../Fetcher";
import { ResponseList, ResponseType } from "./ResponseList";
import { Editor, OnMount } from "@monaco-editor/react";
import { useTheme } from "../theme";

const contentTypeToExtensionMap: Record<string, string> = {
  "application/json": "json",
  "application/xml": "xml",
  "text/html": "html",
};

const getExtensionFromContentType = (contentType: string) => {
  const key = Object.keys(contentTypeToExtensionMap).find((k) =>
    contentType.startsWith(k)
  );

  return contentTypeToExtensionMap[key || ""];
};

export const RequestResponsePane = (props: { res: TextFetcherResult }) => {
  const [responseType, setResponseType] = useState<ResponseType>("PRETTY");


  useEffect(() => {
    setResponseType("PRETTY");
  }, [props.res]);



  return (
    <div className={style.requestResponsePane}>
      <ResponseList selectedId={responseType} onChange={setResponseType} />
      <div className={style.responseContainer}>
        {responseType === "PRETTY" && (
          <PrettyResponse key={props.res.startTime} res={props.res} />
        )}
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

export const PrettyResponse = (props: { res: TextFetcherResult }) => {
  const darkTheme = document.body.classList.contains("dark");
  const {onThemeChanged} = useTheme();
  const editorRef = useRef<Parameters<OnMount>[0]>(null);
  onThemeChanged((theme) => {
    editorRef.current?.updateOptions({theme: theme === "dark" ? "vs-dark" : "vs-light"})
  })

  return (
    <Editor
      defaultLanguage={getExtensionFromContentType(
        props.res.response.headers.get("Content-Type") || "text"
      )}
      theme={darkTheme ? "vs-dark" : undefined}
      defaultValue={props.res.text}
      onMount={(editor) => {
        editorRef.current = editor;
        editor
          .getAction("editor.action.formatDocument")
          ?.run()
          .then(() => {
            editor.updateOptions({ readOnly: true });
          });
      }}
      options={{ domReadOnly: true }}
    />
  );
};
