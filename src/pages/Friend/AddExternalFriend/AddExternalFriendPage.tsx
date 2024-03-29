import { Button, Col, Form, message, Row } from 'antd';
import { PageHeader } from 'antd/es';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AppInput } from 'src/components/AppInput/AppInput';
import { yup } from 'src/validation/yup';
import useAppTranslation from 'src/hooks/useAppTranslation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import React, { useState } from 'react';
import { AppFormItem } from 'src/components/AppFormItem/AppFormItem';
import FriendService from 'src/api/Friend/FriendService';

const schema = yup
	.object({
		firstName: yup.string().required(),
		lastName: yup.string().required(),
	})
	.required();

export default function () {
	const { t } = useTranslation();
	const { tm } = useAppTranslation();
	const navigate = useNavigate();
	const { handleSubmit, control, formState } = useForm({
		resolver: yupResolver(schema, {
			abortEarly: false,
		}),
	});

	const [loading, setLoading] = useState<boolean>(false);

	async function onSubmit(data: any) {
		setLoading(true);
		try {
			await FriendService.createExternalFriend(data);
			message.info(t('successfullyCreatedFriend'));
			navigate('/friends');
		} finally {
			setLoading(false);
		}
	}

	return (
		<PageHeader
			title={t('createFriend')}
			onBack={() => navigate('/friends')}
		>
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
