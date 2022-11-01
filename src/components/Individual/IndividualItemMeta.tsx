import IndividualAvatar from './IndividualAvatar';
import { List, Typography } from 'antd';
import { Individual } from './IndividualModels';

export interface IndividualItemMetaProps {
	individual: Individual;
}

export default function (props: IndividualItemMetaProps) {
	return (
		<List.Item.Meta
			style={{ alignItems: 'center' }}
			avatar={<IndividualAvatar individual={props.individual} />}
			title={
				<a href="#">
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<Typography.Text>
							{props.individual.firstName}{' '}
							{props.individual.lastName}
						</Typography.Text>
						{props.individual.username && (
							<Typography.Text
								type="secondary"
								style={{ fontSize: '0.75rem' }}
							>
								@{props.individual.username}
							</Typography.Text>
						)}
					</div>
				</a>
			}
		/>
	);
}
