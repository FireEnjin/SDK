import fireenjinError from "../events/error";
import fireenjinSuccess from "../events/success";

export default async function tryOrFail(
  fn: () => Promise<any>,
  options?: {
    endpoint?: string;
    name?: string;
    retries?: number;
    event?: any;
    cached?: boolean;
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
    onError?: (error: any) => void;
    onSuccess?: (data: any) => void;
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
