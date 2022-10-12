import { Menu } from 'antd';
import { useMemo } from 'react';
import { MenuProps } from 'antd/lib/menu';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export interface AddFriendMenuProps {
	onAddUser?: () => unknown;
	onAddExternal?: () => unknown;
}

export default function (props: AddFriendMenuProps) {
	const { t } = useTranslation();

	const items = useMemo<MenuProps['items']>(
		() => [
			{
				key: 'user',
				label: (
					<Link to="/friends/add-user">{t('addWithAccount')}</Link>
				),
				onClick: () => props.onAddUser?.(),
			},
			{
				key: 'external',
				label: (
					<Link to="/friends/add-external">
						{t('addWithoutAccount')}
					</Link>
				),
			},
		],
		[]
	);

	return <Menu items={items} />;
}
