import { Card, Select } from 'antd';
import SpliteyLogo from '../../assets/splitey_black_logo.svg';
import { Outlet } from 'react-router-dom';

export default function () {
	return (
		<div className="authentication-layout">
			<div className="authentication-layout">
				<SpliteyLogo className="authentication-layout-logo" />
				<Card className="authentication-layout-content">
					<Outlet />
				</Card>

				<div className="authentication-layout-footer">
					<Select defaultValue="lucy" bordered={false}>
						<Select.Option value="jack">Polski</Select.Option>
						<Select.Option value="lucy">English</Select.Option>
						<Select.Option value="Yiminghe">Deutsche</Select.Option>
					</Select>
				</div>
			</div>
		</div>
	);
}
