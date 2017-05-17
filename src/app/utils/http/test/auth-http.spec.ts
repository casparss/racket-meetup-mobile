import { Http } from '@angular/http';
import { AuthHttp } from '../auth-http';
import { TestBed, inject } from '@angular/core/testing';
import {
  HttpModule,
  XHRBackend,
  ResponseOptions,
  Response,
  RequestMethod
} from '@angular/http';
import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';

describe("AuthHttp", () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        AuthHttp,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it("initialises", inject([AuthHttp], (authHttp) => {
    expect(authHttp).not.toBeUndefined();
  }));

  it("makes get, post, put, delete and successfully recieves set token in HTTP header.", inject([AuthHttp, XHRBackend], (authHttp, mockBackend) => {
    let opts = {
      headers: {}
    };

    let token = "123456";
    let url = '/hello';
    let data = {
      hello: "hello"
    };

    mockBackend.connections.subscribe((connection: any) => {
      expect(connection.request.headers.get('x-auth')).toBe(token);
    });

    authHttp.token = token;

    authHttp._get({ url, opts });
    authHttp._post({ url, data, opts });
    authHttp._put({ url, data, opts });
    authHttp._delete({ url, opts });
  }));

});
