export interface UserLoginInt {
	email:string,
	password:string
}

export interface UserSignupInt {
	email: string,
	password:string,
	firstName: string,
	lastName: string
}

export interface UserInt{
  _id:string,
	id:string,
	details:{
		email: string,
		password: string,
		firstName: string,
		lastName: string,
		dob: Date,
		image: string,
		location: string,
	},
	stats: {
		ranking: number,
		matchesPlayed: number
	},
  followers: {
    followingThem: Array<string>,
    followingMe: Array<string>
  }
}
