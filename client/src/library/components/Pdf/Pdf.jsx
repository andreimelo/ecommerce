import React from 'react';
import PropTypes from 'prop-types';
import { PDFDownloadLink, Document } from '@react-pdf/renderer';

const Pdf = ({ fileName, title, children }) => {
	return (
		<PDFDownloadLink fileName={fileName} document={<Document>{children}</Document>}>
			{title}
		</PDFDownloadLink>
	);
};

Pdf.propTypes = {
	fileName : PropTypes.string,
	title    : PropTypes.string,
	children : PropTypes.element,
};
Pdf.defaultProps = {
	fileName : '',
	title    : '',
	children : '',
};

export default Pdf;
