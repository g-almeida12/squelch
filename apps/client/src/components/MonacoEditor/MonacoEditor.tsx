import Editor, { type Monaco } from "@monaco-editor/react";

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
      "editor.background": "#060C14",
      "editor.foreground": "#F8F8F2",
      "editorLineNumber.foreground": "#6272A4",
      "editor.lineHighlightBackground": "#242638",
    },
  });
};

export function MonacoEditor() {
  return (
    <div className="bg-[#060C14] h-80 rounded-1 overflow-hidden">
      <div className="h-8 bg-gray-800 flex items-center justify-start gap-2 px-4 mb-2">
        <span className="size-4 bg-red-700 rounded-full"></span>
        <span className="size-4 bg-yellow-500 rounded-full"></span>
        <span className="size-4 bg-green-700 rounded-full"></span>
      </div>
      <Editor
        defaultLanguage="sql"
        defaultValue={`-- Clique aqui e tente modificar essa query!\nSELECT nome, habilidade \nFROM usuarios \nWHERE nivel = 'avançado'\nAND curiosidade = 'alta';`}
        theme="squelch"
        beforeMount={setEditorTheme}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          automaticLayout: true,
        }}
      />
    </div>
  );
}
