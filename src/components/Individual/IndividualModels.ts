export interface Individual {
	id: number;
	firstName: string;
	lastName: string;
	username?: string | null;
	type: IndividualType;
}

export enum IndividualType {
	EXTERNAL_FRIEND = 'EXTERNAL_FRIEND',
	USER = 'USER',
}
