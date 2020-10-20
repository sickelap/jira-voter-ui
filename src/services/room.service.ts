import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AuthService } from './auth.service';

export enum MessageType {
  JOIN = 'join',
}

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  constructor(private socket: Socket, private auth: AuthService) {
  }

  join(room: string, user: string): void {
    this.send(MessageType.JOIN, {room, user});
  }

  send(type: MessageType, message: any): void {
    this.socket.emit(type, message);
  }
}
