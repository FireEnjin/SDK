export default async function fireenjinError(input, options) {
    const detail = {
        event: input?.event,
        error: input?.error,
        name: input?.name,
        endpoint: input?.endpoint,
        bubbles: !!input?.bubbles,
        cancelable: !!input?.cancelable,
        composed: !!input?.composed,
        cached: !!input?.cached,
    };
    if (typeof options?.onError === "function")
        options.onError(detail);
    const el = input?.event?.target ||
        input?.event?.detail?.target ||
        input?.event?.detail?.event?.target ||
        document;
    el.dispatchEvent(new CustomEvent("fireenjinError", {
        detail,
        bubbles: !!input?.bubbles,
        cancelable: !!input?.cancelable,
        composed: !!input?.composed,
    }));
}