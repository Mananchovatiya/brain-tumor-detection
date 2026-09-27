import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPatientById, getPatientScans } from "../../services/doctorService";

function PatientDetail() {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [scans, setScans] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientRes, scansRes] = await Promise.all([
          getPatientById(patientId),
          getPatientScans(patientId),
        ]);
        setPatient(patientRes.data.patient);
        setScans(scansRes.data.scans);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load patient data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [patientId]);

  if (loading) return <p className="text-neutral-500">Loading patient...</p>;
  if (error) return <p className="text-sm text-danger-600">{error}</p>;

  return (
    <div>
      <h1 className="page-heading">{patient.name}</h1>
      <p className="page-subheading">{patient.email}</p>

      <h2 className="page-heading mt-8 text-lg">Scan History</h2>
      <div className="mt-3 overflow-x-auto">
        <table className="table-base">
          <thead>
            <tr>
              <th>Scan ID</th>
              <th>Upload Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {scans.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-neutral-400">
                  No scans uploaded by this patient yet.
                </td>
              </tr>
            ) : (
              scans.map((scan) => (
                <tr key={scan._id}>
                  <td>{scan.scanId}</td>
                  <td>{new Date(scan.uploadDate).toLocaleDateString()}</td>
                  <td className="capitalize">{scan.status}</td>
                  <td>
                    {scan.status === "completed" ? (
                      <Link
                        to={`/doctor/scans/${scan._id}`}
                        className="font-medium text-primary-600 hover:text-primary-700"
                      >
                        Review
                      </Link>
                    ) : (
                      <span className="text-neutral-400">—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientDetail;
