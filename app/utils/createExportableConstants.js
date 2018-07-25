const createExportableConstants = (names) => {
  return names.reduce(
    (constants, name) => (constants[name] = name, constants),
    {}
  )
};

export default createExportableConstants;
