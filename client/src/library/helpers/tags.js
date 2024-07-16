import { string } from '../common/constants/strings';

export function documentTitle(title){
	return `${title} - ${string['brandTitle']}`;
}
