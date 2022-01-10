import setComponentProps from "../helpers/setComponentProps";

export default async function fireenjinError(
  input?: {
    cached?: boolean;
    event?: Event;
    error?: any;
    name?: string;
    endpoint?: string;
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
  },
  options?: {
    onError?: (error: any) => void;
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
  const el =
    input?.event?.target ||
    input?.event?.detail?.target ||
    input?.event?.detail?.event?.target ||
    document.body;
  el.dispatchEvent(
    new CustomEvent("fireenjinError", {
      detail,
      bubbles: !!input?.bubbles,
      cancelable: !!input?.cancelable,
      composed: !!input?.composed,
    })
  );
}
