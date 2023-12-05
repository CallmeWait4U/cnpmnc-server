// socket/socket.gateway.ts
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway( {
  cors: {
    origin: '*',
  },
})
export class SocketGateway {
  @WebSocketServer() server: Server;
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }
  init(data) {
    this.server?.emit('init', { data });
  }
  createLeave(data) {
    this.server?.emit('create', { data });
  }
  handleRequest(data) {
    console.log('callHandle');
    this.server?.emit('handle', { data });
  }
}
