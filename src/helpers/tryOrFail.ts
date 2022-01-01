import fireenjinError from "../events/error";
import fireenjinSuccess from "../events/success";

export default async function tryOrFail(
  fn: () => Promise<any>,
  options?: {
    retries?: number;
    event?: any;
    cached?: boolean;
    onError?: (error) => void;
    onSuccess?: (data) => void;
  }
) {
  try {
    const data = await fn();
    await fireenjinSuccess(
      {
        cached: !!options?.cached,
        event: options?.event.detail?.event,
        data,
        name: options?.event.detail.name,
        endpoint: options?.event.detail.endpoint,
      },
      {
        onSuccess: options?.onSuccess,
      }
    );
  } catch (error) {
    await fireenjinError(
      {
        cached: !!options?.cached,
        event: options?.event?.detail?.event,
        error,
        name: options?.event?.detail?.name,
        endpoint: options?.event?.detail?.endpoint,
      },
      {
        onError: options?.onError,
      }
    );
  }
}
