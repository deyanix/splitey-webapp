import { Button, Checkbox, Form, Input, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

export default function () {
	const { t } = useTranslation();

	return (
		<Form initialValues={{ remember: true }}>
			<Space direction="vertical" style={{ width: '100%' }}>
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
