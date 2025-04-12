"use client";

import { useState } from "react";
import { PGlite } from "@electric-sql/pglite";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useToggle } from "react-use";
import TableView from "@/app/components/TableView";
import { PGliteWorker } from "@electric-sql/pglite/worker";

export default function WorkerExamplePage() {
  const [query, setQuery] = useState("SELECT NOW();");
  const [queryResult, setQueryResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTableView, toggleTableView] = useToggle(true);

  const runQuery = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const pg = await PGliteWorker.create(
        new Worker(new URL("./worker-process.ts", import.meta.url), {
          type: "module",
        })
      );
      const result = await pg.exec(query);
      setQueryResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setQueryResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-10 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        SQL Query Runner inside a Worker
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Query Input</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your SQL query here..."
            className="min-h-[200px] font-mono"
          />
          <Button
            onClick={runQuery}
            className="mt-4 rounded-xs"
            disabled={isLoading || !query.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Running...
              </>
            ) : (
              "Run Query"
            )}
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Card className="mt-6 border-red-400">
          <CardHeader>
            <CardTitle className="text-red-500">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-red-50 p-4 rounded text-red-500 overflow-x-auto">
              {error}
            </pre>
          </CardContent>
        </Card>
      )}

      {queryResult && !error && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Query Result in JSON</CardTitle>
          </CardHeader>
          <CardContent>
            {isTableView ? (
              <TableView data={queryResult} />
            ) : (
              <pre className="bg-slate-50 p-4 rounded overflow-x-auto">
                {JSON.stringify(queryResult, null, 2)}
              </pre>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
