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

export interface UserDetailsInt {
	email: string,
	firstName: string,
	lastName: string,
	password: string,
	dob: Date,
	image: string,
	location: string
}

export interface UserInt{
	token: string,
  _id:string,
	id:string,
	details:UserDetailsInt,
	stats: {
		ranking: number,
		matchesPlayed: number
	},
  followers: {
    followingThem: Array<string>,
    followingMe: Array<string>
  }
}
