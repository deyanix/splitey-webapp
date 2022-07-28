import { Button, Checkbox, Form, Input, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';

export default function () {
	return (
		<Form initialValues={{ remember: true }}>
			<Space direction="vertical" style={{ width: '100%' }}>
				<Form.Item
					name="username"
					noStyle
					rules={[
						{
							required: true,
							message: 'Please input your Username!',
						},
					]}
				>
					<Input
						prefix={<FontAwesomeIcon icon={faUser} />}
						placeholder="Username"
						size="large"
					/>
				</Form.Item>
				<Form.Item
					name="password"
					noStyle
					rules={[
						{
							required: true,
							message: 'Please input your Password!',
						},
					]}
				>
					<Input.Password
						prefix={<FontAwesomeIcon icon={faLock} />}
						placeholder="Password"
						size="large"
					/>
				</Form.Item>
			</Space>
			<Form.Item>
				<Form.Item name="remember" valuePropName="checked" noStyle>
					<Checkbox>Remember me</Checkbox>
				</Form.Item>

				<Link to="/reset-password" style={{ float: 'right' }}>
					Forgot password?
				</Link>
			</Form.Item>
			<Form.Item>
				<Button
					type="primary"
					htmlType="submit"
					style={{ width: '100%' }}
				>
					Log in
				</Button>
				<Typography.Text type="secondary">
					Need an account?&nbsp;
				</Typography.Text>
				<Link to="/signup">Register now!</Link>
			</Form.Item>
		</Form>
	);
}
