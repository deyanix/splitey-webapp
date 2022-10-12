import {
	Button,
	Col,
	Form,
	Input,
	Popover,
	Row,
	Tooltip,
	Typography,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCheck,
	faCross,
	faEnvelope,
	faLock,
	faUser,
	faUserTag,
	faX,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useOutletContext } from 'react-router-dom';
import Reaptcha from 'reaptcha';
import { useTranslation } from 'react-i18next';
import { yup } from '../../validation/yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useRef } from 'react';
import { Message } from 'yup/lib/types';
import { useTheme } from '../../components/ThemeProvider/ThemeContext';
import useAppTranslation from 'src/hooks/useAppTranslation';
import { AuthenticationOutletContext } from 'src/layout/Authentication/AuthenticationLayout';

const schema = yup
	.object({
		username: yup.string().min(6).max(48).required(),
		email: yup.string().max(128).email().required(),
		password: yup.string().min(8).password().required(),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref('password')], 'validation:confirmPassword')
			.required(),
		captcha: yup.string().required('validation:captcha'),
	})
	.required();

export default function () {
	const { setWidth } = useOutletContext<AuthenticationOutletContext>();
	const { theme } = useTheme();
	const { t, i18n } = useTranslation();
	const { tm } = useAppTranslation();
	const { handleSubmit, control, formState, setValue } = useForm({
		resolver: yupResolver(schema, {
			abortEarly: false,
		}),
	});
	const { errors } = formState;

	const reaptcha = useRef<Reaptcha | null>();

	useEffect(() => {
		setWidth(480);
	}, []);

	function onSubmit(data: any): void {
		reaptcha.current?.reset();
	}

	return (
		<Form onFinish={handleSubmit(onSubmit)}>
			<Typography.Title level={3} style={{ textAlign: 'center' }}>
				{t('createAnAccount')}
			</Typography.Title>
			<Row gutter={[16, 8]}>
				<Col span={24} sm={12}>
					<Form.Item
						hasFeedback
						validateStatus={
							errors.email?.message ? 'error' : undefined
						}
						help={tm(errors.email?.message)}
					>
						<Controller
							name="email"
							control={control}
							render={({ field }) => (
								<Input
									prefix={
										<FontAwesomeIcon icon={faEnvelope} />
									}
									placeholder={t('email')}
									size="large"
									{...field}
								/>
							)}
						/>
					</Form.Item>
				</Col>
				<Col span={24} sm={12}>
					<Form.Item
						hasFeedback
						validateStatus={
							errors.username?.message ? 'error' : undefined
						}
						help={tm(errors.username?.message)}
					>
						<Controller
							name="username"
							control={control}
							render={({ field }) => (
								<Input
									prefix={<FontAwesomeIcon icon={faUser} />}
									placeholder={t('username')}
									size="large"
									{...field}
								/>
							)}
						/>
					</Form.Item>
				</Col>
				<Col span={24} sm={12}>
					<Form.Item
						hasFeedback={!!errors.password?.message}
						validateStatus={
							errors.password?.message ? 'error' : undefined
						}
						help={
							errors.password?.message
								? tm(errors.password?.message)
								: undefined
						}
					>
						<Controller
							name="password"
							control={control}
							render={({ field }) => (
								<Tooltip
									title={tm(
										'validation:passwordRequirements'
									)}
								>
									<Input.Password
										prefix={
											<FontAwesomeIcon icon={faLock} />
										}
										placeholder={t('password')}
										size="large"
										{...field}
									/>
								</Tooltip>
							)}
						/>
					</Form.Item>
				</Col>
				<Col span={24} sm={12}>
					<Form.Item
						hasFeedback
						validateStatus={
							errors.confirmPassword?.message
								? 'error'
								: undefined
						}
						help={tm(errors.confirmPassword?.message)}
					>
						<Controller
							name="confirmPassword"
							control={control}
							render={({ field }) => (
								<Input.Password
									prefix={<FontAwesomeIcon icon={faLock} />}
									placeholder={t('confirmPassword')}
									size="large"
									{...field}
								/>
							)}
						/>
					</Form.Item>
				</Col>
				<Col span={24}>
					<Reaptcha
						ref={(ref) => (reaptcha.current = ref)}
						sitekey="6LcEpQMhAAAAAMPdELHaRSG9-XlWTSbFSaEKxInT"
						theme={theme}
						hl={i18n.language}
						onVerify={(response) => setValue('captcha', response)}
					/>
					<Typography.Text type="danger">
						{tm(errors.captcha?.message)}
					</Typography.Text>
				</Col>
				<Col span={24}>
					<Button
						type="primary"
						htmlType="submit"
						style={{ width: '100%' }}
					>
						{t('signUp')}
					</Button>
					<Link to="/signin">{t('signInInstead')}</Link>
				</Col>
			</Row>
		</Form>
	);
}
