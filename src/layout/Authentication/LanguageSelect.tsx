import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

export default function () {
	const { i18n } = useTranslation();

	return (
		<Select
			value={i18n.language}
			onChange={(value) => i18n.changeLanguage(value)}
			bordered={false}
		>
			<Select.Option value="pl">Polski</Select.Option>
			<Select.Option value="en">English</Select.Option>
			<Select.Option value="de" disabled>
				Deutsche
			</Select.Option>
		</Select>
	);
}
