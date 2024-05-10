import React from 'react';
import PropTypes from 'prop-types';
import Pdf from '../../../../../library/components/Pdf';
import { Page, View, Text } from '@react-pdf/renderer';
import { styles } from './styles';
import { currentDateAndTime } from '../../../../../library/helpers/date';
import { string } from '../../../../../library/common/constants/strings';
import { options } from '../../../../../library/common/constants/currency';

const OrderPdf = ({ fileName, size, title, data }) => {
	return (
		<Pdf fileName={fileName} title={title}>
			<Page size={size} style={styles.body}>
				<View style={styles.header} fixed>
					<Text>- {currentDateAndTime} -</Text>
				</View>
				<Text style={styles.title}> Order Invoice </Text>
				<Text style={styles.author}>{string['title']}</Text>
				<Text style={styles.subtitle}>Order Summary</Text>
				<View style={styles.table}>
					<View style={styles.tableRow} key={data._id}>
						<View style={styles.tableCol}>
							<Text style={styles.cell}>Title</Text>
						</View>
						<View style={styles.tableCol}>
							<Text style={styles.cell}>Price</Text>
						</View>
						<View style={styles.tableCol}>
							<Text style={styles.cell}>Quantity</Text>
						</View>
						<View style={styles.tableCol}>
							<Text style={styles.cell}>Brand</Text>
						</View>
						<View style={styles.tableCol}>
							<Text style={styles.cell}>Color</Text>
						</View>
					</View>
					{data &&
						data['products'].map((item, index) => (
							<View style={styles.tableRow} key={index}>
								<View style={styles.tableCol}>
									<Text style={styles.cell}> {item.product.title}</Text>
								</View>
								<View style={styles.tableCol}>
									<Text style={styles.cell}>
										{options['usd']}
										{(item.product.price * 100 / 100).toFixed(2)}{' '}
									</Text>
								</View>
								<View style={styles.tableCol}>
									<Text style={styles.cell}>{item.count}</Text>
								</View>
								<View style={styles.tableCol}>
									<Text style={styles.cell}>{item.product.brand}</Text>
								</View>
								<View style={styles.tableCol}>
									<Text style={styles.cell}>{item.product.color}</Text>
								</View>
							</View>
						))}
				</View>
				<View style={styles.detailContainer}>
					<Text style={styles.detailText}>
						Date:{' '}
						{new Date(data.paymentIntent.created * 1000).toLocaleString()}
					</Text>
					<Text style={styles.detailText}>
						Order Id: {data.paymentIntent.id}
					</Text>
					<Text style={styles.detailText}>
						Order Status: {data.orderStatus}
					</Text>
					<Text style={styles.detailText}>
						Total Amount: {options['usd']}
						{(data.paymentIntent.amount / 100).toFixed(2)}
					</Text>
				</View>
				<Text style={styles.footer}>Thank you for shopping with us.</Text>
			</Page>
		</Pdf>
	);
};

OrderPdf.propTypes = {
	fileName : PropTypes.string,
	size     : PropTypes.string,
	title    : PropTypes.string,
	data     : PropTypes.object,
};
OrderPdf.defaultProps = {
	fileName : '',
	size     : 'A4',
	title    : '',
	data     : {},
};

export default OrderPdf;
