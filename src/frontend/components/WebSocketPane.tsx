import style from "./WebSocketPane.module.scss";
import { UseWebSocket, WebSocketEvent } from "../useWebSocket";

export const WebSocketPane = (props: { ws: UseWebSocket }) => {
  return (
    <div className={style.webSocketPane}>
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
