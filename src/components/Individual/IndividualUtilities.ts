import { User } from 'src/api/User/UserModels';
import {
	IndividualType,
	Individual,
} from 'src/components/Individual/IndividualModels';

export function mapUserToIndividual(user: User): Individual {
	return {
		...user,
		type: IndividualType.USER,
	};
}
