import setComponentProps from "../helpers/setComponentProps";

export default async function fireenjinError(
  input?: {
    cached?: boolean;
    event?: Event;
    error?: any;
    name?: string;
    endpoint?: string;
  },
  options?: {
    onError?: (error) => void;
  }
) {
  const detail = {
    event: input?.event,
    error: input?.error,
    target: input?.event?.target,
    name: input?.name,
    endpoint: input?.endpoint,
  };
  if (typeof options?.onError === "function") options.onError(detail);
  document.body.dispatchEvent(
    new CustomEvent("fireenjinError", {
      detail,
    })
  );
}
