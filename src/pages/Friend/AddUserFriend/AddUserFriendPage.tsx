import { Input, PageHeader } from 'antd/es';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCheck,
	faClose,
	faSearch,
	faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { useMemo, useState } from 'react';
import _ from 'lodash';
import { User } from 'src/api/User/UserModels';
import UserService from 'src/api/User/UserService';
import { Button, List, Space } from 'antd';
import UserListItemMeta from 'src/components/UserListItemMeta/UserListItemMeta';

export default function () {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);
	const [users, setUsers] = useState<User[]>([]);

	const fetchUsersWithDebounce = useMemo(() => {
		const fetchUsers = async (val: string) => {
			setLoading(true);
			try {
				console.log(val);
				setUsers(await UserService.searchUsers(val));
			} finally {
				setLoading(false);
			}
		};

		return _.debounce(fetchUsers, 400);
	}, []);

	return (
		<PageHeader title={t('addFriend')} onBack={() => navigate('/friends')}>
			<Input
				onChange={(evt) =>
					fetchUsersWithDebounce(evt.currentTarget.value)
				}
				placeholder={t('searchFriends')}
				prefix={<FontAwesomeIcon icon={faSearch} />}
				style={{ marginBottom: 16 }}
			/>
			<List
				loading={loading}
				dataSource={users}
				renderItem={(item) => (
					<List.Item key={item.id}>
						<UserListItemMeta person={item} />
						<Space>
							<Button
								icon={<FontAwesomeIcon icon={faUserPlus} />}
								type="primary"
							/>
						</Space>
					</List.Item>
				)}
			/>
		</PageHeader>
	);
}
