import { Button, Dropdown } from 'antd';
import AddFriendMenu, {
	AddFriendMenuProps,
} from 'src/pages/Friend/Friends/AddFriendMenu';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export interface AddFriendDropdownProps extends AddFriendMenuProps {}

export default function (props: AddFriendDropdownProps) {
	const { t } = useTranslation();

	return (
		<Dropdown
			overlay={<AddFriendMenu {...props} />}
			trigger={['click', 'hover']}
		>
			<Button type="primary" icon={<FontAwesomeIcon icon={faPlus} />} />
		</Dropdown>
	);
}
