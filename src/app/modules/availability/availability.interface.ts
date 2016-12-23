interface DayObj{
	v: boolean
}

export interface AvailabilityModel {
	morning: Array<DayObj>,
	afternoon: Array<DayObj>,
	evening: Array<DayObj>
}

export interface Service{
	model: AvailabilityModel,
	inFlight$: any
}
