import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'Socket.IO';
// import { MessageUpdatePayload } from "types";

const CLIENT_URI = process.env.CLIENT_URI;

const users: Record<string, string> = {};

@WebSocketGateway({
  cors: {
    origin: process.env.NODE_ENV === 'production' ? CLIENT_URI : '*', //NOTE: dont forget about it
  },
  serveClient: false,
  namespace: 'chat',
})
export class AppGateway {
  // @SubscribeMessage('message')
  // handleMessage(client: any, payload: any): string {
  //   return 'Hello world!';
  // }
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log(server);
  }

  handleConnection(client: Socket, ...args: any[]) {
    // обратите внимание на структуру объекта `handshake`
    const userName = client.handshake.query.userName as string;
    const socketId = client.id;
    users[socketId] = userName;

    // передаем информацию всем клиентам, кроме текущего
    client.broadcast.emit('log', `${userName} connected`);
  }

  // отключение
  handleDisconnect(client: Socket) {
    const socketId = client.id;
    const userName = users[socketId];
    delete users[socketId];

    client.broadcast.emit('log', `${userName} disconnected`);
  }
}
