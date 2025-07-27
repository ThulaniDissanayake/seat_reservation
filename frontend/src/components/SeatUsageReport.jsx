import { useEffect, useState } from 'react';
import api from '../api/api';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FaFilePdf } from 'react-icons/fa';

const SeatUsageReport = () => {
  const [reportData, setReportData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [hoverPdf, setHoverPdf] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await api.get('/seats/report');
        setReportData(res.data);
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load report');
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

   
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    const pageWidth = doc.internal.pageSize.getWidth();
    const title = 'Seat Usage Report';
    const textWidth = doc.getTextWidth(title);
    const x = (pageWidth - textWidth) / 2;
    doc.text(title, x, 20);

    const tableColumn = ['Seat Number', 'Location', 'Total Reservations'];
    const tableRows = reportData.map(item => [
      item.seatNumber,
      item.location,
      item.total_reservations
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: {
        fontSize: 10,
        halign: 'center',
      },
      headStyles: {
        fillColor: [0, 102, 204], 
        textColor: 255,
        halign: 'center',
        fontStyle: 'bold',
      },
    });

    doc.save('Seat_Usage_Report.pdf');
  };

  if (loading) return <p style={{ textAlign: 'center', marginTop: '30px' }}>Loading report...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center', marginTop: '30px' }}>{error}</p>;

  const pageStyle = {
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    padding: '40px 20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    position: 'relative',
  };

  const containerStyle = {
    maxWidth: '720px',
    margin: '0 auto',
    backgroundColor: 'rgba(255, 255, 255, 0.75)', 
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 6px 15px rgba(240, 165, 0, 0.25)',
    border: '1px solid #f0a500',
  };

  const headingStyle = {
    color: '#18140bff',
    marginBottom: '25px',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: '2rem',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0 4px 12px rgba(240, 165, 0, 0.15)',
    borderRadius: '10px',
    overflow: 'hidden',
  };

  const tableHeaderStyle = {
    backgroundColor: '#f46e49ff',
    color: '#fff',
    textAlign: 'center',
    padding: '12px',
    fontWeight: '700',
    fontSize: '1rem',
  };

  const tableCellStyle = {
    padding: '12px',
    border: '1px solid #ffffffff',
    textAlign: 'center',
    fontSize: '0.95rem',
    color: '#555',
  };

  const pdfIconStyle = {
    position: 'fixed',
    top: '80px',
    right: '20px',
    color: '#c91003ff',
    fontSize: '2.8rem',
    cursor: 'pointer',
    zIndex: 1000,
    filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.3))',
  };

  const tooltipStyle = {
    position: 'fixed',
    top: '60px',
    right: '15px',
    backgroundColor: '#333',
    color: '#fff',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '0.85rem',
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    opacity: hoverPdf ? 1 : 0,
    transition: 'opacity 0.3s',
    zIndex: 1001,
  };

  return (
    <div style={pageStyle}>
      <FaFilePdf
        style={pdfIconStyle}
        onClick={handleDownloadPDF}
        onMouseEnter={() => setHoverPdf(true)}
        onMouseLeave={() => setHoverPdf(false)}
        title="Download the report as a PDF"
        aria-label="Download the report as a PDF"
      />
      <div style={tooltipStyle}>Download the report as a PDF</div>

      <div style={containerStyle}>
        <h2 style={headingStyle}>Seat Usage Report</h2>

        {reportData.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888' }}>No data available.</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Seat Number</th>
                <th style={tableHeaderStyle}>Location</th>
                <th style={tableHeaderStyle}>Total Reservations</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map(({ id, seatNumber, location, total_reservations }) => (
                <tr key={id}>
                  <td style={tableCellStyle}>{seatNumber}</td>
                  <td style={tableCellStyle}>{location}</td>
                  <td style={tableCellStyle}>{total_reservations}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SeatUsageReport;
