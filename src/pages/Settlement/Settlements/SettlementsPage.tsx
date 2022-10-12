import { PageHeader } from 'antd/es';
import { useTranslation } from 'react-i18next';

export default function () {
	const { t } = useTranslation();

	return <PageHeader title={t('settlements')}></PageHeader>;
}
