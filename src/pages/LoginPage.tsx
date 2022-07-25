import { Button, Checkbox, Input, Space } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

export default function () {
	return (
		<Space direction="vertical" style={{ width: '100%' }}>
			<Input
				placeholder="Username"
				size="large"
				prefix={<UserOutlined />}
			/>
			<Input.Password
				placeholder="Password"
				size="large"
				prefix={<LockOutlined />}
			/>
			<Checkbox>Remember me</Checkbox>
			<div
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
				}}
			>
				<Button type="primary">Zaloguj się</Button>
			</div>
		</Space>
	);
}
