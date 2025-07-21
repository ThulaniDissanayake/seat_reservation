import { useEffect, useState } from 'react';
import api from '../api/api';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const SeatUsageReport = () => {
  const [reportData, setReportData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

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
    doc.text('Seat Usage Report', 14, 20);

    const tableColumn = ["Seat Number", "Location", "Total Reservations"];
    const tableRows = reportData.map(item => [
      item.seatNumber,
      item.location,
      item.total_reservations
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save('Seat_Usage_Report.pdf');
  };

  if (loading) return <p>Loading report...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  const pageStyle = {
    backgroundColor: '#e0e0e0',
    minHeight: '100vh',
    padding: '40px 0',
  };

  const containerStyle = {
    maxWidth: '700px',
    margin: '0 auto',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  };

  const headingStyle = {
    color: '#f0a500',
    marginBottom: '25px',
    textAlign: 'center',
  };

  const buttonStyle = {
    marginBottom: '20px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  };

  const tableHeaderStyle = {
    backgroundColor: '#f0a500',
    color: '#fff',
  };

  const tableCellStyle = {
    padding: '8px',
    border: '1px solid #ddd',
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h2 style={headingStyle}>Seat Usage Report</h2>

        <button onClick={handleDownloadPDF} style={buttonStyle}>
          Download as PDF
        </button>

        {reportData.length === 0 ? (
          <p>No data available.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={tableHeaderStyle}>
                <th style={tableCellStyle}>Seat Number</th>
                <th style={tableCellStyle}>Location</th>
                <th style={tableCellStyle}>Total Reservations</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map(({ id, seatNumber, location, total_reservations }) => (
                <tr key={id} style={{ textAlign: 'center' }}>
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
