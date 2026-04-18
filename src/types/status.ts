type StatusType = "success" | "error" | "info" | "warning" | undefined;

export interface Status {
  message: string;
  type: StatusType;
}
