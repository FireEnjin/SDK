import setComponentProps from "../helpers/setComponentProps";
export default async function fireenjinSuccess(input, options) {
    const detail = {
        event: input?.event,
        data: await setComponentProps(input?.dataPropsMap, input?.data),
        target: input?.event?.target,
        name: input?.name,
        endpoint: input?.endpoint,
    };
    if (typeof options?.onSuccess === "function")
        options.onSuccess(detail);
    const el = input?.event?.target ||
        input?.event?.detail?.target ||
        input?.event?.detail?.event?.target ||
        document;
    el.dispatchEvent(new CustomEvent("fireenjinSuccess", {
        detail,
        bubbles: !!input?.bubbles,
        cancelable: !!input?.cancelable,
        composed: !!input?.composed,
    }));
}
