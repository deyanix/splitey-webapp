import { StringSchema } from 'yup';
import { Message } from 'yup/lib/types';

declare module 'yup' {
	interface StringSchema {
		minLowercase(
			length?: number,
			message?: Message<{ length: number }>
		): StringSchema;
		minUppercase(
			length?: number,
			message?: Message<{ length: number }>
		): StringSchema;
		minDigits(
			length?: number,
			message?: Message<{ length: number }>
		): StringSchema;
		minSpecialCharacters(
			length?: number,
			message?: Message<{ length: number }>
		): StringSchema;
		password(): StringSchema;
	}
}
