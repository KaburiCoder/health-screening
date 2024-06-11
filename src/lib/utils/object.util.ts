export function deleteObject(obj: any, condition: (value: any) => boolean) {
  if (typeof obj === "object") {
    for (const key in obj) {
      const inObj = obj[key];
      if (condition(inObj)) {
        delete obj[key];
      }

      if (typeof inObj === "object") {
        deleteObject(inObj, condition);
      }
    }
  }
}

export function removeEmptyValues(obj: any): any {
  const newObj: any = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      if (Array.isArray(value)) {
        const nestedObj = removeEmptyValues(value);
        newObj[key] = nestedObj;
      } else if (value && typeof value === "object") {
        const nestedObj = removeEmptyValues(value);
        if (Object.keys(nestedObj).length > 0) {
          newObj[key] = nestedObj;
        }
      } else if (value !== null && value !== undefined && value !== "") {
        newObj[key] = value;
      }
    }
  }

  return newObj;
}
