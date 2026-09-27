import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPatients } from "../../services/doctorService";

function Dashboard() {
  const [totalPatients, setTotalPatients] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getPatients();
        setTotalPatients(res.data.patients.length);
      } catch (err) {
        // Fail quietly on the dashboard — the Patients page will show the real error.
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="page-heading">Doctor Dashboard</h1>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="card text-center">
          <h3 className="text-3xl font-bold text-neutral-900">{loading ? "…" : totalPatients}</h3>
          <p className="mt-1 text-sm text-neutral-500">Total Patients</p>
        </div>
        <div className="card text-center">
          <h3 className="text-3xl font-bold text-neutral-900">—</h3>
          <p className="mt-1 text-sm text-neutral-500">Pending Reviews</p>
        </div>
        <div className="card text-center">
          <h3 className="text-3xl font-bold text-neutral-900">—</h3>
          <p className="mt-1 text-sm text-neutral-500">Completed Reviews</p>
        </div>
      </div>

      <Link to="/doctor/patients" className="btn-primary mt-6 inline-block">
        View All Patients
      </Link>
    </div>
  );
}

export default Dashboard;
