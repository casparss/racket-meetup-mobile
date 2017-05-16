import { async, TestBed, inject } from '@angular/core/testing';
import { UserSvc } from '../user.service';
import { DecHttp } from '../../../utils/http';
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
  userModel3Mock
} from './user-service.mock';

const userSvc: UserSvc = null;
const lastConnection: any = null;

describe("User service", () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        UserSvc,
        DecHttp,
        //{ provide: DecHttp, useClass: DecHttpMock },
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

    const failTest = error =>
      expect(error).toBeUndefined();

    userSvc.userSuccess(userModel1Mock);
    userSvc.current$.subscribe(runExpectation, failTest);

    expect(userSvc.http.token).toBe(userModel1Mock.token);
    runExpectation(userSvc.current);
  }));

  it("isFollowedBy()", inject([UserSvc], userSvc => {
    userSvc.userSuccess(userModel1Mock);
    expect(userSvc.isFollowedBy(userModel2Mock)).toBe(true);
    expect(userSvc.isFollowedBy(userModel3Mock)).toBe(false);
  }));

  it("doesFollow()", inject([UserSvc], userSvc => {
    userSvc.userSuccess(userModel1Mock);
    expect(userSvc.doesFollow(userModel2Mock)).toBe(true);
    expect(userSvc.doesFollow(userModel3Mock)).toBe(false);
  }));

  it("toggleFollow()", inject([UserSvc, XHRBackend], (userSvc, mockBackend) => {
    const mockResponse = {status:"success",data:{isFriend:false},message:"Successfully following user."};

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
      });
  }));

  it("getFollowers()", inject([UserSvc], userSvc => {

  }));

  it("followersFactory()", inject([UserSvc], userSvc => {

  }));



});
