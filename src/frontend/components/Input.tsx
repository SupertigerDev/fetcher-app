import React from "react";
import style from "./Input.module.scss";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: InputProps) => {
  return (
    <input {...props} className={style.input + " " + (props.className || "")} />
  );
};

type TextareaProps = React.InputHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = (props: TextareaProps) => {
  return (
    <textarea
      {...props}
      className={style.input + " " + (props.className || "")}
    />
  );
};
