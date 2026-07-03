import Editor, { type Monaco } from "@monaco-editor/react";
import type { editor as MonacoEditorNS } from "monaco-editor";
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
              variant="ghost-primary"
              small
              onClick={() => onTestClick?.(monacoRef.current?.getValue() ?? "")}
            >
              Testar query
            </Button>
            <Button small onClick={() => onValidateClick?.(monacoRef.current?.getValue() ?? "")}>
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
        onMount={(editor) => (monacoRef.current = editor)}
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
