import { Http } from '@angular/http';
import { AuthHttp } from '../auth-http';
import { DecHttp } from '../decorated-http';
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

describe("Decorated HTTP", () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        AuthHttp,
        DecHttp,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it("initialises", inject([DecHttp], (decHttp) => {
    expect(decHttp).not.toBeUndefined();
  }));

  it("makes request with message property and correctly emits the message in onMessage", inject([DecHttp, XHRBackend], (decHttp, mockBackend) => {
    let body = {
      message: "Hello this is a message."
    };

    mockBackend.connections.subscribe((connection: any) => {
      connection.mockRespond(new Response(
        new ResponseOptions({ body })
      ));
    });

    decHttp.onMessage.subscribe(message => {
      expect(message).toBe(body.message);
    });

    decHttp.get({ url: '/something' })
      .subscribe(data => {});
  }));

  it("extractData()", inject([DecHttp, XHRBackend], (decHttp, mockBackend) => {
    let body = {
      data: { hello: "Hello this is a message." }
    };

    mockBackend.connections.subscribe((connection: any) => {
      connection.mockRespond(new Response(
        new ResponseOptions({ body })
      ));
    });

    decHttp.get({ url: '/something' })
      .subscribe(data => {
        expect(data).toBe(body.data);
      });
  }));

});
