import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SalesReport = () => {
    const [payments, setPayments] = useState([]);
    const [filteredPayments, setFilteredPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5000/payments');
            setPayments(res.data);
            setFilteredPayments(res.data);
        } catch (error) {
            console.error('Failed to fetch payments:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!startDate && !endDate) {
            setFilteredPayments(payments);
            return;
        }

        const filtered = payments.filter(payment => {
            const paymentDate = new Date(payment.date);
            if (startDate && endDate) {
                return paymentDate >= startDate && paymentDate <= endDate;
            }
            if (startDate) return paymentDate >= startDate;
            if (endDate) return paymentDate <= endDate;
            return true;
        });

        setFilteredPayments(filtered);
    }, [startDate, endDate, payments]);

    const csvHeaders = [
        { label: 'Transaction ID', key: 'transactionId' },
        { label: 'Medicine Names', key: 'name' },
        { label: 'Seller Emails', key: 'sellerEmail' },
        { label: 'Buyer Email', key: 'email' },
        { label: 'Total Price', key: 'price' },
        { label: 'Date', key: 'date' },
        { label: 'Status', key: 'status' },
    ];

    const exportXLSX = () => {
        const ws = XLSX.utils.json_to_sheet(
            filteredPayments.map(p => ({
                'Transaction ID': p.transactionId,
                'Medicine Names': p.name?.join(', '),
                'Seller Emails': [...new Set(p.sellerEmail)].join(', '),
                'Buyer Email': p.email,
                'Total Price': p.price,
                'Date': new Date(p.date).toLocaleDateString(),
                'Status': p.status,
            }))
        );
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sales Report');
        XLSX.writeFile(wb, 'sales-report.xlsx');
    };

    const exportPDF = () => {
        const doc = new jsPDF();
        doc.text('Sales Report', 14, 20);

        const tableColumn = [
            'Transaction ID',
            'Medicine Names',
            'Seller Emails',
            'Buyer Email',
            'Total Price',
            'Date',
            'Status'
        ];

        const tableRows = filteredPayments.map(p => [
            p.transactionId,
            p.name?.join(', '),
            [...new Set(p.sellerEmail)].join(', '),
            p.email,
            `$${p.price.toFixed(2)}`,
            new Date(p.date).toLocaleDateString(),
            p.status,
        ]);

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 30,
            styles: { fontSize: 8 },
        });

        doc.save('sales-report.pdf');
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-semibold mb-6">Admin Sales Report</h2>

            <div className="mb-6 flex flex-wrap gap-4 items-center">
                <div>
                    <label className="mr-2 font-semibold">Start Date:</label>
                    <DatePicker
                        selected={startDate}
                        onChange={setStartDate}
                        dateFormat="yyyy-MM-dd"
                        isClearable
                        placeholderText="Select start date"
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="mr-2 font-semibold">End Date:</label>
                    <DatePicker
                        selected={endDate}
                        onChange={setEndDate}
                        dateFormat="yyyy-MM-dd"
                        isClearable
                        placeholderText="Select end date"
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none"
                    />
                </div>
                <button
                    onClick={() => {
                        setStartDate(null);
                        setEndDate(null);
                    }}
                    className="bg-yellow-500 text-white  px-3 py-1.5 rounded hover:bg-yellow-600 transition"
                >
                    Reset Filter
                </button>
            </div>

            <div className="mb-6 flex flex-wrap justify-start lg:justify-end gap-2">
                <CSVLink
                    data={filteredPayments}
                    headers={csvHeaders}
                    filename="sales-report.csv"
                    className="bg-green-600 text-white text-sm px-3 py-1.5 rounded hover:bg-green-700 transition"
                >
                    Export CSV
                </CSVLink>
                <button
                    onClick={exportXLSX}
                    className="bg-blue-600 text-white text-sm px-3 py-1.5 rounded hover:bg-blue-700 transition"
                >
                    Export XLSX
                </button>
                <button
                    onClick={exportPDF}
                    className="bg-gray-800 text-white text-sm px-3 py-1.5 rounded hover:bg-gray-900 transition"
                >
                    Export PDF
                </button>
            </div>



            <div className="overflow-x-auto">
                <table className="table w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-[#00afb9] text-white">
                            <th className="p-4 border border-gray-300">#</th>
                            <th className="p-4 border border-gray-300">Transaction ID</th>
                            <th className="p-4 border border-gray-300">Medicine Names</th>
                            <th className="p-4 border border-gray-300">Seller Emails</th>
                            <th className="p-4 border border-gray-300">Buyer Email</th>
                            <th className="p-4 border border-gray-300">Total Price</th>
                            <th className="p-4 border border-gray-300">Date</th>
                            <th className="p-4 border border-gray-300">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPayments.map((payment, index) => (
                            <tr key={payment._id} className="hover:bg-gray-100 transition">
                                <td className="p-4 border border-gray-300">{index + 1}</td>
                                <td className="p-4 border border-gray-300">{payment.transactionId}</td>
                                <td className="p-4 border border-gray-300 max-w-xs truncate" title={payment.name?.join(', ')}>
                                    {payment.name?.join(', ')}
                                </td>
                                <td className="p-4 border border-gray-300">{[...new Set(payment.sellerEmail)].join(', ')}</td>
                                <td className="p-4 border border-gray-300">{payment.email}</td>
                                <td className="p-4 border border-gray-300">${payment.price}</td>
                                <td className="p-4 border border-gray-300">{new Date(payment.date).toLocaleDateString()}</td>
                                <td className={`p-4 border border-gray-300 font-semibold text-white text-center ${payment.status.toLowerCase() === 'approved'
                                    ? 'bg-green-600'
                                    : payment.status.toLowerCase() === 'paid'
                                        ? 'bg-blue-600'
                                        : 'bg-yellow-500'
                                    }`}>
                                    {payment.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SalesReport;
