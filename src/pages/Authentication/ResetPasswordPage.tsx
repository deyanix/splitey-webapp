import { Button, Form, Input, Space, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function () {
	const { t } = useTranslation();

	return (
		<Form>
			<Space direction="vertical" style={{ width: '100%' }}>
				<div style={{ marginBottom: '0.4em' }}>
					<Typography.Title
						level={3}
						style={{ textAlign: 'center', marginBottom: '0.1em' }}
					>
						{t('resetYourPassword')}
					</Typography.Title>
					<Typography.Text type="secondary">
						{t('resetPasswordInstructions')}
					</Typography.Text>
				</div>
				<Form.Item
					name="email"
					rules={[
						{
							required: true,
							message: 'Please input your Email!',
						},
					]}
				>
					<Input
						prefix={<FontAwesomeIcon icon={faEnvelope} />}
						placeholder={t('email')}
						size="large"
					/>
				</Form.Item>
				<Form.Item noStyle>
					<Button
						type="primary"
						htmlType="submit"
						style={{ width: '100%' }}
					>
						{t('resetPassword')}
					</Button>
					<Link to="/signin">{t('signInInstead')}</Link>
				</Form.Item>
			</Space>
		</Form>
	);
}
