import { Button, Typography, Input, Space, Form, Checkbox } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Reaptcha from 'reaptcha';
import { ThemeContext } from '../components/ThemeProvider/ThemeProvider';
import { useTranslation } from 'react-i18next';

export default function () {
	const { t, i18n } = useTranslation();
	return (
		<Form>
			<Typography.Title level={3} style={{ textAlign: 'center' }}>
				{t('createAnAccount')}
			</Typography.Title>
			<Form.Item
				name="email"
				rules={[
					{
						required: true,
						message: 'Please input your Username!',
					},
				]}
			>
				<Input
					prefix={<FontAwesomeIcon icon={faEnvelope} />}
					placeholder={t('email')}
					size="large"
				/>
			</Form.Item>
			<Form.Item
				name="username"
				rules={[
					{
						required: true,
						message: 'Please input your Username!',
					},
				]}
			>
				<Input
					prefix={<FontAwesomeIcon icon={faUser} />}
					placeholder={t('username')}
					size="large"
				/>
			</Form.Item>
			<Form.Item
				name="password"
				rules={[
					{
						required: true,
						message: 'Please input your Password!',
					},
				]}
			>
				<Input.Password
					prefix={<FontAwesomeIcon icon={faLock} />}
					placeholder={t('password')}
					size="large"
				/>
			</Form.Item>
			<Form.Item
				name="confirm_password"
				rules={[
					{
						required: true,
						message: 'Please input your Password!',
					},
				]}
			>
				<Input.Password
					prefix={<FontAwesomeIcon icon={faLock} />}
					placeholder={t('confirmPassword')}
					size="large"
				/>
			</Form.Item>

			<Form.Item
				name="captcha"
				noStyle
				rules={[
					{
						required: true,
						message: 'Please input your Password!',
					},
				]}
			>
				<ThemeContext.Consumer>
					{({ theme }) => (
						<Reaptcha
							sitekey="6LcEpQMhAAAAAMPdELHaRSG9-XlWTSbFSaEKxInT"
							theme={theme}
							hl={i18n.language}
						/>
					)}
				</ThemeContext.Consumer>
			</Form.Item>

			<Form.Item noStyle>
				<Button
					type="primary"
					htmlType="submit"
					style={{ width: '100%' }}
				>
					{t('signUp')}
				</Button>
				<Link to="/signin">{t('signInInstead')}</Link>
			</Form.Item>
		</Form>
	);
}
