import { Button, Checkbox, Form, Input, Space, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useCurrentUser } from 'src/components/CurrentUserContext/CurrentUserContext';

export interface SignInForm {
	login: string;
	password: string;
	rememberMe: boolean;
}

export default function () {
	const { t } = useTranslation();
	const { login } = useCurrentUser();
	const navigate = useNavigate();

	const [loading, setLoading] = useState<boolean>(false);

	const onSubmit = async (data: SignInForm): Promise<void> => {
		setLoading(true);
		try {
			await login(data.login, data.password, data.rememberMe);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Form
			initialValues={{ remember: true }}
			onFinish={onSubmit}
			style={{ width: '320px' }}
		>
			<Space direction="vertical" style={{ width: '100%' }}>
				<Form.Item
					name="login"
					rules={[
						{
							required: true,
							message: 'Please input your login!',
						},
					]}
				>
					<Input
						prefix={<FontAwesomeIcon icon={faUser} />}
						placeholder={t('usernameOrEmail')}
						size="large"
						autoComplete="off"
						disabled={loading}
					/>
				</Form.Item>
				<Form.Item
					name="password"
					rules={[
						{
							required: true,
							message: t(''),
						},
					]}
				>
					<Input.Password
						prefix={<FontAwesomeIcon icon={faLock} />}
						placeholder={t('password')}
						size="large"
						autoComplete="off"
						disabled={loading}
					/>
				</Form.Item>
			</Space>
			<Form.Item>
				<Form.Item name="remember" valuePropName="checked" noStyle>
					<Checkbox>{t('rememberMe')}</Checkbox>
				</Form.Item>

				<Link to="/reset-password" style={{ float: 'right' }}>
					{t('forgotPassword')}
				</Link>
			</Form.Item>
			<Form.Item>
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
