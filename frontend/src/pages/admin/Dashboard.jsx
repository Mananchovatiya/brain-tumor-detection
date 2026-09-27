import { useEffect, useState } from "react";
import { getStats } from "../../services/adminService";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getStats();
        setStats(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load stats.");
      }
    };

    fetchStats();
  }, []);

  if (error) return <p className="text-sm text-danger-600">{error}</p>;
  if (!stats) return <p className="text-neutral-500">Loading stats...</p>;

  return (
    <div>
      <h1 className="page-heading">Admin Dashboard</h1>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card text-center">
          <h3 className="text-3xl font-bold text-neutral-900">{stats.totalUsers}</h3>
          <p className="mt-1 text-sm text-neutral-500">Total Users</p>
        </div>
        <div className="card text-center">
          <h3 className="text-3xl font-bold text-neutral-900">{stats.totalDoctors}</h3>
          <p className="mt-1 text-sm text-neutral-500">Total Doctors</p>
        </div>
        <div className="card text-center">
          <h3 className="text-3xl font-bold text-neutral-900">{stats.totalPatients}</h3>
          <p className="mt-1 text-sm text-neutral-500">Total Patients</p>
        </div>
        <div className="card text-center">
          <h3 className="text-3xl font-bold text-neutral-900">{stats.totalScans}</h3>
          <p className="mt-1 text-sm text-neutral-500">Total Scans</p>
        </div>
      </div>

      <h2 className="page-heading mt-8 text-lg">Prediction Distribution</h2>
      <div className="mt-3 overflow-x-auto">
        <table className="table-base">
          <thead>
            <tr>
              <th>Class</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {stats.predictionDistribution.length === 0 ? (
              <tr>
                <td colSpan="2" className="text-center text-neutral-400">
                  No analyses run yet.
                </td>
              </tr>
            ) : (
              stats.predictionDistribution.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.count}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
