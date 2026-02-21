const success = (res, data = null, message = "OK", status = 200) => {
  return res.status(status).json({
    success: true,
    message,
    data
  });
};

const error = (res, message = "Error", status = 500) => {
  return res.status(status).json({
    success: false,
    message,
    data: null
  });
};

module.exports = { success, error };