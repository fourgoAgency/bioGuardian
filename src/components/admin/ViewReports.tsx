import React, { useState } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "../ui/button";

type ReportData = {
    totalOrders: number;
    totalRevenue: number;
    totalJobApplications: number;
    totalSubscribers: number;
    totalContactSubmissions: number;
    totalBlogPosts: number;
    totalActiveJobs: number;
};

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 12,
        fontFamily: "Helvetica",
        backgroundColor: "#f9fafb",
        color: "#1f2937",
    },
    header: {
        fontSize: 24,
        marginBottom: 30,
        textAlign: "center",
        fontWeight: "bold",
        color: "#111827",
    },
    section: {
        marginBottom: 20,
        paddingBottom: 10,
        borderBottom: "1px solid #e5e7eb",
    },
    sectionTitle: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: "bold",
        color: "#2563eb", // Tailwind blue-600
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    label: {
        fontWeight: "bold",
    },
    value: {
        color: "#111827",
    },
    footer: {
        marginTop: 30,
        fontSize: 10,
        textAlign: "center",
        color: "#6b7280", // Tailwind gray-500
    },
});


function ReportDocument({ reportData }: { reportData: ReportData }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.header}>Company Performance Report</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Orders</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Total Orders:</Text>
                        <Text style={styles.value}>{reportData.totalOrders}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Total Revenue:</Text>
                        <Text style={styles.value}>PKR {reportData.totalRevenue.toLocaleString()}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Job Applications</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Total Applications:</Text>
                        <Text style={styles.value}>{reportData.totalJobApplications}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Contact Submissions</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Total Messages:</Text>
                        <Text style={styles.value}>{reportData.totalContactSubmissions}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Newsletter</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Total Subscribers:</Text>
                        <Text style={styles.value}>{reportData.totalSubscribers}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}> Jobs</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Total Active Jobs:</Text>
                        <Text style={styles.value}>{reportData.totalActiveJobs}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}> Blog</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Total Blog Posts:</Text>
                        <Text style={styles.value}>{reportData.totalBlogPosts}</Text>
                    </View>
                </View>

                <Text style={styles.footer}>Generated on: {new Date().toLocaleDateString()}</Text>
            </Page>
        </Document>
    );
}


export default function ViewReportButton() {
    const [reportData, setReportData] = useState<ReportData | null>(null);


    const generateReportData = async () => {
        const [ordersSnap, applicationsSnap, contactsSnap, newslettersSnap, jobsSnap, postsSnap] = await Promise.all([
            getDocs(collection(db, "orders")),
            getDocs(collection(db, "job_applications")),
            getDocs(collection(db, "contact_submissions")),
            getDocs(collection(db, "newsletter_subscriptions")),
            getDocs(collection(db, "jobs")),
            getDocs(collection(db, "posts")),
        ]);

        const ordersSnapshot = await getDocs(collection(db, "orders"));
        let totalRevenue = 0;

        ordersSnapshot.forEach((doc) => {
            const data = doc.data();
            const orderItems = data.items || [];

            const orderTotal = orderItems.reduce(
                (sum: number, item: {price: number, quantity: number}) =>
                    sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
                0
            );

            totalRevenue += orderTotal;
        });


        setReportData({
            totalOrders: ordersSnap.size,
            totalRevenue,
            totalJobApplications: applicationsSnap.size,
            totalContactSubmissions: contactsSnap.size,
            totalSubscribers: newslettersSnap.size,
            totalActiveJobs: jobsSnap.size,
            totalBlogPosts: postsSnap.size,
        });
    };

    React.useEffect(() => {
        generateReportData();
    }, []);

    if (!reportData) return <button className="btn">Loading Report...</button>;

    return (
        <PDFDownloadLink
            document={<ReportDocument reportData={reportData} />}
            fileName="company-report.pdf"
        >
            {({ loading }) => (
                <Button className="btn">
                    {loading ? "Generating PDF..." : "View Report"}
                </Button>
            )}
        </PDFDownloadLink>
    );
}
