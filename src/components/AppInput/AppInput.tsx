import React from 'react';
import { Input, InputProps } from 'antd';
import { Controller } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types';
import _ from 'lodash';

export interface AppInputProps extends InputProps {
	control: Control;
	controlName: string;
}

export const AppInput: React.FC<AppInputProps> = (props) => {
	return (
		<div className="app-input">
			<Controller
				name={props.controlName}
				control={props.control}
				render={({ field }) => (
					<Input
						{..._.omit(props, 'control', 'controlName')}
						{...field}
					/>
				)}
			/>
			<label>{props.placeholder}</label>
		</div>
	);
};
