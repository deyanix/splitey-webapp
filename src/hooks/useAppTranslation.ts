import { Message } from 'yup/lib/types';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

export default function () {
	const { t } = useTranslation();

	function tm(message: Message | undefined): string | undefined {
		if (_.isEmpty(message)) {
			return undefined;
		}

		if (typeof message === 'object') {
			return t(message.key as string, message.options as object);
		}
		return t(String(message));
	}

	return { tm };
}
