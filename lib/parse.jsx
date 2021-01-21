const parse = (data, name) => {
  console.log("Data for "+name);
  console.log(data);
  if (!data) {
    console.warn("Empty data for "+name+":", data);
    return undefined;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    console.warn("Error parsing "+name, data, e);
    return undefined;
  }
};

export default parse;
