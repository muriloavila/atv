import * as protoLoader from '@grpc/proto-loader';
import * as grpc from 'grpc';
import path from 'path';
import implementation from './implementations/implementation';

const userPackageDefinition = protoLoader.loadSync(
    path.resolve(__dirname, 'pb', 'User.proto'),
    {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true  
    }
)

const user_proto = grpc.loadPackageDefinition(userPackageDefinition);

const server = new grpc.Server();

server.addService(user_proto.UserService.service, implementation);

server.bind('0.0.0.0:3002', grpc.ServerCredentials.createInsecure());

server.start();