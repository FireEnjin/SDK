import setComponentProps from "../helpers/setComponentProps";
export default async function fireenjinSubscription(input, options) {
    const detail = {
        event: input?.event,
        target: input?.target || input?.event?.target,
        data: input?.data || null,
        name: input?.name,
        endpoint: input?.endpoint,
        bubbles: !!input?.bubbles,
        cancelable: !!input?.cancelable,
        composed: !!input?.composed,
        query: input?.query || input?.event?.detail?.query,
        params: input?.params || input?.event?.detail?.params,
        signalKey: input?.signalKey || input?.event?.detail?.signalKey,
    };
    if (input?.dataPropsMap) {
        try {
            detail.data = await setComponentProps(input?.dataPropsMap, input?.data);
        }
        catch {
            console.log("Error setting data props");
            if (typeof options?.onError === "function")
                options.onError(detail);
        }
    }
    const el = detail?.target || document;
    el.dispatchEvent(new CustomEvent("fireenjinSubscription", {
        detail,
        bubbles: !!input?.bubbles,
        cancelable: !!input?.cancelable,
        composed: !!input?.composed,
    }));
}
