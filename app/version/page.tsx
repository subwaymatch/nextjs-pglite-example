import { PGlite } from "@electric-sql/pglite";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function VersionPage() {
  const db = new PGlite();
  const query = "SELECT * FROM version();";
  const versionResult = await db.exec(query);

  const version = versionResult[0].rows[0]["version"].toString();

  // Extract major version if possible (e.g., "PostgreSQL 15.3" -> "15.3")
  const majorVersion = version.includes("PostgreSQL")
    ? version.split("PostgreSQL")[1].trim().split(" ")[0]
    : version;

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">PostgreSQL Version</CardTitle>
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
            >
              Active
            </Badge>
          </div>
          <CardDescription>
            PostgreSQL in the browser using{" "}
            <Link href="https://github.com/electric-sql/pglite">PGlite</Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* SQL Query Display */}
            <code className="block rounded-sm font-mono text-sm text-blue-500 bg-blue-50 dark:bg-blue-800 p-2 rounded border border-blue-200 dark:border-blue-700">
              {query}
            </code>

            {/* Version Display */}
            <div className="border rounded-sm p-4 bg-slate-50 dark:bg-slate-900">
              <div className="font-mono text-sm">{version}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-sm p-3">
                <div className="text-xs font-medium text-muted-foreground mb-1">
                  PostgreSQL
                </div>
                <div className="text-lg font-semibold">{majorVersion}</div>
              </div>
              <div className="border rounded-sm p-3">
                <div className="text-xs font-medium text-muted-foreground mb-1">
                  Environment
                </div>
                <div className="text-lg font-semibold">Browser WASM</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
