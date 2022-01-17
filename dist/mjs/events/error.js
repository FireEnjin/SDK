export default async function fireenjinError(input, options) {
    const detail = {
        event: input?.event,
        target: input?.target || input?.event?.target,
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
    const el = detail?.target || document;
    el.dispatchEvent(new CustomEvent("fireenjinError", {
        detail,
        bubbles: !!input?.bubbles,
        cancelable: !!input?.cancelable,
        composed: !!input?.composed,
    }));
}
