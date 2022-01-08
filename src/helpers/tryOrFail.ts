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
    onError?: (error) => void;
    onSuccess?: (data) => void;
  }
) {
  const baseData = {
    cached: !!options?.cached,
    event: options?.event?.detail?.event,
    name: options?.name,
    endpoint: options?.endpoint,
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
