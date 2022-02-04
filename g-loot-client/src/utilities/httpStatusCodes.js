// 404 --> 400
// 201 --> 200
// 305 --> 300
// You get the idea
const formatHttpStatusCode = (statusCode) => {
  const temp = Math.floor(statusCode/100);
  return temp*100;
}

export {formatHttpStatusCode};
