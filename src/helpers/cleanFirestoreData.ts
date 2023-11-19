export default function cleanFirestoreData(
  input: any,
  keepDocumentReferenceId = false,
  removeDates = false
) {
  const data = typeof input === "object" ? { ...input } : input;
  for (const key of Object.keys(input)) {
    const value = input[key];
    if (!value) continue;
    try {
      if (typeof value?.firestore === "object") {
        keepDocumentReferenceId
          ? (data[key] = { id: value.id })
          : delete data[key];
      } else if (removeDates && typeof value?.toISOString === "function") {
        data[key] = new Date().toISOString();
      } else if (typeof value?.toDate === "function") {
        data[key] = value.toDate();
        if (removeDates) data[key] = data[key].toISOString();
      } else if (value?.constructor?.name === "Array") {
        const cleanArray: any[] = [];
        for (const item of data[key]) {
          cleanArray.push(cleanFirestoreData(item));
        }
        data[key] = cleanArray;
      } else if (value?.constructor?.name === "Object") {
        data[key] = cleanFirestoreData(value);
      }
    } catch (err) {
      delete data[key];
    }
  }

  return JSON.parse(JSON.stringify(data));
}
