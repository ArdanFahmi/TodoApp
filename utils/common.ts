export const isEmptyString = (text: string) => {
  if (text === undefined || text === "" || text === null) {
    return true;
  }
  return false;
};