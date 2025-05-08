import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "../theme";
import { Editor, OnChange, OnMount } from "@monaco-editor/react";

interface MonacoEditorProps {
  text: string;
  language: string;
  readOnly?: boolean;
  format?: boolean;
  autoSize?: boolean;
  hideMinimap?: boolean;
  style?: React.CSSProperties;

  onChange?: OnChange;
}
export const MonacoEditor = (props: MonacoEditorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const darkTheme = document.body.classList.contains("dark");
  const { useThemeChangeListener } = useTheme();
  const [editor, setEditor] = useState<Parameters<OnMount>[0] | null>(null);
  useThemeChangeListener((theme) => {
    editor?.updateOptions({
      theme: theme === "dark" ? "vs-dark" : "vs-light",
    });
  });

  const updateHeight = useCallback(() => {
    if (!props.autoSize) return;
    const contentHeight = Math.min(
      200,
      Math.max(editor!.getContentHeight(), 100)
    );
    if (containerRef.current) {
      containerRef.current.style.height = `${contentHeight}px`;
    }
  }, [editor, props.autoSize]);

  useEffect(() => {
    if (editor) {
      updateHeight();
    }
    const dispose = editor?.onDidContentSizeChange(() => {
      updateHeight();
    });

    return () => {
      dispose?.dispose();
    };
  }, [editor, updateHeight]);

  return (
    <div
      className="monaco-editor-container"
      ref={containerRef}
      style={{
        ...(props.autoSize ? undefined : { width: "100%", height: "100%" }),
        flexShrink: 0,
        borderRadius: "6px",
        ...props.style,
        overflow: "hidden",
      }}
    >
      <Editor
        defaultLanguage={props.language}
        theme={darkTheme ? "vs-dark" : undefined}
        defaultValue={props.text}
        onChange={props.onChange}
        onMount={(editor) => {
          setEditor(editor);
          if (!props.format) return;
          editor
            .getAction("editor.action.formatDocument")
            ?.run()
            .then(() => {
              editor.updateOptions({ readOnly: props.readOnly });
            });
        }}
        options={{
          domReadOnly: props.readOnly,
          scrollBeyondLastLine: false,
          minimap: { enabled: !props.hideMinimap },
          fixedOverflowWidgets: true,
        }}
      />
    </div>
  );
};
