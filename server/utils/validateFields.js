const validateFields = (requiredFields, body) => {
  for (let field of requiredFields) {
    if (!body[field]) {
      return `${field} is required.`;
    }
  }
  return null;
};

module.exports = validateFields;
