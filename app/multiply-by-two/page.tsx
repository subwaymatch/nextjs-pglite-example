"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useCallback } from "react";

export default function Index() {
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(new URL("@/worker.ts", import.meta.url));
    workerRef.current.onmessage = (event: MessageEvent<number>) =>
      alert(`WebWorker Response => ${event.data}`);
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const handleWork = useCallback(async () => {
    workerRef.current?.postMessage(100000);
  }, []);

  return (
    <>
      <p>Do work in a WebWorker!</p>
      <Button onClick={handleWork}>Calculate PI</Button>
    </>
  );
}
