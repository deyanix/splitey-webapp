import { Button, Card, Input, Space } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

export default function () {
	return (
		<div className="authentication-layout">
			<img src="logo.png" width={200} style={{ marginBottom: 16 }} />
			<Card
				className="authentication-layout-content"
				style={{ width: 300 }}
			>
				<Space direction="vertical" style={{ width: '100%' }}>
					<Input
						placeholder="Username"
						size="large"
						bordered={false}
						prefix={<UserOutlined />}
					/>
					<Input.Password
						placeholder="Password"
						size="large"
						bordered={false}
						prefix={<LockOutlined />}
					/>
					<div
						style={{ display: 'flex', justifyContent: 'flex-end' }}
					>
						<Button type="primary">Zaloguj się</Button>
					</div>
				</Space>
			</Card>
		</div>
	);
}
