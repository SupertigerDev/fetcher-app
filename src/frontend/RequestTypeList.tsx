import { List, ListItem } from "./List";

const RequestTypeItems = [
  { id: "GET", name: "GET" },
  { id: "POST", name: "POST" },
  { id: "PUT", name: "PUT" },
  { id: "DELETE", name: "DELETE" },
  { id: "WS", name: "WS" },
] as const satisfies ListItem[];

export type RequestType = (typeof RequestTypeItems)[number]["id"];

export const RequestTypeList = (props: {
  selectedId: RequestType;
  onChange: (id: RequestType) => void;
}) => {
  return (
    <List
      items={RequestTypeItems}
      onChange={props.onChange}
      selectedId={props.selectedId}
    />
  );
};
