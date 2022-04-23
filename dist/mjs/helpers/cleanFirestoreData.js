export default function cleanFirestoreData(input) {
    const toPlainFirestoreObject = (o) => {
        if (o &&
            typeof o === "object" &&
            !Array.isArray(o) &&
            !isFirestoreTimestamp(o)) {
            return {
                ...Object.keys(o).reduce((a, c) => ((a[c] = toPlainFirestoreObject(o[c])), a), {}),
            };
        }
        return o;
    };
    function isFirestoreTimestamp(o) {
        if (o &&
            Object.getPrototypeOf(o).toMillis &&
            Object.getPrototypeOf(o).constructor.name === "Timestamp") {
            return true;
        }
        return false;
    }
    return toPlainFirestoreObject(input);
}
