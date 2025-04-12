// This is a module worker, so we can use imports (in the browser too!)
import multiply_by_two from "./utils/multiply_by_two";

addEventListener("message", (event: MessageEvent<number>) => {
  postMessage(multiply_by_two(event.data));
});
