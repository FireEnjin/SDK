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
    document.body.dispatchEvent(new CustomEvent("fireenjinSuccess", {
        detail,
    }));
}
