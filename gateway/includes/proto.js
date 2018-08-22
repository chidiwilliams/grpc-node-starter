const caller = require('grpc-caller');

const UserRPC = caller(
  `${process.env.USER_SERVICE_IP}:${process.env.USER_SERVICE_PORT}`,
  `${process.env.PROTO_LOCATION}/user.proto`,
  'User',
);

console.log(
  `Listening to UserRPC at ${process.env.USER_SERVICE_IP}:${process.env.USER_SERVICE_PORT}`,
  `${process.env.PROTO_LOCATION}/user.proto`,
);

module.exports = {
  UserRPC,
};
