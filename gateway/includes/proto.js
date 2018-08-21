const caller = require('grpc-caller');

console.log(
  `${process.env.USER_SERVICE_IP}:${process.env.USER_SERVICE_PORT}`,
  `${process.env.PROTO_LOCATION}/user.proto`,
);

const UserRPC = caller(
  `${process.env.USER_SERVICE_IP}:${process.env.USER_SERVICE_PORT}`,
  `${process.env.PROTO_LOCATION}/user.proto`,
  'User',
);

module.exports = {
  UserRPC,
};
