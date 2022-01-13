import {
  FireEnjinErrorCallback,
  FireEnjinSuccessCallback,
} from "../interfaces";
import fireenjinError from "../events/error";
import fireenjinSuccess from "../events/success";

export default async function tryOrFail(
  fn: () => Promise<any>,
  options?: {
    endpoint?: string;
    name?: string;
    retries?: number;
    event?: any;
    target?: any;
    cached?: boolean;
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
    onError?: FireEnjinErrorCallback;
    onSuccess?: FireEnjinSuccessCallback;
  }
) {
  const baseData = {
    cached: !!options?.cached,
    event: options?.event,
    name: options?.name,
    endpoint: options?.endpoint,
    bubbles: options?.bubbles ?? true,
    cancelable: options?.cancelable ?? true,
    composed: !!options?.composed,
    target: options?.target || options?.event?.target,
  };
  try {
    const data = await fn();
    await fireenjinSuccess(
      { ...baseData, data },
      {
        onSuccess: options?.onSuccess,
      }
    );

    return data;
  } catch (error) {
    await fireenjinError(
      {
        ...baseData,
        error,
      },
      {
        onError: options?.onError,
      }
    );

    return;
  }
}
