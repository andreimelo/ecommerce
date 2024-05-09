import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
	body            : {
		paddingTop        : 35,
		paddingBottom     : 65,
		paddingHorizontal : 35,
	},
	title           : {
		fontSize  : 24,
		textAlign : 'center',
		marginTop : 10,
	},
	author          : {
		fontSize  : 12,
		textAlign : 'center',
	},
	subtitle        : {
		fontSize     : 14,
		marginBottom : 12,
	},
	text            : {
		margin    : 12,
		fontSize  : 14,
		textAlign : 'justify',
	},
	image           : {
		marginVertical   : 15,
		marginHorizontal : 100,
	},
	header          : {
		fontSize  : 12,
		textAlign : 'center',
		color     : 'grey',
	},
	footer          : {
		padding      : '100px',
		fontSize     : 12,
		marginBottom : 20,
		textAlign    : 'center',
		color        : 'grey',
	},
	pageNumber      : {
		position  : 'absolute',
		fontSize  : 12,
		bottom    : 30,
		left      : 0,
		right     : 0,
		textAlign : 'center',
		color     : 'grey',
	},
	table           : {
		display           : 'table',
		width             : 'auto',
		borderStyle       : 'solid',
		borderWidth       : 1,
		borderRightWidth  : 0,
		borderBottomWidth : 0,
	},
	tableRow        : {
		margin        : 'auto',
		flexDirection : 'row',
		width         : '100%',
	},
	tableCol        : {
		width           : '100%',
		borderStyle     : 'solid',
		borderWidth     : 1,
		borderLeftWidth : 0,
		borderTopWidth  : 0,
	},
	cell            : {
		margin   : 'auto',
		padding  : 10,
		fontSize : 10,
	},
	detailContainer : {
		marginTop : 20,
	},
	detailText      : {
		marginBottom : 5,
		fontSize     : 14,
	},
});
