export interface GameInt {
	venue: {
		id: number,
		name: string
	},
	players: {
		player1: {
			id: number,
			name: string,
			img: string
		},
		player2: {
			id: number,
			name: string,
			img: string
		}
	},
	date: Date
}
