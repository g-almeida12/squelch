import Editor, { type Monaco } from "@monaco-editor/react";
import { editor as MonacoEditorNS } from "monaco-editor";
import { Button } from "../Button";
import { useRef } from "react";

const setEditorTheme = (monaco: Monaco) => {
  monaco.editor.defineTheme("squelch", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "keyword", foreground: "F6339A", fontStyle: "bold" },
      { token: "keyword.sql", foreground: "F6339A", fontStyle: "bold" },
      { token: "operator", foreground: "F6339A", fontStyle: "bold" },
      { token: "operator.sql", foreground: "F6339A", fontStyle: "bold" },
      { token: "comment", foreground: "6272A4", fontStyle: "italic" },
      { token: "string", foreground: "0DD124" },
      { token: "string.sql", foreground: "0DD124" },
      { token: "number", foreground: "419AFA" },
    ],
    colors: {
      "editor.background": "#03070A",
      "editor.foreground": "#F8F8F2",
      "editorLineNumber.foreground": "#6272A4",
      "editor.lineHighlightBackground": "#242638",
    },
  });
};

interface MonacoEditorProps {
  readOnly?: boolean;
  value?: string;
  height?: string;
  forSubmission?: boolean;
  onTestClick?: (submittedQuery: string) => void;
  onValidateClick?: (submittedQuery: string) => void;
}

export function MonacoEditor({
  readOnly = false,
  value = "",
  height = "h-80",
  forSubmission = false,
  onTestClick,
  onValidateClick,
}: MonacoEditorProps) {
  const monacoRef = useRef<MonacoEditorNS.IStandaloneCodeEditor | null>(null);

  // Add listener to trigger the run and validation callbacks by a shortcut
  const handleEditorMount = (
    editor: MonacoEditorNS.IStandaloneCodeEditor,
    monaco: Monaco,
  ) => {
    monacoRef.current = editor;

    // 'Crtl + Enter' trigger run query action
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      const value = editor.getValue();
      onTestClick?.(value);
    });

    // 'Crtl + Shift + Enter' trigger validate query action
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Enter,
      () => {
        const value = editor.getValue();
        onValidateClick?.(value);
      },
    );
  };

  return (
    <div className={`bg-[#03070A] rounded-1 overflow-hidden ${height}`}>
      <div className="h-8 bg-gray-800 flex items-center justify-between gap-2 px-4 mb-2">
        <div className="flex items-center justify-start gap-2">
          <span className="size-4 bg-red-700 rounded-full"></span>
          <span className="size-4 bg-yellow-500 rounded-full"></span>
          <span className="size-4 bg-green-700 rounded-full"></span>
        </div>

        {forSubmission && (
          <div className="flex items-center justify-center gap-2">
            <Button
              onClick={() => onTestClick?.(monacoRef.current?.getValue() ?? "")}
              variant="ghost-primary"
              small
              title="Ctrl + Enter"
            >
              Testar query
            </Button>
            <Button
              onClick={() =>
                onValidateClick?.(monacoRef.current?.getValue() ?? "")
              }
              small
              title="Ctrl + Shift + Enter"
            >
              Validar query
            </Button>
          </div>
        )}
      </div>
      <Editor
        defaultLanguage="sql"
        defaultValue={value}
        theme="squelch"
        beforeMount={setEditorTheme}
        onMount={handleEditorMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          automaticLayout: true,
          readOnly,
        }}
        value={value}
      />
    </div>
  );
}
