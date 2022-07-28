import { Button, Typography, Input, Space, Form, Checkbox } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function () {
	return (
		<Form>
			<Space direction="vertical" style={{ width: '100%' }}>
				<Typography.Title level={3} style={{ textAlign: 'center' }}>
					Create an account
				</Typography.Title>
				<Form.Item
					name="email"
					noStyle
					rules={[
						{
							required: true,
							message: 'Please input your Username!',
						},
					]}
				>
					<Input
						prefix={<FontAwesomeIcon icon={faEnvelope} />}
						placeholder="Email"
						size="large"
					/>
				</Form.Item>
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
						placeholder="Confirm password"
						size="large"
					/>
				</Form.Item>

				<Form.Item noStyle>
					<Button
						type="primary"
						htmlType="submit"
						style={{ width: '100%' }}
					>
						Register
					</Button>
					<Link to="/signin">Log in instead</Link>
				</Form.Item>
			</Space>
		</Form>
	);
}
