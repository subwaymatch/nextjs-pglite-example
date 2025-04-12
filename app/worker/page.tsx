"use client";
import { useEffect, useRef } from "react";

export default function WorkerExamplePage() {
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("./worker-process.ts", import.meta.url)
    );
    workerRef.current.onmessage = (event: MessageEvent<number>) =>
      alert(`WebWorker Response => ${event.data}`);
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const sendQuery = async () => {
    workerRef.current?.postMessage("SELECT NOW();");
  };

  return (
    <div className="p-4">
      <p>Do work in a WebWorker!</p>
      <button className="rounded-sm mt-4" onClick={sendQuery}>
        Send Query
      </button>
    </div>
  );
}
