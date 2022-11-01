import { useTranslation } from 'react-i18next';
import { Button, List, message, PageHeader, Space, Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';
import { IncomingInvitations } from 'src/pages/Friend/FriendInvitations/IncomingInvitations';
import { OutgoingInvitations } from 'src/pages/Friend/FriendInvitations/OutgoingInvitations';

export default function () {
	const { t } = useTranslation();
	const navigate = useNavigate();

	return (
		<PageHeader
			title={t('invitations')}
			onBack={() => navigate('/friends')}
		>
			<Tabs
				defaultActiveKey="incoming"
				items={[
					{
						label: t('incoming'),
						key: 'incoming',
						forceRender: true,
						children: <IncomingInvitations />,
					},
					{
						label: t('outgoing'),
						key: 'outgoing',
						forceRender: true,
						children: <OutgoingInvitations />,
					},
				]}
			/>
		</PageHeader>
	);
}
