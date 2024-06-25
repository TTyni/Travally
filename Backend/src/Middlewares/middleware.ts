const unknownEndpoint = (_req, res: any) => {
  res.status(404).send({ error: "nothing at all" });
};

const logger = (
  req: { method: any; url: string; body: any },
  _res: any,
  next: () => void
) => {
  const timestamp = new Date().toISOString();
  console.log(timestamp, req.method, decodeURI(req.url));
  console.log(req.body);

  next();
};

const errorHandler = (err: any, _req, res: any, _next) => {
  console.log("Middleware Error Hadnling");
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

export { logger, unknownEndpoint, errorHandler };
