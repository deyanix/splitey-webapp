import { Button, Checkbox, Form, Input, Space, Typography } from 'antd';
import { Link, useOutletContext } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { useCurrentUser } from 'src/components/CurrentUserContext/CurrentUserContext';
import { yup } from 'src/validation/yup';
import { AuthenticationOutletContext } from 'src/layout/Authentication/AuthenticationLayout';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useAppTranslation from 'src/hooks/useAppTranslation';

export interface SignInForm {
	login: string;
	password: string;
	rememberMe: boolean;
}

const schema = yup
	.object({
		login: yup.string().required(),
		password: yup.string().required(),
		rememberMe: yup.boolean(),
	})
	.required();

export default function () {
	const { setWidth } = useOutletContext<AuthenticationOutletContext>();
	const { t } = useTranslation();
	const { tm } = useAppTranslation();
	const { login } = useCurrentUser();
	const { handleSubmit, control, formState, setValue } = useForm<SignInForm>({
		resolver: yupResolver(schema, {
			abortEarly: false,
		}),
	});
	const { errors } = formState;

	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setWidth(320);
	}, []);

	const onSubmit = async (data: SignInForm): Promise<void> => {
		setLoading(true);
		try {
			await login(data.login, data.password, data.rememberMe);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Form onFinish={handleSubmit(onSubmit)}>
			<Space direction="vertical" style={{ width: '100%' }}>
				<Form.Item
					hasFeedback
					validateStatus={errors.login?.message ? 'error' : undefined}
					help={tm(errors.login?.message)}
				>
					<Controller
						name="login"
						control={control}
						render={({ field }) => (
							<Input
								prefix={<FontAwesomeIcon icon={faUser} />}
								placeholder={t('usernameOrEmail')}
								size="large"
								autoComplete="off"
								{...field}
							/>
						)}
					/>
				</Form.Item>
				<Form.Item
					hasFeedback
					validateStatus={
						errors.password?.message ? 'error' : undefined
					}
					help={tm(errors.password?.message)}
				>
					<Controller
						name="password"
						control={control}
						render={({ field }) => (
							<Input.Password
								prefix={<FontAwesomeIcon icon={faLock} />}
								placeholder={t('password')}
								size="large"
								autoComplete="off"
								{...field}
							/>
						)}
					/>
				</Form.Item>
			</Space>
			<Form.Item>
				<Form.Item name="remember" valuePropName="value" noStyle>
					<Controller
						name="rememberMe"
						control={control}
						render={({ field }) => (
							<Checkbox checked={field.value} {...field}>
								{t('rememberMe')}
							</Checkbox>
						)}
					/>
				</Form.Item>

				<Link to="/reset-password" style={{ float: 'right' }}>
					{t('forgotPassword')}
				</Link>
			</Form.Item>
			<Form.Item noStyle>
				<Button
					type="primary"
					htmlType="submit"
					style={{ width: '100%' }}
					loading={loading}
				>
					{t('signIn')}
				</Button>
				<Typography.Text type="secondary">
					{t('needAnAccount')}&nbsp;
				</Typography.Text>
				<Link to="/signup">{t('signUpNow')}</Link>
			</Form.Item>
		</Form>
	);
}
