import {
	Avatar,
	Button,
	Checkbox,
	Form,
	InputNumber,
	List,
	Radio,
	Select,
	Space,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScaleBalanced } from '@fortawesome/free-solid-svg-icons/faScaleBalanced';
import { faPercent } from '@fortawesome/free-solid-svg-icons/faPercent';
import { faEquals } from '@fortawesome/free-solid-svg-icons/faEquals';

const data = [
	{
		title: 'Krzysztof Fryta',
	},
	{
		title: 'Michał Janiak',
	},
	{
		title: 'Andrzej Chmiel',
	},
	{
		title: 'Alicja Kozik',
	},
];

export default function () {
	return (
		<Form layout="horizontal" className="dashboard-page" colon={false}>
			<Form.Item label="Paid by">
				<Select defaultValue={1}>
					<Select.Option value={1}>Krzysztof Fryta</Select.Option>
					<Select.Option value={2}>Michał Janiak</Select.Option>
					<Select.Option value={3}>Andrzej Chmiel</Select.Option>
					<Select.Option value={4}>Alicja Kozik</Select.Option>
				</Select>
			</Form.Item>
			<Form.Item label="Amount">
				<InputNumber
					defaultValue={4.48 as number}
					addonAfter="zł"
					style={{ maxWidth: '100%' }}
				/>
			</Form.Item>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<Radio.Group
					className="split-method"
					optionType="button"
					buttonStyle="solid"
				>
					<Radio.Button value="a">
						<FontAwesomeIcon
							icon={faScaleBalanced}
							className="split-method__icon"
						/>
						Weight
					</Radio.Button>
					<Radio.Button value="b">
						<FontAwesomeIcon
							icon={faPercent}
							className="split-method__icon"
						/>
						Percentage
					</Radio.Button>
					<Radio.Button value="c">
						<FontAwesomeIcon
							icon={faEquals}
							className="split-method__icon"
						/>
						Custom
					</Radio.Button>
				</Radio.Group>
				<Space>
					<Button>Split equally</Button>
				</Space>
			</div>
			<List
				dataSource={data}
				renderItem={(item) => (
					<List.Item key={item.title}>
						<List.Item.Meta
							style={{ alignItems: 'center' }}
							avatar={
								<Space>
									<Checkbox defaultChecked={true} />
									<Avatar>{item.title.charAt(0)}</Avatar>
								</Space>
							}
							title={
								<a href="https://ant.design">{item.title}</a>
							}
						/>
						<Space size="middle">
							<InputNumber defaultValue={1 as number} />
							<InputNumber
								defaultValue={1.12 as number}
								addonAfter="zł"
								style={{ maxWidth: '110px' }}
								readOnly
							/>
						</Space>
					</List.Item>
				)}
			/>
		</Form>
	);
}
