const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
require('dotenv').config();
const path = require('path');
// const {
//   getAllUsers,
//   getUserByID,
//   deleteUserByID,
//   createUser,
//   updateUser,
// } = require('./definitions/users');
// const {
//   authenticateUserWithEmailAndPassword,
//   authenticateUserWithPhoneAndPassword,
// } = require('./definitions/auth');

const PROTO_PATH = path.resolve(__dirname, './proto/user.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const userPackage = grpc.loadPackageDefinition(packageDefinition).User;

(function main() {
  const server = new grpc.Server();
  // server.addService(casePackage.User.service, {
  // Users
  // getAllUsers,
  // getUserByID,
  // deleteUserByID,
  // createUser,
  // updateUser,
  // Auth
  // authenticateUserWithEmailAndPassword,
  // authenticateUserWithPhoneAndPassword,
  // });
  server.bind(
    `${process.env.SERVICE_IP}:${process.env.SERVICE_PORT}`,
    grpc.ServerCredentials.createInsecure(),
  );
  server.start();
  console.log(
    `GRPC Node service started successfully on ${process.env.SERVICE_IP}:${
      process.env.SERVICE_PORT
    }`,
  );
}());
