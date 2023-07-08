const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    const errorContent = '<html><body><h1>'+ err.message +'</h1></body></html>';
    res.status(404).send(errorContent);
  };
  
  module.exports= { notFound, errorHandler };