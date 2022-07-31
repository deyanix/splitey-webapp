import React from 'react';
import * as yup from 'yup';
import { Field, Formik, useFormik } from 'formik';
import { Checkbox, Form, InputNumber, Input, SubmitButton } from 'formik-antd';
import { Button } from 'antd';

const schema = yup
	.object({
		firstName: yup.string().required(),
		age: yup
			.number()
			.typeError('Not a Number')
			.positive()
			.integer()
			.required(),
	})
	.required();

function renderForm() {
	return (
		<Form>
			<Form.Item name="firstName">
				<Field name="firstName" placeholder="First Name" as={Input} />
			</Form.Item>
			<Form.Item name="age">
				<InputNumber name="age" />
			</Form.Item>
			<SubmitButton>Submit</SubmitButton>
		</Form>
	);
}

export default function () {
	return (
		<Formik
			initialValues={{ firstName: '', age: 20 }}
			validationSchema={schema}
			onSubmit={(data) => console.log(data)}
		>
			{renderForm}
		</Formik>
	);
}
