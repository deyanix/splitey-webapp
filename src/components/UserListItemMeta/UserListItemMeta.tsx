import AppAvatar from 'src/components/AppAvatar/AppAvatar';
import { List, Typography } from 'antd';

export interface UserListItemMetaProps {
	id?: number;
	person: {
		firstName?: string;
		lastName?: string;
		username?: string;
	};
}

export default function (props: UserListItemMetaProps) {
	return (
		<List.Item.Meta
			style={{ alignItems: 'center' }}
			avatar={
				<AppAvatar
					id={props.id}
					firstName={props.person.firstName}
					lastName={props.person.lastName}
				/>
			}
			title={
				<a href="#">
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<Typography.Text>
							{props.person.firstName} {props.person.lastName}
						</Typography.Text>
						{props.person.username && (
							<Typography.Text
								type="secondary"
								style={{ fontSize: '0.75rem' }}
							>
								@{props.person.username}
							</Typography.Text>
						)}
					</div>
				</a>
			}
		/>
	);
}
