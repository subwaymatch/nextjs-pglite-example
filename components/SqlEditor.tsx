"use client"; // Ensures it runs only in the browser

import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";

export default function SqlEditor({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (query: string) => void;
}) {
  const handleChange = (value: string) => {
    setQuery(value);
  };

  return (
    <div className="border rounded-md p-2">
      <CodeMirror
        value={query}
        height="300px"
        extensions={[sql()]} // Enables SQL syntax highlighting
        onChange={handleChange}
        theme="light" // Change to a dark theme if needed
      />
    </div>
  );
}
