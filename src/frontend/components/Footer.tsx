import { TextFetcherResult } from "../Fetcher";
import { useTheme } from "../theme";
import style from "./Footer.module.scss";
import { getResponseCodeDetails } from "./ResponseCodes";



export const Footer = (props: { res?: TextFetcherResult | null; }) => {
  const {theme, toggleTheme} = useTheme();


  return (
    <div className={style.footer}>
      <button className={`${style.footerItem} ${style.toggleThemeButton}`} onClick={toggleTheme}>{theme}</button>
      {props.res && <FetchInformation res={props.res} />}
    </div>
  );
};


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

const FetchInformation = (props: {
  res: TextFetcherResult
}) => {
  const statusCodeStart = parseInt(props.res.response.status.toString()[0]);
  const statusCodeColor = RequestStatusColors[statusCodeStart - 1];
  const time = props.res.totalTime;
  const timeColor = getRequestTimeColor(time);
  return (
    <>
      <div className={style.footerItem}>
        <span>Status: </span>
        <span style={{ color: `var(--${statusCodeColor})` }}>
          {props.res.response.status}{" "}
          {getResponseCodeDetails(props.res.response.status)?.message || ""}
        </span>
      </div>
      <div className={style.footerItem}>
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
    </>
  )
}