import React, { useRef, useEffect, useState } from 'react';
import * as monaco from 'monaco-editor';

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ value, onChange }) => {
    const [editor, setEditor] = useState(null)

    useEffect(() => {
      const initMonaco = async () => {
        const monaco = await import('monaco-editor')
        // 初始化编辑器
      }
      initMonaco()
    }, [])
  const editorRef = useRef(null);
//   const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      const newEditor = monaco.editor.create(editorRef.current, {
        value: value,
        language: 'json',
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: false },
        folding: true,
        foldingStrategy: 'indentation',
        scrollBeyondLastLine: false,
        lineNumbers: 'on',
        renderValidationDecorations: 'on',
        tabSize: 2,
      });

      newEditor.onDidChangeModelContent(() => {
        onChange(newEditor.getValue());
      });

      setEditor(newEditor);

      return () => newEditor.dispose();
    }
  }, []);

  useEffect(() => {
    if (editor) {
      const currentValue = editor.getValue();
      if (value !== currentValue) {
        editor.setValue(value);
      }
    }
  }, [value, editor]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div ref={editorRef} style={{ height: '400px', border: '1px solid #ccc' }} />
    </div>
  );
};

export default JsonEditor;