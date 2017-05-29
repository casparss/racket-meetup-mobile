import { async, TestBed, inject } from '@angular/core/testing';
import { UserSvc } from '../user.service';
import { DecHttp } from '../../../utils/http';
import { Observable } from 'rxjs';
import { ConfigSvc } from '../../config/config.service';
import { mockConfig } from '../../../modules/config/test/config.mock';
import { Transfer } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
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
import {
  DecHttpMock,
  userModel1Mock,
  userModel2Mock,
  userModel3Mock,
  userModel1Mock$,
  userModel2Mock$,
  userModel3Mock$
} from './user-service.mock';

const userSvc: UserSvc = null;
const lastConnection: any = null;

const failTest = error =>
  expect(error).toBeUndefined();

describe("User service", () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        UserSvc,
        Transfer,
        File,
        mockConfig,
        DecHttp,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it("Initialises", inject([UserSvc], userSvc => {
    expect(userSvc).not.toBeNull();
  }));

  it("userSuccess()", inject([UserSvc], userSvc => {
    const runExpectation = user =>
      expect(user).toEqual(userModel1Mock);

    userSvc.userSuccess(userModel1Mock);
    userSvc.current$.subscribe(runExpectation, failTest);

    expect(userSvc.http.token).toBe(userModel1Mock.token);
    runExpectation(userSvc.current);
  }));

  it("isFollowedBy()", inject([UserSvc], userSvc => {
    userSvc.userSuccess(userModel1Mock);
    expect(userSvc.isFollowedBy(userModel2Mock$)).toBe(true);
    expect(userSvc.isFollowedBy(userModel3Mock$)).toBe(false);
  }));

  it("doesFollow()", inject([UserSvc], userSvc => {
    userSvc.userSuccess(userModel1Mock);
    expect(userSvc.doesFollow(userModel2Mock$)).toBe(true);
    expect(userSvc.doesFollow(userModel3Mock$)).toBe(false);
  }));

  it("toggleFollow() - unfollow scenario", inject([UserSvc, XHRBackend], (userSvc, mockBackend) => {
    const mockResponse = {
      status:"success",
      data:{ isFriend:false },
      message:"Successfully unfollowing user."
    };

    mockBackend.connections.subscribe((connection: any) => {
      expect(connection.request.method).toBe(RequestMethod.Put);

      connection.mockRespond(new Response(
        new ResponseOptions({ body: mockResponse })
      ));
    });

    userSvc.userSuccess(userModel1Mock);

    userSvc.toggleFollow(userModel2Mock._id)
      .subscribe(isFriend => {
        expect(isFriend).toEqual(mockResponse.data.isFriend);
        expect(userSvc.current.followers.followingThem.length).toBe(0);
      }, failTest);
  }));

  it("toggleFollow() - follow scenario", inject([UserSvc, XHRBackend], (userSvc, mockBackend) => {
    const mockResponse = {
      status:"success",
      data: { isFriend: true },
      message:"Successfully unfollowing user."
    };

    mockBackend.connections.subscribe((connection: any) => {
      expect(connection.request.method).toBe(RequestMethod.Put);

      connection.mockRespond(new Response(
        new ResponseOptions({ body: mockResponse })
      ));
    });

    userSvc.userSuccess(userModel1Mock);

    userSvc.toggleFollow(userModel3Mock._id)
      .subscribe(isFriend => {
        expect(isFriend).toEqual(mockResponse.data.isFriend);
        expect(userSvc.current.followers.followingThem.length).toBe(2);
      }, failTest);
  }));

  it("getFollowers()", inject([UserSvc, XHRBackend], (userSvc, mockBackend) => {
    const mockResponse = {
      status: "success",
      data: {
        followingMe: ["456"],
        followingThem:["456"]
      }
    };

    mockBackend.connections.subscribe((connection: any) => {
      expect(connection.request.method).toBe(RequestMethod.Get);

      connection.mockRespond(new Response(
        new ResponseOptions({ body: mockResponse })
      ));
    });

    userSvc.getFollowers("123").subscribe(followers => {
      expect(followers).toBe(mockResponse.data);
    }, failTest);
  }));

  it("followersFactory()", inject([UserSvc, XHRBackend], (userSvc, mockBackend) => {
    const mockResponse = {
      status: "success",
      data: {
        followingMe: ["456"],
        followingThem:["789"]
      }
    };

    mockBackend.connections.subscribe((connection: any) => {
      expect(connection.request.method).toBe(RequestMethod.Get);

      connection.mockRespond(new Response(
        new ResponseOptions({ body: mockResponse })
      ));
    });

    let { following$, followers$, get } = userSvc.followersFactory("123");
    expect(following$ instanceof Observable).toBe(true);
    expect(followers$ instanceof Observable).toBe(true);

    following$.subscribe(following => {
      expect(following[0].source.getValue()).toEqual(mockResponse.data.followingThem[0]);
    }, failTest);

    followers$.subscribe(followers => {
      expect(followers[0].source.getValue()).toEqual(mockResponse.data.followingMe[0]);
    }, failTest);

    get("456");
  }));



});
