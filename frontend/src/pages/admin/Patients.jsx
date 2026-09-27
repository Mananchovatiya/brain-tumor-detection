import { useEffect, useState } from "react";
import { getUsers } from "../../services/adminService";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await getUsers("patient");
        setPatients(res.data.users);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load patients.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) return <p className="text-neutral-500">Loading patients...</p>;

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
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {patients.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-neutral-400">
                  No patients yet.
                </td>
              </tr>
            ) : (
              patients.map((p) => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>{p.email}</td>
                  <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span className={p.isActive ? "badge-success" : "badge-danger"}>
                      {p.isActive ? "Active" : "Deactivated"}
                    </span>
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
