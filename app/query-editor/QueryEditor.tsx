"use client";

import SqlEditor from "@/components/SqlEditor";
import { useState, useEffect } from "react";
import {
  FaChevronDown,
  FaChevronRight,
  FaPlay,
  FaTable,
  FaColumns,
} from "react-icons/fa";

// Types
interface TableSchema {
  name: string;
  columns: { name: string; type: string }[];
}

interface QueryResult {
  columns: string[];
  rows: Record<string, any>[];
}

const QueryEditor = () => {
  const [tables, setTables] = useState<TableSchema[]>([]);
  const [expandedTables, setExpandedTables] = useState<Record<string, boolean>>(
    {}
  );
  const [query, setQuery] = useState<string>("SELECT * FROM users LIMIT 10;");
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Mock data for demonstration
  useEffect(() => {
    // In a real app, fetch this from your API
    const mockTables: TableSchema[] = [
      {
        name: "users",
        columns: [
          { name: "id", type: "INTEGER" },
          { name: "name", type: "TEXT" },
          { name: "email", type: "TEXT" },
          { name: "created_at", type: "TIMESTAMP" },
        ],
      },
      {
        name: "posts",
        columns: [
          { name: "id", type: "INTEGER" },
          { name: "title", type: "TEXT" },
          { name: "content", type: "TEXT" },
          { name: "user_id", type: "INTEGER" },
          { name: "created_at", type: "TIMESTAMP" },
        ],
      },
    ];
    setTables(mockTables);
  }, []);

  const toggleTable = (tableName: string) => {
    setExpandedTables((prev) => ({
      ...prev,
      [tableName]: !prev[tableName],
    }));
  };

  const executeQuery = async () => {
    try {
      setIsLoading(true);
      // In a real app, send the query to your backend API
      // const response = await fetch('/api/execute-query', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ query }),
      // });
      // const data = await response.json();

      // Mock response for demonstration
      await new Promise((resolve) => setTimeout(resolve, 500));
      const mockResult: QueryResult = {
        columns: ["id", "name", "email", "created_at"],
        rows: [
          {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            created_at: "2023-01-15",
          },
          {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            created_at: "2023-02-20",
          },
          {
            id: 3,
            name: "Bob Johnson",
            email: "bob@example.com",
            created_at: "2023-03-10",
          },
        ],
      };

      setQueryResult(mockResult);
    } catch (error) {
      console.error("Error executing query:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 border-r border-gray-300 overflow-y-auto p-2">
        <h2 className="font-bold text-lg mb-2">Tables</h2>
        <div className="space-y-2">
          {tables.map((table) => (
            <div key={table.name} className="select-none">
              <div
                className="flex items-center p-2 hover:bg-gray-200 cursor-pointer rounded"
                onClick={() => toggleTable(table.name)}
              >
                {expandedTables[table.name] ? (
                  <FaChevronDown className="mr-1" />
                ) : (
                  <FaChevronRight className="mr-1" />
                )}
                <FaTable className="mr-2 text-blue-600" />
                <span>{table.name}</span>
              </div>

              {expandedTables[table.name] && (
                <div className="ml-6 pl-2 border-l border-gray-300 space-y-1 py-1">
                  {table.columns.map((column) => (
                    <div
                      key={column.name}
                      className="flex items-center p-1 text-sm"
                    >
                      <FaColumns className="mr-2 text-green-600" size={12} />
                      <span>{column.name}</span>
                      <span className="ml-1 text-gray-500 text-xs">
                        ({column.type})
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* SQL Editor */}
        <div className="p-4 border-b border-gray-300 h-1/2 overflow-hidden">
          <div className="flex justify-between mb-2">
            <h2 className="font-bold text-lg">SQL Query</h2>
            <button
              onClick={executeQuery}
              className="flex items-center bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? (
                "Running..."
              ) : (
                <>
                  <FaPlay className="mr-1" size={12} />
                  Run Query
                </>
              )}
            </button>
          </div>
          <div className="h-[calc(100%-40px)] border border-gray-300 rounded">
            <SqlEditor query={query} setQuery={setQuery} />
          </div>
        </div>

        {/* Query Result */}
        <div className="flex-1 p-4 overflow-auto">
          <h2 className="font-bold text-lg mb-2">Query Results</h2>
          {queryResult ? (
            <div className="border border-gray-300 rounded overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {queryResult.columns.map((column) => (
                      <th
                        key={column}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {queryResult.rows.map((row, idx) => (
                    <tr key={idx}>
                      {queryResult.columns.map((column) => (
                        <td
                          key={column}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                          {row[column]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              {isLoading ? "Running query..." : "Run a query to see results"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QueryEditor;
