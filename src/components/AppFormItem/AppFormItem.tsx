import { Form } from 'antd';
import React from 'react';
import { FormState } from 'react-hook-form/dist/types/form';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import useAppTranslation from 'src/hooks/useAppTranslation';

export interface AppFormItemProps {
	formState: FormState<FieldValues>;
	name: string;
}

export const AppFormItem: React.FC<
	React.PropsWithChildren<AppFormItemProps>
> = (props) => {
	const { tm } = useAppTranslation();

	return (
		<Form.Item
			validateStatus={
				props.formState.errors[props.name]?.message
					? 'error'
					: undefined
			}
			help={tm(props.formState.errors[props.name]?.message)}
		>
			{props.children}
		</Form.Item>
	);
};
