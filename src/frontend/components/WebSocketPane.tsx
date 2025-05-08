import style from "./WebSocketPane.module.scss";
import { UseWebSocket, WebSocketEvent } from "../useWebSocket";
import { MonacoEditor } from "./Editor";
import { useState } from "react";

export const WebSocketPane = (props: { ws: UseWebSocket }) => {
  const [message, setMessage] = useState("");

  return (
    <div className={style.webSocketPane}>
      <div className={style.inputArea}>
        <MonacoEditor
          text={message}
          language="json"
          onChange={(e) => setMessage(e || "")}
          autoSize
          hideMinimap
        />
        <button onClick={() => props.ws.send(message)}>Send</button>
      </div>
      {props.ws.events.map((e) => (
        <EventItem key={e.id} event={e} />
      ))}
    </div>
  );
};

const EventItem = (props: { event: WebSocketEvent }) => {
  const time = Intl.DateTimeFormat(undefined, { timeStyle: "medium" }).format(
    props.event.createdAt
  );
  const type = props.event.type;
  return (
    <div className={style.eventItemContainer}>
      <div className={style.eventItemHeader}>
        <span>
          <span>At: </span>
          <span className={style.darkText}>{time}</span>
        </span>
        <span>
          <span>Type: </span>
          <span className={style.darkText} style={{ color: `var(--${type})` }}>
            {type}
          </span>
        </span>
      </div>
      {props.event.data && <pre>{props.event.data}</pre>}
    </div>
  );
};
