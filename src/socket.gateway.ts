// socket/socket.gateway.ts
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer() server: Server;
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }
  // Phương thức để gửi thông điệp đến tất cả các client
  sendToAll() {
    // Sử dụng this.server.emit để gửi thông điệp đến tất cả các client
    this.server.emit('connect', { title: 'Xin chào', status: 'success' });
  }

  // Các phương thức và sự kiện khác có thể được định nghĩa ở đây
}
