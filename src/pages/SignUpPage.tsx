import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCheck,
	faCross,
	faEnvelope,
	faLock,
	faUser,
	faX,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Reaptcha from 'reaptcha';
import { ThemeContext } from '../components/ThemeProvider/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { yup } from '../validation/yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Message } from 'yup/lib/types';

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
	const { t, i18n } = useTranslation();
	const { handleSubmit, control, formState, setValue } = useForm({
		resolver: yupResolver(schema, {
			abortEarly: false,
		}),
	});
	const { errors, touchedFields } = formState;

	function onSubmit(data: any): void {}
	console.log(formState);

	function tMessage(message: Message | undefined): string | undefined {
		if (!message) {
			return undefined;
		}

		if (typeof message === 'string') {
			return t(message);
		}
		if (typeof message === 'object') {
			return t(message.key as string, message.options as object);
		}
		console.error('unsupported message', message);
	}

	return (
		<Form onFinish={handleSubmit(onSubmit)} style={{ maxWidth: '576px' }}>
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
						help={tMessage(errors.email?.message)}
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
						help={tMessage(errors.username?.message)}
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
						hasFeedback
						validateStatus={
							errors.password?.message ? 'error' : undefined
						}
						help={
							errors.password?.message || touchedFields.password
								? tMessage(errors.password?.message)
								: 'Użyj co najmniej 8 znaków, w tym małych i wielkich liter, cyfr oraz symboli'
						}
					>
						<Controller
							name="password"
							control={control}
							render={({ field }) => (
								<Input.Password
									prefix={<FontAwesomeIcon icon={faLock} />}
									placeholder={t('password')}
									size="large"
									{...field}
								/>
							)}
						/>
					</Form.Item>
					<Row style={{ display: 'none' }}>
						<Col span={24}>Hasło musi spełniać poniższe reguły</Col>
						<Col span={24}>
							<Typography.Text type="danger">
								<div
									style={{
										width: 20,
										display: 'inline-block',
									}}
								>
									<FontAwesomeIcon icon={faX} />
								</div>
								Co najmniej 8 wszystkich znaków
							</Typography.Text>
						</Col>
						<Col span={24}>
							<Typography.Text type="danger">
								<div
									style={{
										width: 20,
										display: 'inline-block',
									}}
								>
									<FontAwesomeIcon icon={faX} />
								</div>
								Co najmniej 1 mała litera
							</Typography.Text>
						</Col>
						<Col span={24}>
							<Typography.Text type="success">
								<div
									style={{
										width: 20,
										display: 'inline-block',
									}}
								>
									<FontAwesomeIcon icon={faCheck} />
								</div>
								Co najmniej 1 wielka litera
							</Typography.Text>
						</Col>
						<Col span={24}>
							<Typography.Text type="danger">
								<div
									style={{
										width: 20,
										display: 'inline-block',
									}}
								>
									<FontAwesomeIcon icon={faX} />
								</div>
								Co najmniej 1 cyfra
							</Typography.Text>
						</Col>
						<Col span={24}>
							<Typography.Text type="success">
								<div
									style={{
										width: 20,
										display: 'inline-block',
									}}
								>
									<FontAwesomeIcon icon={faCheck} />
								</div>
								Co najmniej 1 znak specjalny
							</Typography.Text>
						</Col>
					</Row>
				</Col>
				<Col span={24} sm={12}>
					<Form.Item
						hasFeedback
						validateStatus={
							errors.confirmPassword?.message
								? 'error'
								: undefined
						}
						help={tMessage(errors.confirmPassword?.message)}
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
					<ThemeContext.Consumer>
						{({ theme }) => (
							<Reaptcha
								sitekey="6LcEpQMhAAAAAMPdELHaRSG9-XlWTSbFSaEKxInT"
								theme={theme}
								hl={i18n.language}
								onVerify={(response) =>
									setValue('captcha', response)
								}
							/>
						)}
					</ThemeContext.Consumer>
					<Typography.Text type="danger">
						{tMessage(errors.captcha?.message)}
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
