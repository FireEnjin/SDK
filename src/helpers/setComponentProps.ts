export default async function setComponentProps(dataPropsMap: any, data: any) {
  let newData = data ? data : {};
  if (dataPropsMap) {
    const dataKeys = Object.keys(dataPropsMap);
    for (const key of dataKeys) {
      try {
        newData[dataPropsMap[key]] = key
          .split(".")
          .reduce((o, i) => o[i], data);
      } catch (e) {
        continue;
      }
    }
  }

  return newData;
}
