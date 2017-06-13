import { BehaviorSubject } from 'rxjs';
export class DecHttpMock {

}

const tokenUser1Id = "123";
const tokenUser2Id = "456";
const tokenUser3Id = "789";

export const userModel1Mock = {
  _id: tokenUser1Id,

  details: {
    fullName: 'Bob Hoskins',
    firstName: 'Bob',
    lastName: 'Hoskins',
    email: 'bob.hoskins@email.com',
    dob: new Date(),
    image: "path",
    location:"location"
  },

  followers: {
    followingMe: [tokenUser2Id],
    followingThem: [tokenUser2Id]
  },

  password: 'a4c3988b924c7a1adb70eb', //bobbingtons

  token: tokenUser1Id
};

export const userModel2Mock = {
  _id: tokenUser2Id,

  details: {
    fullName: 'Davey Jobson',
    firstName: 'Davey',
    lastName: 'Jobson',
    email: 'davey.jobson@email.com',
    dob: new Date(),
    image: "path",
    location:"location"
  },

  followers: {
    followingMe: [tokenUser1Id],
    followingThem: [tokenUser1Id]
  },

  password: 'a4c3988b924c7a1adb70eb', //bobbingtons

  token: tokenUser2Id
};

export const userModel3Mock = {
  _id: tokenUser3Id,

  details: {
    fullName: 'Ryan Smith',
    firstName: 'Ryan',
    lastName: 'Smith',
    email: 'ryan.smith@email.com',
    dob: new Date(),
    image: "path",
    location:"location"
  },

  followers: {
    followingMe: [],
    followingThem: []
  },

  password: 'a4c3988b924c7a1adb70eb', //bobbingtons

  token: tokenUser3Id
};

export const userModel1Mock$ = new BehaviorSubject(userModel1Mock).asObservable();
export const userModel2Mock$ = new BehaviorSubject(userModel2Mock).asObservable();
export const userModel3Mock$ = new BehaviorSubject(userModel3Mock).asObservable();
