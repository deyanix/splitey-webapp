import * as yup from 'yup';
import { isNil } from 'lodash';
import { Message } from 'yup/lib/types';

yup.setLocale({
	mixed: {
		default: 'validation:invalid',
		required: 'validation:required',
	},
	string: {
		email: 'validation:email',
		min: ({ min }) => ({
			key: 'validation:minLength',
			options: { count: min },
		}),
		max: ({ max }) => ({
			key: 'validation:minLength',
			options: { count: max },
		}),
	},
});

yup.addMethod(
	yup.string,
	'minLowercase',
	function (length: number = 1, message?: Message) {
		return this.test({
			name: 'minLowercase',
			exclusive: true,
			message: message ?? {
				key: 'validation:minLowercase',
				options: { count: length },
			},
			params: { length },
			test(value) {
				return (
					isNil(value) ||
					(value.match(/\p{Ll}/gu) || []).length >= length
				);
			},
		});
	}
);

yup.addMethod(
	yup.string,
	'minUppercase',
	function (length: number = 1, message?: Message) {
		return this.test({
			name: 'minUppercase',
			exclusive: true,
			message: message ?? {
				key: 'validation:minUppercase',
				options: { count: length },
			},
			params: { length },
			test(value) {
				return (
					isNil(value) ||
					(value.match(/\p{Lu}/gu) || []).length >= length
				);
			},
		});
	}
);

yup.addMethod(
	yup.string,
	'minDigits',
	function (length: number = 1, message?: Message) {
		return this.test({
			name: 'minDigits',
			exclusive: true,
			message: message ?? {
				key: 'validation:minDigits',
				options: { count: length },
			},
			params: { length },
			test(value) {
				return (
					isNil(value) || (value.match(/\d/g) || []).length >= length
				);
			},
		});
	}
);

yup.addMethod(
	yup.string,
	'minDigits',
	function (length: number = 1, message?: Message) {
		return this.test({
			name: 'minDigits',
			exclusive: true,
			message: message ?? {
				key: 'validation:minDigits',
				options: { count: length },
			},
			params: { length },
			test(value) {
				return (
					isNil(value) || (value.match(/\d/g) || []).length >= length
				);
			},
		});
	}
);

yup.addMethod(
	yup.string,
	'minSpecialCharacters',
	function (length: number = 1, message?: Message) {
		return this.test({
			name: 'minSpecialCharacters',
			exclusive: true,
			message: message ?? {
				key: 'validation:minSpecialCharacters',
				options: { count: length },
			},
			params: { length },
			test(value) {
				return (
					isNil(value) ||
					(
						value.match(
							/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g
						) || []
					).length >= length
				);
			},
		});
	}
);

yup.addMethod(yup.string, 'password', function () {
	return this.min(8)
		.minLowercase(1)
		.minUppercase(1)
		.minDigits(1)
		.minSpecialCharacters(1);
});

export { yup };
