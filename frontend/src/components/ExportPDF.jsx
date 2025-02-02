
import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ExportPDF = ({ elementRef }) => {
    const handleExportPDF = async () => {
        try {
            const element = elementRef.current;
            const canvas = await html2canvas(element);

            const pdf = new jsPDF('p', 'pt', 'a4'); 
            const imgData = canvas.toDataURL('image/png');

            const pdfWidth = pdf.internal.pageSize.getWidth();   
            const pdfHeight = pdf.internal.pageSize.getHeight(); 

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, 0);
            pdf.save('dashboard.pdf');
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    return (
        <button
            onClick={handleExportPDF}
            style={{
                backgroundColor: "#3b82f6", 
                color: "#fff", 
                padding: "10px 16px", 
                fontSize: "16px", 
                fontWeight: "bold",
                border: "none",
                borderRadius: "8px", 
                cursor: "pointer",
                transition: "background-color 0.3s ease, transform 0.2s ease",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}
            className="pdf-button"
            onMouseOver={(e) => e.target.style.backgroundColor = "#2563eb"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#3b82f6"}
            onMouseDown={(e) => e.target.style.transform = "scale(0.95)"}
            onMouseUp={(e) => e.target.style.transform = "scale(1)"}
        >
            Download to PDF
        </button>

    );
};

export default ExportPDF;
