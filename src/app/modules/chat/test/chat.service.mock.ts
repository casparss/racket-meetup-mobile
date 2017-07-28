import { on, trigger, off } from 'simple-pub-sub';

export class MockWsSvc {
  public socket = {
    on: on,
    emit: trigger,
    off: off
  }
}

export class UserSvcMock {
  public current = {
    _id: "123456"
  }
}

export let messages = [
  {
    _id: "123456",
    name: "Cas",
    message: "Hello i am a messages.",
    img: "/img",
    createdAt: new Date(123)
  },
  {
    _id: "456789",
    name: "Cas",
    message: "Hello i am a messages.",
    img: "/img",
    createdAt: new Date(1234)
  }
];
