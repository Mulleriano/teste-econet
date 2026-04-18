import type { Status } from "../types/status";

export default function resetStatus(): Status {
  return {
    message: "",
    type: undefined,
  };
}
