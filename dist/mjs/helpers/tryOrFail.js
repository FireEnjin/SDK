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
        if (typeof options?.callback === "function")
            await options.callback(data);
        await fireenjinSuccess({ ...baseData, data }, {
            onSuccess: options?.onSuccess,
            onError: options?.onError,
        });
        return data;
    }
    catch (error) {
        if (typeof options?.callback === "function")
            await options.callback(undefined, error);
        await fireenjinError({
            ...baseData,
            error,
        }, {
            onError: options?.onError,
        });
        return;
    }
}
