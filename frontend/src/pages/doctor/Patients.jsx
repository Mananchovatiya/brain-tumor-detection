import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPatients } from "../../services/doctorService";
import { SkeletonTable } from "../../components/Skeleton";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await getPatients();
        setPatients(res.data.patients);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load patients.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) {
    return (
      <div>
        <h1 className="page-heading">Patients</h1>
        <div className="mt-6 overflow-x-auto">
          <SkeletonTable columns={4} rows={4} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-heading">Patients</h1>

      {error && <p className="mt-4 text-sm text-danger-600">{error}</p>}

      <div className="mt-6 overflow-x-auto">
        <table className="table-base">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Joined</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-neutral-400">
                  No patients found.
                </td>
              </tr>
            ) : (
              patients.map((patient) => (
                <tr key={patient._id}>
                  <td>{patient.name}</td>
                  <td>{patient.email}</td>
                  <td>{new Date(patient.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Link
                      to={`/doctor/patients/${patient._id}`}
                      className="font-medium text-primary-600 hover:text-primary-700"
                    >
                      View
                    </Link>
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

export default Patients;
