import { Page, Text, View, Image, Document, StyleSheet } from '@react-pdf/renderer';
import {Font} from '@react-pdf/renderer';
import headerImg from '../assets/images/recieptheader.png';
import firmaBold from '../assets/fonts/br-firma-cufonfonts/BR Firma Bold.otf';
// import firmaSemi from '../assets/fonts/br-firma-cufonfonts/BR Firma SemiBold.otf';
// import firmaReg from '../assets/fonts/br-firma-cufonfonts/BR Firma Regular.otf';


Font.register({
    family: 'firmaBold',
    src: firmaBold,
  })

// Create styles similar to Tailwind using React-PDF's StyleSheet
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  header: {
    width: '100%',
    height: '211.04px',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 3,
  },
  headerTop: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 11.02,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerAddress: {
    color: '#4C4A4E',
    fontSize: 14,
    fontFamily: 'firmaBold',
    lineHeight: 28.8,
  },
  invoiceTitleContainer: {
    width: '100%',
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 6,
  },
  invoiceTitle: {
    color: '#171718',
    fontSize: 38,
    fontFamily: 'firmaBold',
    // Manually transform text to uppercase if needed:
    textTransform: 'uppercase',
  },
  invoiceDivider: {
    flexGrow: 1,
    height: 1,
    backgroundColor: '#D9CFFF',
    borderRadius: 32,
  },
  detailsContainer: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  receiptFor: {
    color: '#6D09F9',
    fontSize: 20,
    fontFamily: 'firmaBold',
  },
  customerName: {
    color: '#171718',
    fontSize: 32,
    fontFamily: 'firmaBold',
  },
  customerCompany: {
    color: '#171718',
    fontSize: 20,
    fontFamily: 'firmaBold',
  },
  contactInfo: {
    color: '#636065',
    fontSize: 18,
    fontFamily: 'firmaBold',
  },
  orderInfoContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  orderInfoLabel: {
    color: '#171718',
    fontSize: 18,
    fontFamily: 'firmaBold',
  },
  orderInfoValue: {
    color: '#636065',
    fontSize: 18,
    fontFamily: 'firmaBold',
  },
  bookingInfoContainer: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  bookingInfoLabel: {
    color: '#6D09F9',
    fontSize: 20,
    fontFamily: 'firmaBold',
  },
  bookingDetails: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookingDetail: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  listContainer: {
    width: '100%',
    padding: 20,
    marginBottom: 16,
  },
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#D9CFFF',
    paddingBottom: 8,
    marginBottom: 12,
  },
  headerText: {
    fontSize: 16,
    fontFamily: 'firmaBold',
    color: '#171718',
    width: '30%', // Adjust as needed
    textAlign: 'left', // Adjust alignment as needed
  },
  listItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemText: {
    fontSize: 16,
    fontFamily: 'firmaBold',
    color: '#636065',
    width: '30%', // Adjust as needed
    textAlign: 'left', // Adjust alignment as needed
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#D9CFFF',
  },
  totalText: {
    fontSize: 18,
    fontFamily: 'firmaBold',
    color: '#171718',
    width: '30%',
    textAlign: 'left',
  },
  totalAmount: {
    fontSize: 18,
    fontFamily: 'firmaBold',
    color: '#6D09F9',
    width: '30%',
    textAlign: 'right',
  },
  footer: {
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  footerText: {
    color: '#292929',
    fontSize: 26.67,
    fontFamily: 'firmaBold',
  },
});



const InvoicePDF = 
     ({callerData,
      eventData,
      ambulanceData,
      formattedFee,
      formattedTimeRange,
      formattedDateRange,
      smallAmbulanceTotal,
      largeAmbulanceTotal,
      medicsTotal
    }) => (
    
  <Document>
    <Page size="A4" style={styles.container}>
        <View>
            <Image src={headerImg} />
        </View>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={{ width: '334.40px', height: '32px' }} />
          <View style={{ width: '250px' }}>
            <Text style={styles.headerAddress}>13, Odiyan Street, Ikate, Lagos, Nigeria</Text>
            <Text style={styles.headerAddress}>08098888763</Text>
          </View>
        </View>
        <View style={styles.invoiceTitleContainer}>
          <Text style={styles.invoiceTitle}>Invoice</Text>
          <View style={styles.invoiceDivider} />
        </View>
      </View>

      {/* Details Section */}
      <View style={styles.detailsContainer}>
        <View>
          <Text style={styles.receiptFor}>Receipt for:</Text>
          <View>
            <Text style={styles.customerName}>{callerData?.fullName ?? ''}</Text>
            <Text style={styles.customerCompany}>{eventData?.venueName ?? ''}</Text>
            <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <Text style={styles.contactInfo}>{callerData?.emailAddress ?? ''}</Text>
              {/* <Text style={styles.contactInfo}>• </Text> */}
              <Text style={styles.contactInfo}>{callerData?.phoneNumber ?? ''}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Booking Info Section */}
      <View style={styles.bookingInfoContainer}>
        <View>
          <Text style={styles.bookingInfoLabel}>Booking Information:</Text>
            <View style={styles.bookingDetail}>
              <Text style={styles.orderInfoLabel}>Date:</Text>
              <Text style={styles.orderInfoValue}>{formattedDateRange ?? ''}</Text>
            </View>
            <View style={styles.bookingDetail}>
              <Text style={styles.orderInfoLabel}>Time:</Text>
              <Text style={styles.orderInfoValue}>{formattedTimeRange ?? ''}</Text>
            </View>
         
        </View>
        <View style={styles.bookingDetail}>
          <Text style={styles.orderInfoLabel}>Standby Location:</Text>
          <Text style={styles.orderInfoValue}>{eventData?.venueAddress ?? ''}</Text>
        </View>
      </View>

        {/* List Section */}
        <View style={styles.listContainer}>
        {/* Header Row */}
        <View style={styles.listHeaderRow}>
            <Text style={styles.headerText}>Description</Text>
            <Text style={styles.headerText}>Qty</Text>
            <Text style={styles.headerText}>Amount</Text>
        </View>

        {/* List item */}
        <View style={styles.listItemRow}>
            <Text style={styles.itemText}>Small Ambulance</Text>
            <Text style={styles.itemText}>x{ambulanceData?.smallAmbulanceCount ?? ''}</Text>
            <Text style={styles.itemText}>N{smallAmbulanceTotal ?? ''}</Text>
        </View>

        {/* List item */}
        <View style={styles.listItemRow}>
            <Text style={styles.itemText}>Large Ambulance</Text>
            <Text style={styles.itemText}>x{ambulanceData?.largeAmbulanceCount ?? ''}</Text>
            <Text style={styles.itemText}>N{largeAmbulanceTotal ?? ''}</Text>
        </View>

        {/* Another list item */}
        <View style={styles.listItemRow}>
            <Text style={styles.itemText}>Medic Standby</Text>
            <Text style={styles.itemText}>x{ambulanceData?.medicsCount ?? ''}</Text>
            <Text style={styles.itemText}>N{medicsTotal ?? ''}</Text>
        </View>

        {/* Total Row */}
        <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalAmount}>N{formattedFee ?? ''}</Text>
        </View>
        </View>
      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>8Medicalng</Text>
      </View>
    </Page>
  </Document>
);

export default InvoicePDF;
