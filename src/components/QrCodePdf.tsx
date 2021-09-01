import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

interface QrCodePdfProps {
  productQrCode: string
  productId: string
}

export function QrCodePdf(props: QrCodePdfProps){
  const {productId, productQrCode} = props;
  return <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        {/* eslint-disable-next-line */}
        <Image source={productQrCode}/>
      </View>
      <View style={styles.section}>
        <Text>{productId}</Text>
      </View>
    </Page>
  </Document>
};