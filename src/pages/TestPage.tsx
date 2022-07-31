import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, Input, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';
import { yup } from '../validation/yup';

const schema = yup
	.object({
		firstName: yup.string().required(),
		age: yup.number().positive().integer().required(),
	})
	.required();

export default function () {
	const { t } = useTranslation();
	const { handleSubmit, control, formState } = useForm({
		resolver: yupResolver(schema),
	});
	const errors = formState.errors;

	const onSubmit = (data: any) => console.log(data);
	return (
		<Form onFinish={handleSubmit(onSubmit)}>
			<Form.Item
				hasFeedback
				validateStatus={errors.firstName?.message ? 'error' : undefined}
				help={String(errors.firstName?.message)}
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
				help={String(errors.age?.message)}
			>
				<Controller
					name="age"
					control={control}
					render={({ field }) => (
						<InputNumber placeholder="Age" {...field} />
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
