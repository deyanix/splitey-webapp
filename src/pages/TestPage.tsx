import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Form, Input } from 'antd';

const schema = yup
	.object({
		firstName: yup.string().required(),
		age: yup.number().positive().integer().required(),
	})
	.required();

export default function () {
	const { handleSubmit, control, formState } = useForm({
		shouldFocusError: true,
		resolver: yupResolver(schema),
	});
	const { errors } = formState;

	const onSubmit = (data: any) => console.log(data);
	return (
		<Form onFinish={handleSubmit(onSubmit)}>
			<Form.Item
				hasFeedback
				validateStatus={errors.firstName?.message ? 'error' : undefined}
				help={errors.firstName?.message}
			>
				<Controller
					name="firstName"
					control={control}
					render={({ field }) => (
						<Input
							placeholder="Username"
							autoComplete="off"
							{...field}
						/>
					)}
				/>
			</Form.Item>

			<Form.Item
				hasFeedback
				validateStatus={!!errors.age ? 'error' : ''}
				help={errors.age?.message}
			>
				<Controller
					name="age"
					control={control}
					render={({ field }) => (
						<Input placeholder="Age" {...field} />
					)}
				/>
			</Form.Item>

			<Form.Item noStyle>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
}
