import style from "./List.module.scss";

export interface ListItem<T = string> {
  name: string;
  id: T;
}
export interface ListProps<T> {
  items: ListItem<T>[];
  selectedId: T;
  onChange: (itemId: T) => void;
}

export function List<T extends string>(props: ListProps<T>) {
  return (
    <div className={style.list}>
      {props.items.map((item) => (
        <Button
          key={item.id}
          item={item}
          selected={item.id === props.selectedId}
          onClick={() => props.onChange(item.id)}
        />
      ))}
    </div>
  );
}

interface ButtonProps {
  item: ListItem;
  selected: boolean;
  onClick: () => void;
}
const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={props.selected ? style.active : ""}
    >
      {props.item.name}
    </button>
  );
};
