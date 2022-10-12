import { PageHeader } from 'antd/es';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function () {
	const { t } = useTranslation();
	const navigate = useNavigate();

	return (
		<PageHeader
			title={t('createFriend')}
			onBack={() => navigate('/friends')}
		></PageHeader>
	);
}
