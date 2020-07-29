const errorMiddleware = (err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
};

export default errorMiddleware;
