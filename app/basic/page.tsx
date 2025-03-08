import { PGlite } from "@electric-sql/pglite";
import { Badge } from "@/components/ui/badge";

export default async function BasicPage() {
  const db = new PGlite();
  const query = "SELECT 1 + 2 AS result;";
  const queryResult = await db.exec(query);

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Badge className="rounded-xs">Query</Badge>
        <code className="block mt-2">{query}</code>

        <Badge className="rounded-xs mt-4">Return Value</Badge>
        <code className="block mt-2">
          {JSON.stringify(queryResult, null, "\t")}
        </code>
      </div>
    </div>
  );
}
