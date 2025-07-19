import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { jsPDF } from "jspdf";
import invoiceLogo from '/logo.png';
import UseAuth from "../../../UseAuth";

import useAxiosSecure from "../../../Hooks/UseAxiosSecure";

const Invoice = () => {
    const { user } = UseAuth();
    const { transactionId } = useParams();
    const [invoiceData, setInvoiceData] = useState(null);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/invoice/payment/${transactionId}`)
            .then((res) => {
                setInvoiceData(res.data);
            })
            .catch((err) => {
                console.error("Error loading invoice:", err);
            });
    }, [transactionId, user, axiosSecure]);

    if (!invoiceData) {
        return (
            <div className="text-center py-10">
                <p className="text-lg text-gray-600">Loading invoice data...</p>
            </div>
        );
    }

    const dateObject = new Date(invoiceData.date);
    const formattedDate = `${dateObject.getMonth() + 1}/${dateObject.getDate()}/${dateObject.getFullYear()}`;

    const handleDownloadPDF = () => {
        const doc = new jsPDF({ unit: "pt", format: "a4" });
        const pageWidth = doc.internal.pageSize.getWidth();
        const marginLeft = 40;
        const marginRight = pageWidth - 40;
        let y = 60;
        const lineHeight = 22;

        doc.addImage(invoiceLogo, "PNG", marginLeft, y, 80, 80);
        doc.setFontSize(28).setFont("helvetica", "bold").text("Medicine Shop", marginLeft + 90, y + 50);
        doc.setFontSize(36).setFont("helvetica", "bold").text("Invoice", marginRight - 40, y + 50, { align: "right" });

        y += 100;
        doc.setFontSize(14).setFont("helvetica", "normal").text(`Date: ${formattedDate}`, marginRight - 40, y - 20, { align: "right" });

        y += 40;
        doc.setFontSize(18).setFont("helvetica", "bold").text("BILL TO:", marginLeft, y + 10);
        doc.setFontSize(14).setFont("helvetica", "normal");
        doc.text("Bangladesh Dhaka", marginLeft, y + lineHeight * 2);
        doc.text("123 Road", marginLeft, y + lineHeight * 3);

        doc.setFontSize(18).setFont("helvetica", "bold").text("Payment Information:", marginRight - 220, y + 10);
        doc.setFontSize(14).setFont("helvetica", "normal");
        const transactionText = doc.splitTextToSize(`Transaction ID: ${invoiceData.transactionId}`, 200);
        transactionText.forEach((line, i) => {
            doc.text(line, marginRight - 220, y + lineHeight * (2 + i));
        });
        doc.text(`Email: ${invoiceData.email}`, marginRight - 220, y + lineHeight * 4);

        y += lineHeight * 5;
        doc.setLineWidth(0.5).line(marginLeft, y, marginRight, y);
        y += lineHeight;

        doc.setFontSize(16).setFont("helvetica", "bold");
        doc.text("Name", marginLeft, y);
        doc.text("Qty", marginLeft + 160, y);
        doc.text("Unit Price", marginLeft + 240, y);
        doc.text("Total", marginLeft + 360, y);

        y += 12;
        doc.line(marginLeft, y, marginRight, y);
        y += lineHeight;


        doc.setFontSize(14).setFont("helvetica", "normal");

        const addNewPageIfNeeded = () => {
            if (y > doc.internal.pageSize.getHeight() - 60) {
                doc.addPage();
                y = 60;
            }
        };

        if (Array.isArray(invoiceData.name)) {
            invoiceData.name.forEach((name, index) => {
                addNewPageIfNeeded();
                const qty = invoiceData.quantity?.[index] || 1;
                const unitPrice = invoiceData.price?.[index] || 0;
                const lineTotal = qty * unitPrice;

                doc.text(name || "N/A", marginLeft, y);
                doc.text(`${qty}`, marginLeft + 160, y);
                doc.text(`${unitPrice}$`, marginLeft + 240, y);
                doc.text(`${lineTotal}$`, marginLeft + 360, y);
                y += lineHeight;
            });
        } else {
            const qty = invoiceData.quantity || 1;
            const unitPrice = invoiceData.price || 0;
            const lineTotal = qty * unitPrice;

            doc.text(invoiceData.name || "N/A", marginLeft, y);
            doc.text(`${qty}`, marginLeft + 160, y);
            doc.text(`${unitPrice}$`, marginLeft + 240, y);
            doc.text(`${lineTotal}$`, marginLeft + 360, y);
            y += lineHeight;
        }

        y += 30;
        doc.setFont("helvetica", "bold").text(`Total: ${invoiceData.totalprice || 0}$`, marginLeft + 360, y);

        y += 50;
        doc.setFontSize(18).setFont("helvetica", "bold").text("Buyer Information:", marginLeft, y);
        y += lineHeight;
        doc.setFontSize(14).setFont("helvetica", "normal").text(`Buyer Name: ${user?.displayName || "N/A"}`, marginLeft, y);
        y += lineHeight;
        doc.text(`Buyer Email: ${user?.email || "N/A"}`, marginLeft, y);

        doc.save("invoice.pdf");
    };


    return (
        <div className="max-w-7xl px-10 mx-auto">
            <div className="sm:flex my-14 justify-between items-center">
                <div className="flex justify-center items-center">
                    <img className="w-[150px] mb-8 sm:mb-0 rounded-full" src={invoiceLogo} alt="Logo" />
                    <h1 className="text-3xl">Medicine Shop</h1>
                </div>
                <div className="space-y-3 text-center">
                    <h1 className="text-5xl font-bold">Invoice</h1>
                    <p><strong>Date:</strong> {new Date(formattedDate).toLocaleString()}</p>
                </div>
            </div>

            <div className="sm:flex justify-between items-center">
                <div>
                    <h1 className="text-2xl mb-8 sm:mb-0 font-bold">BILL TO:</h1>
                    <p>Bangladesh Dhaka</p>
                    <p>123 Road</p>
                </div>
                <div className="space-y-3">
                    <h1 className="text-2xl font-bold">Payment Information:</h1>
                    <p>Payment Name: Stripe</p>
                    <p>TransactionId: {invoiceData.transactionId}</p>
                    <p>Email: {invoiceData.email}</p>
                </div>
            </div>

            <div className="overflow-x-auto mx-auto my-10">
                <table className="table">
                    <thead>
                        <tr className="text-lg text-neutral">
                            <th>Medicine Name</th>
                            <th>Order Date</th>
                            <th className="text-end">Quantity</th>
                            <th className="text-end">Unit Price</th>
                            <th className="text-end">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(invoiceData.name) ? (
                            invoiceData.name.map((name, index) => {
                                const qty = invoiceData.quantity?.[index] || 1;
                                const unitPrice = invoiceData.price?.[index] || 0;
                                const lineTotal = qty * unitPrice;

                                return (
                                    <tr key={index} className="text-neutral">
                                        <td>{name}</td>
                                        <td>{formattedDate}</td>
                                        <td className="text-end">{qty}</td>
                                        <td className="text-end">{unitPrice}$</td>
                                        <td className="text-end">{lineTotal}$</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr className="text-neutral">
                                <td>{invoiceData.name}</td>
                                <td>{formattedDate}</td>
                                <td className="text-end">{invoiceData.quantity || 1}</td>
                                <td className="text-end">{invoiceData.price}$</td>
                                <td className="text-end">
                                    {(invoiceData.quantity || 1) * invoiceData.price}$
                                </td>
                            </tr>
                        )}

                        <tr className="text-neutral font-bold border-t">
                            <td colSpan={4} className="text-right pr-2">Total:</td>
                            <td className="text-end">{invoiceData.totalprice || 0}$</td>
                        </tr>
                    </tbody>
                </table>

                <div className="my-14 sm:flex justify-between items-end">
                    <div className="space-y-3">
                        <h1 className="text-2xl font-bold">Buyer Information:</h1>
                        <h1>Buyer Name: {user?.displayName}</h1>
                        <p>Buyer Email: {user?.email}</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-center my-6">
                <button
                    className="uppercase bg-[#008c94] hover:bg-[#00727a] py-2 px-5 text-white font-bold rounded-lg transition"
                    onClick={handleDownloadPDF}
                >
                    Print
                </button>
            </div>
        </div>
    );
};

export default Invoice;
