export default async function cleanFirestoreData(input) {
    const data = input;
    for (const key of Object.keys(input)) {
        const value = input[key];
        if (!value)
            continue;
        try {
            if (value?.constructor?.name === "Object") {
                data[key] = await cleanFirestoreData(value);
            }
            else if (value?.constructor?.name === "DocumentReference") {
                data[key] = { id: value.id };
            }
            else if (value?.constructor?.name === "Timestamp") {
                data[key] = value.toDate();
            }
            else if (value?.constructor?.name === "Array") {
                const cleanArray = [];
                for (const item of data[key]) {
                    cleanArray.push(await cleanFirestoreData(item));
                }
                data[key] = cleanArray;
            }
            else if (typeof value === "object" &&
                value?.constructor?.name !== "Date") {
                data[key] = await cleanFirestoreData(JSON.parse(JSON.stringify(value)));
            }
        }
        catch (err) {
            delete data[key];
        }
    }
    return JSON.parse(JSON.stringify(data));
}
