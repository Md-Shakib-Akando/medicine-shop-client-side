import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { jsPDF } from "jspdf";

import invoiceLogo from '/logo.png';



import UseAuth from "../../../UseAuth";
import axios from "axios";

const Invoice = () => {
    const { user } = UseAuth();
    const { transactionId } = useParams();
    const [invoiceData, setInvoiceData] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/invoice/payment/${transactionId}`)
            .then((response) => {
                setInvoiceData(response.data);
                console.log("Invoice data:", response.data);
            })
            .catch((error) => {
                console.error("Error loading invoice:", error);
            });
    }, [transactionId]);

    const handleDownloadPDF = () => {
        if (!invoiceData) {
            console.error("Invoice data not ready");
            return;
        }

        const doc = new jsPDF({ unit: "pt", format: "a4" });
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        const marginLeft = 40;
        const marginRight = pageWidth - 40;
        let y = 60;
        const lineHeight = 22;


        doc.addImage(invoiceLogo, "PNG", marginLeft, y, 80, 80);
        doc.setFontSize(28);
        doc.setFont("helvetica", "bold");
        doc.text("Medicine Shop", marginLeft + 90, y + 50);

        doc.setFontSize(36);
        doc.text("Invoice", marginRight - 40, y + 50, { align: "right" });


        y += 100;


        doc.setFontSize(14);
        doc.setFont("helvetica", "normal");
        doc.text(`Date: ${formattedDate}`, marginRight - 40, y - 20, { align: "right" });

        y += 40;


        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text("BILL TO:", marginLeft, y);
        doc.setFontSize(14);
        doc.setFont("helvetica", "normal");
        doc.text("Bangladesh Dhaka", marginLeft, y + lineHeight);
        doc.text("123 Road", marginLeft, y + lineHeight * 2);
        doc.text("Malibag", marginLeft, y + lineHeight * 3);


        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text("Payment Information:", marginRight - 220, y);
        doc.setFontSize(14);
        doc.setFont("helvetica", "normal");
        doc.text(`Payment Name: Stripe`, marginRight - 220, y + lineHeight);
        const transactionText = doc.splitTextToSize(`Transaction ID: ${invoiceData.transactionId}`, 200);
        transactionText.forEach((line, i) => {
            doc.text(line, marginRight - 220, y + lineHeight * (2 + i));
        });
        doc.text(`Email: ${invoiceData.email}`, marginRight - 220, y + lineHeight * 4);

        y += lineHeight * 5;


        doc.setLineWidth(0.5);
        doc.line(marginLeft, y, marginRight, y);

        y += lineHeight;

        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("Medicine Name", marginLeft, y);
        doc.text("Order Date", marginLeft + 220, y);
        doc.text("Price", marginLeft + 400, y);

        y += 12;
        doc.line(marginLeft, y, marginRight, y);
        y += lineHeight;

        doc.setFontSize(14);
        doc.setFont("helvetica", "normal");


        const addNewPageIfNeeded = () => {
            if (y > pageHeight - 60) {
                doc.addPage();
                y = 60;
            }
        };

        if (Array.isArray(invoiceData.name)) {
            invoiceData.name.forEach((name, index) => {
                addNewPageIfNeeded();
                doc.text(name || "N/A", marginLeft, y);
                doc.text(new Date(invoiceData.date).toLocaleDateString(), marginLeft + 220, y);


                const price = Array.isArray(invoiceData.price) ? invoiceData.price[index] : invoiceData.price;
                doc.text(`${price || 0}$`, marginLeft + 400, y);

                y += lineHeight;
            });
        } else if (typeof invoiceData.name === "string") {
            addNewPageIfNeeded();
            doc.text(invoiceData.name || "N/A", marginLeft, y);
            doc.text(new Date(invoiceData.date).toLocaleDateString(), marginLeft + 220, y);
            doc.text(`${invoiceData.price || 0}$`, marginLeft + 400, y);
            y += lineHeight;
        }



        y += 50;


        doc.setFontSize(18);
        doc.text("Buyer Information:", marginLeft, y);
        y += lineHeight;
        doc.setFontSize(14);
        doc.setFont("helvetica", "normal");
        doc.text(`Buyer Name: ${user?.displayName || "N/A"}`, marginLeft, y);
        y += lineHeight;
        doc.text(`Buyer Email: ${user?.email || "N/A"}`, marginLeft, y);


        doc.save("invoice.pdf");
    };


    if (!invoiceData) {
        return (
            <div className="text-center py-10">
                <p className="text-lg text-gray-600">Loading invoice data...</p>
            </div>
        );
    }

    const dateFromMongoDB = invoiceData.date;
    const dateObject = new Date(dateFromMongoDB);
    const formattedDate = `${dateObject.getMonth() + 1}/${dateObject.getDate()}/${dateObject.getFullYear()}`;




    return (
        <div>

            <div className="max-w-7xl px-10 mx-auto">


                <div>
                    <div className="sm:flex my-14 justify-between items-center">
                        <div className="flex  justify-center items-center ">
                            <img
                                className="w-[150px] mb-8 sm:mb-0 rounded-full"
                                src={invoiceLogo}
                                alt=""
                            />
                            <h1 className="text-3xl">Medicine Shop</h1>
                        </div>
                        <div className="space-y-3 text-center">
                            <h1 className="text-5xl font-bold">Invoice</h1>

                            <p>
                                <strong>Date:</strong>{" "}
                                {new Date(formattedDate).toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <div className="sm:flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl mb-8 sm:mb-0 font-bold">BILL TO:</h1>
                            <p>Bangladesh Dhaka</p>
                            <p>123 Road</p>
                            <p>Malibag</p>
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
                                    <th className="text-end">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(invoiceData.name) ? (
                                    invoiceData.name.map((name, index) => (
                                        <tr key={index} className="text-neutral">
                                            <td>{name}</td>
                                            <td>{formattedDate}</td>
                                            <td className="text-end">
                                                {Array.isArray(invoiceData.price)
                                                    ? invoiceData.price[index]
                                                    : invoiceData.price}
                                                $
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="text-neutral">
                                        <td>{invoiceData.name}</td>
                                        <td>{formattedDate}</td>
                                        <td className="text-end">{invoiceData.price}$</td>
                                    </tr>
                                )}
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
                </div>

                <div className="flex justify-center my-6">
                    <button
                        className="uppercase bg-[#008c94] hover:bg-[#00727a] py-2 px-5 text-white font-bold rounded-lg transition"
                        onClick={handleDownloadPDF}
                    >
                        Pdf Download
                    </button>

                </div>
            </div>

        </div>
    );
};

export default Invoice;
