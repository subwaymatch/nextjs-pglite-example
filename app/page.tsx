import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col gap-2 text-lg">
          <Link href="/version/">Version</Link>
          <Link href="/basic">Basic</Link>
          <Link href="/simple-query-runner">Simple Query Runner</Link>
          <Link href="/dashboard/">Dashboard</Link>
          <Link href="/query-editor/">Query Editor</Link>
          <Link href="/worker/">Simple Query Runner inside a Worker</Link>
        </div>
      </div>
    </div>
  );
}
