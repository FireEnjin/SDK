import fireenjinError from "../events/error";
import fireenjinSuccess from "../events/success";
export default async function tryOrFail(fn, options) {
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
        await fireenjinSuccess({ ...baseData, data }, {
            onSuccess: options?.onSuccess,
            onError: options?.onError,
        });
        return data;
    }
    catch (error) {
        await fireenjinError({
            ...baseData,
            error,
        }, {
            onError: options?.onError,
        });
        return;
    }
}
