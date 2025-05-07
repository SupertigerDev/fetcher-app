import { TextFetcherResult } from "./Fetcher";
import style from "./RequestResponseDetailsHeader.module.scss";

export const RequestResponseDetailsHeader = (props: {
  res: TextFetcherResult;
}) => {
  return (
    <div className={style.header}>
      <span>Status: {props.res.response.status} </span>
      <span>Took {props.res.totalTime}ms</span>
    </div>
  );
};
