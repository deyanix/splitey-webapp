import { Button, Col, Form, message, Row } from 'antd';
import { PageHeader } from 'antd/es';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { AppInput } from 'src/components/AppInput/AppInput';
import { yup } from 'src/validation/yup';
import useAppTranslation from 'src/hooks/useAppTranslation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import React, { useEffect, useState } from 'react';
import { AppFormItem } from 'src/components/AppFormItem/AppFormItem';
import FriendService from 'src/api/Friend/FriendService';
import _ from 'lodash';
import { ExternalFriend } from 'src/api/Friend/FriendModels';

const schema = yup
	.object({
		firstName: yup.string().required(),
		lastName: yup.string().required(),
	})
	.required();

export default function () {
	const { t } = useTranslation();
	const { tm } = useAppTranslation();
	const [friend, setFriend] = useState<ExternalFriend>();
	const { friendId } = useParams();
	const navigate = useNavigate();
	const { handleSubmit, control, formState, setValue } = useForm({
		resolver: yupResolver(schema, {
			abortEarly: false,
		}),
	});

	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setLoading(true);
		if (_.isNil(friendId)) {
			message.error('Niepoprawny identyfikator znajomego');
			return;
		}

		FriendService.getExternalFriend(parseInt(friendId))
			.then((data) => {
				setFriend(data);
				setValue('firstName', data.firstName);
				setValue('lastName', data.lastName);
			})
			.catch(() => message.error('Wystąpił błąd'))
			.finally(() => setLoading(false));
	}, []);

	async function onSubmit(data: any) {
		if (_.isNil(friend)) {
			return;
		}

		setLoading(true);
		try {
			await FriendService.updateExternalFriend(friend.id, data);
			message.info(t('successfullyUpdatedFriend'));
			navigate('/friends');
		} finally {
			setLoading(false);
		}
	}

	return (
		<PageHeader title={t('editFriend')} onBack={() => navigate('/friends')}>
			<Form onFinish={handleSubmit(onSubmit)}>
				<Row gutter={[16, 8]}>
					<Col span={24} sm={12}>
						<AppFormItem formState={formState} name="firstName">
							<AppInput
								control={control}
								controlName="firstName"
								placeholder={t('firstName')}
								autoComplete="off"
								disabled={loading}
							/>
						</AppFormItem>
					</Col>
					<Col span={24} sm={12}>
						<AppFormItem formState={formState} name="firstName">
							<AppInput
								control={control}
								controlName="lastName"
								placeholder={t('lastName')}
								autoComplete="off"
								disabled={loading}
							/>
						</AppFormItem>
					</Col>
					<Col span={24} style={{ textAlign: 'right' }}>
						<Button
							type="primary"
							htmlType="submit"
							loading={loading}
						>
							{t('submit')}
						</Button>
					</Col>
				</Row>
			</Form>
		</PageHeader>
	);
}
