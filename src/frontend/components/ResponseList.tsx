import { List, ListItem } from "./List";

const ResponseItems = [
  { id: "PRETTY", name: "Pretty" },
  { id: "RAW", name: "Raw" },
  { id: "PREVIEW", name: "Preview" },
] as const satisfies ListItem[];

export type ResponseType = (typeof ResponseItems)[number]["id"];

export const ResponseList = (props: {
  selectedId: ResponseType;
  onChange: (id: ResponseType) => void;
}) => {
  return (
    <List
      items={ResponseItems}
      onChange={props.onChange}
      selectedId={props.selectedId}
    />
  );
};
