import { TextFetcherResult } from "../Fetcher";
import style from "./RequestResponseDetailsHeader.module.scss";
import { getResponseCodeDetails, ResponseCodes } from "./ResponseCodes";

const RequestStatusColors = [
  "info",
  "success",
  "redirect",
  "client-error",
  "server-error",
];

const getRequestTimeColor = (ms: number) => {
  if (ms > 300) {
    return "client-error"; // red
  }
  if (ms > 500) {
    return "server-error"; // orange
  }
  return "success";
};

export const RequestResponseDetailsHeader = (props: {
  res: TextFetcherResult;
}) => {
  const statusCodeStart = parseInt(props.res.response.status.toString()[0]);
  const statusCodeColor = RequestStatusColors[statusCodeStart - 1];
  const time = props.res.totalTime;
  const timeColor = getRequestTimeColor(time);

  return (
    <div className={style.header}>
      <div>
        <span>Status: </span>
        <span style={{ color: `var(--${statusCodeColor})` }}>
          {props.res.response.status}{" "}
          {getResponseCodeDetails(props.res.response.status)?.message || ""}
        </span>
      </div>
      <div>
        <span>Time: </span>
        <span
          style={{
            color: `var(--${timeColor})`,
          }}
        >
          {time}
          <span> ms</span>
        </span>
      </div>
    </div>
  );
};
