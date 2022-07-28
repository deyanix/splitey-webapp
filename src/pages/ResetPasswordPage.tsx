import { Button, Typography, Input, Space, Form, Checkbox } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function () {
	return (
		<Form>
			<Space direction="vertical" style={{ width: '100%' }}>
				<div style={{ marginBottom: '0.4em' }}>
					<Typography.Title
						level={3}
						style={{ textAlign: 'center', marginBottom: '0.1em' }}
					>
						Reset your password
					</Typography.Title>
					<Typography.Text type="secondary">
						We will send you an email with instructions on the reset
						password
					</Typography.Text>
				</div>
				<Form.Item
					name="email"
					rules={[
						{
							required: true,
							message: 'Please input your Email!',
						},
					]}
				>
					<Input
						prefix={<FontAwesomeIcon icon={faEnvelope} />}
						placeholder="Email"
						size="large"
					/>
				</Form.Item>
				<Form.Item noStyle>
					<Button
						type="primary"
						htmlType="submit"
						style={{ width: '100%' }}
					>
						Reset password
					</Button>
					<Link to="/signin">Log in instead</Link>
				</Form.Item>
			</Space>
		</Form>
	);
}
