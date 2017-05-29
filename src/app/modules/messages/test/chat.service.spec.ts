import { async, TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { ChatSvc } from '../chat.service';
import { WsSvc }  from '../../web-sockets-service/'
import { DecHttp } from '../../../utils/http';
import { UserSvc } from '../../user-service';
import { trigger, on } from 'simple-pub-sub';
import { mockConfig } from '../../../modules/config/test/config.mock';
import {
  MockWsSvc,
  UserSvcMock,
  messages
} from './chat.service.mock';

let mockChatId = "987654";

describe("Chat service", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ChatSvc,
        DecHttp,
        mockConfig,
        { provide: WsSvc, useClass: MockWsSvc },
        { provide: UserSvc, useClass: UserSvcMock }
      ]
    });
  });

  it("Initialises", inject([ChatSvc], chatSvc => {
    expect(chatSvc).not.toBeNull();
  }));

  it("sends a message", inject([ChatSvc], chatSvc => {
    let mockMessage = "Hello there I am a message";
    on("send:message", ({message}) => {
      expect(message).toBe(mockMessage);
    });

    chatSvc.sendMessage(mockMessage);
  }));

  it("getMessageHistory()", inject([ChatSvc], chatSvc => {
    on("request:messagehistory", (chatId) => {
      expect(chatId).toBe(mockChatId);
    });

    chatSvc.init(mockChatId);
  }));

  it("updateMessageHistory()", inject([ChatSvc], chatSvc => {

    chatSvc.init(mockChatId);

    chatSvc.chatMessages$.subscribe(chat => {
      expect(chat[0]._id).toBe(messages[0]._id);
      expect(chat[0]._id).toBe(messages[0]._id);
      expect(chat[1].name).toBe(messages[1].name);
      expect(chat[1].name).toBe(messages[1].name);
    });

    trigger("messagehistory", messages);
  }));

  it("newMessageRecieved() updateChat()", inject([ChatSvc], chatSvc => {
    chatSvc.init(mockChatId);

    chatSvc.chatMessages$.subscribe(chat => {
      expect(chat[0]._id).toBe(messages[0]._id);
    });

    trigger("message", messages[0]);
  }));
});
