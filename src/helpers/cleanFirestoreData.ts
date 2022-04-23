export default function cleanFirestoreData(input: any) {
  const toPlainFirestoreObject = (o: any): any => {
    if (
      o &&
      typeof o === "object" &&
      !Array.isArray(o) &&
      !isFirestoreTimestamp(o)
    ) {
      return {
        ...Object.keys(o).reduce(
          (a: any, c: any) => ((a[c] = toPlainFirestoreObject(o[c])), a),
          {}
        ),
      };
    }
    return o;
  };

  function isFirestoreTimestamp(o: any): boolean {
    if (
      o &&
      Object.getPrototypeOf(o).toMillis &&
      Object.getPrototypeOf(o).constructor.name === "Timestamp"
    ) {
      return true;
    }
    return false;
  }

  return toPlainFirestoreObject(input);
}
