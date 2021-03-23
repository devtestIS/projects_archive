const checkout = (errorData, callback) => {
  const errors = Object.entries(errorData).map(([key, value]) => {
    return {
      field: key,
      message: Array.isArray(value) ? value.join() : value,
    };
  });
  callback(errors);
};

export default checkout;
