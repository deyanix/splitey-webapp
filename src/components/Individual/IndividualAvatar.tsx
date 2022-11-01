import { Avatar } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'src/components/ThemeProvider/ThemeContext';
import { ThemeType } from 'src/themes';
import { Individual } from 'src/components/Individual/IndividualModels';
import _ from 'lodash';

export interface AppAvatarProps {
	individual?: Individual;
}

const normalizeHash = (hash: number, min: number, max: number) => {
	return Math.floor((hash % (max - min)) + min);
};

const getHash = (str: string): number => {
	const charArray = Array.from(str);
	return charArray.reduce(
		(total, char, index) => total + char.charCodeAt(0) * index,
		0
	);
};

type SaturationRange = [number, number];
type LightnessRange = [number, number];

const generateHsl = (
	str: string,
	saturationRange: SaturationRange,
	lightnessRange: LightnessRange
) => {
	const hash = getHash(str);
	const h = normalizeHash(hash, 0, 360);
	const s = normalizeHash(hash, saturationRange[0], saturationRange[1]);
	const l = normalizeHash(hash, lightnessRange[0], lightnessRange[1]);
	return `hsl(${h}, ${s}%, ${l}%)`;
};

export default function (props: React.PropsWithChildren<AppAvatarProps>) {
	const { theme } = useTheme();
	const [color, setColor] = useState<string>('');

	useEffect(() => {
		if (_.isNil(props.individual)) {
			setColor(theme === ThemeType.LIGHT ? '#194c6b' : '#455765');
			return;
		}

		const name = [props.individual.type, props.individual.id].join('');
		const saturationRange: SaturationRange = [30, 60];
		const lightnessRange: LightnessRange =
			theme === ThemeType.LIGHT ? [45, 55] : [60, 70];

		setColor(generateHsl(name, saturationRange, lightnessRange));
	}, [props.individual, theme]);

	return (
		<Avatar
			className="app-avatar"
			style={{
				backgroundColor: color,
			}}
		>
			{props.individual?.firstName.charAt(0).toLocaleUpperCase()}
			{props.individual?.lastName.charAt(0).toLocaleUpperCase()}
			{props.children}
		</Avatar>
	);
}
