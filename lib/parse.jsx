const parse = data => {
  if (!data) {
    return undefined;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    console.warn("Error parsing", data, e);
    return undefined;
  }
};

export default parse;
