import {
  FireEnjinSuccessEvent,
  FireEnjinErrorCallback,
  FireEnjinSuccessCallback,
} from "../interfaces";
import setComponentProps from "../helpers/setComponentProps";

export default async function fireenjinSuccess(
  input?: {
    event?: CustomEvent;
    target?: any;
    cached?: boolean;
    dataPropsMap?: any;
    data?: any;
    name?: string;
    endpoint?: string;
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
  },
  options?: {
    onSuccess?: FireEnjinSuccessCallback;
    onError?: FireEnjinErrorCallback;
  }
) {
  const detail: FireEnjinSuccessEvent = {
    event: input?.event,
    target: input?.target || input?.event?.target,
    data: input?.data || null,
    name: input?.name,
    endpoint: input?.endpoint,
    bubbles: !!input?.bubbles,
    cancelable: !!input?.cancelable,
    composed: !!input?.composed,
    cached: !!input?.cached,
  };
  if (input?.dataPropsMap) {
    try {
      detail.data = await setComponentProps(input?.dataPropsMap, input?.data);
    } catch {
      console.log("Error setting data props");
      if (typeof options?.onError === "function") options.onError(detail);
    }
  }
  if (typeof options?.onSuccess === "function") options.onSuccess(detail);
  const el = detail?.target || document;
  el.dispatchEvent(
    new CustomEvent("fireenjinSuccess", {
      detail,
      bubbles: !!input?.bubbles,
      cancelable: !!input?.cancelable,
      composed: !!input?.composed,
    })
  );
}
