import fireenjinError from "../events/error";
import fireenjinSuccess from "../events/success";
export default async function tryOrFail(fn, options) {
    const baseData = {
        cached: !!options?.cached,
        event: options?.event?.detail?.event,
        name: options?.name,
        endpoint: options?.endpoint,
    };
    try {
        const data = await fn();
        await fireenjinSuccess({ ...baseData, data }, {
            onSuccess: options?.onSuccess,
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
