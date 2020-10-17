/**
 * Checks if the data passed in matches the schema expected by the provided storeName. This helps us
 * avoid putting dodgy data into the database. It should only really catch developer error.
 * @param {string} storeName
 * @param {any} data
 */
export const isValid = (storeName, data) => {
  if (storeName === "project") return isValidProject(data);

  return true;
};

const isValidProject = (data) => {
  //for now we just check it has relevant properties, but it would be good to check the datatype of those
  //properties
  let keys = [];

  const objectKeys = Object.keys(data);

  keys.push(objectKeys.includes("slug"));
  keys.push(objectKeys.includes("name"));
  keys.push(objectKeys.includes("color"));
  keys.push(objectKeys.includes("blocks"));

  return keysAreValid(keys);
};

const keysAreValid = (keys) => {
  for (const key of keys) {
    if (!key) {
      return false;
    }
  }

  return true;
};
