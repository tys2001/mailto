const clone = <T>(value: T) => {
  return JSON.parse(JSON.stringify(value)) as T;
};

export default {
  clone,
};
