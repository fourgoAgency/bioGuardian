import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import type { Order } from '@/app/admin/orders/order_type';

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, fontFamily: 'Helvetica' },

  title: { fontSize: 18, textAlign: 'center', marginBottom: 8 },
  subTitle: { fontSize: 12, textAlign: 'center', marginBottom: 12 },

  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },

  sectionBox: {
    border: '1 solid #000',
    padding: 8,
    marginBottom: 10,
  },
  heading: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 4,
    borderBottom: '1 solid #000',
    paddingBottom: 2,
  },

  table: {
    Display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  tableRow: { flexDirection: 'row' },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  tableCol: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
  },
  colItem: { width: '40%' },
  colQty: { width: '15%', textAlign: 'center' },
  colPrice: { width: '20%', textAlign: 'right' },
  colTotal: { width: '25%', textAlign: 'right' },

  totalText: { textAlign: 'right', fontWeight: 'bold', marginTop: 6 },
});

const OrderSlip = ({ order }: { order: Order }) => {
  const items = order.items ?? [];
  const grandTotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Text style={styles.title}>Bio-Guardian Pharma</Text>
        <Text style={styles.subTitle}>Order Slip</Text>

        <View style={styles.row}>
          <Text>Order #: {order.id?.slice(0, 8)}</Text>
          <Text>Date: {new Date().toLocaleDateString()}</Text>
        </View>

        {/* Customer Info */}
        <View style={styles.sectionBox}>
          <Text style={styles.heading}>Customer Information</Text>
          <Text>Name: {order.customer_name}</Text>
          <Text>Email: {order.customer_email}</Text>
          <Text>Phone: {order.customer_phone}</Text>
        </View>

        {/* Shipping Address */}
        <View style={styles.sectionBox}>
          <Text style={styles.heading}>Shipping Address</Text>
          <Text>{order.shipping_address}</Text>
        </View>

        {/* Order Items Table */}
        <View style={styles.sectionBox}>
          <Text style={styles.heading}>Order Items</Text>
          <View style={styles.table}>
            {/* Header */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCol, styles.colItem]}>Item</Text>
              <Text style={[styles.tableCol, styles.colQty]}>Qty</Text>
              <Text style={[styles.tableCol, styles.colPrice]}>Price</Text>
              <Text style={[styles.tableCol, styles.colTotal]}>Total</Text>
            </View>
            {/* Rows */}
            {items.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCol, styles.colItem]}>{item.name}</Text>
                <Text style={[styles.tableCol, styles.colQty]}>{item.quantity}</Text>
                <Text style={[styles.tableCol, styles.colPrice]}>
                  PKR {item.price.toLocaleString()}
                </Text>
                <Text style={[styles.tableCol, styles.colTotal]}>
                  PKR {(item.price * item.quantity).toLocaleString()}
                </Text>
              </View>
            ))}
          </View>

          <Text style={styles.totalText}>
            Grand Total: PKR {grandTotal.toLocaleString()}
          </Text>
        </View>

        {/* Payment */}
        <View style={styles.sectionBox}>
          <Text style={styles.heading}>Payment</Text>
          <Text>Method: {order.payment_method.replace('_', ' ')}</Text>
        </View>

        {/* Notes */}
        {order.notes && (
          <View style={styles.sectionBox}>
            <Text style={styles.heading}>Notes</Text>
            <Text>{order.notes}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default OrderSlip;
