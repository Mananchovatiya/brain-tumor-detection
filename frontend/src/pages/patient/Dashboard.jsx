import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getScans, getScanResult } from "../../services/scanService";
import { SkeletonCards, SkeletonTable } from "../../components/Skeleton";

function Dashboard() {
  const { user } = useAuth();
  const [scans, setScans] = useState([]);
  const [recentWithResults, setRecentWithResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await getScans();
        const allScans = res.data.scans; // already sorted newest-first by the backend

        setScans(allScans);

        // For the 5 most recent scans, also fetch their prediction (if completed)
        // so we can show prediction/confidence in the table below.
        const recentFive = allScans.slice(0, 5);
        const withResults = await Promise.all(
          recentFive.map(async (scan) => {
            if (scan.status !== "completed") return { scan, prediction: null };
            try {
              const resultRes = await getScanResult(scan._id);
              return { scan, prediction: resultRes.data.prediction };
            } catch {
              return { scan, prediction: null };
            }
          })
        );
        setRecentWithResults(withResults);
      } catch (err) {
        // Keep the dashboard usable even if stats fail to load — an empty
        // state is fine here, no need to block the whole page on an error.
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const totalScans = scans.length;
  const completedScans = scans.filter((s) => s.status === "completed").length;
  const latestCompleted = recentWithResults.find((r) => r.prediction);
  const latestResult = latestCompleted ? latestCompleted.prediction.predictedClass : "—";

  return (
    <div>
      <h1 className="page-heading">Welcome, {user?.name}</h1>

      {loading ? (
        <div className="mt-6">
          <SkeletonCards count={3} />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="card text-center">
            <h3 className="text-3xl font-bold text-neutral-900">{totalScans}</h3>
            <p className="mt-1 text-sm text-neutral-500">Total Scans</p>
          </div>
          <div className="card text-center">
            <h3 className="text-3xl font-bold text-neutral-900">{completedScans}</h3>
            <p className="mt-1 text-sm text-neutral-500">Completed</p>
          </div>
          <div className="card text-center">
            <h3 className="text-3xl font-bold text-neutral-900">{latestResult}</h3>
            <p className="mt-1 text-sm text-neutral-500">Latest Result</p>
          </div>
        </div>
      )}

      <Link to="/patient/upload" className="btn-primary mt-6 inline-block">
        Upload New MRI
      </Link>

      <h2 className="page-heading mt-10 text-lg">Recent Scans</h2>
      <div className="mt-3 overflow-x-auto">
        {loading ? (
          <SkeletonTable columns={3} rows={4} />
        ) : (
          <table className="table-base">
            <thead>
              <tr>
                <th>Date</th>
                <th>Prediction</th>
                <th>Confidence</th>
              </tr>
            </thead>
            <tbody>
              {recentWithResults.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center text-neutral-400">No scans yet.</td>
                </tr>
              ) : (
                recentWithResults.map(({ scan, prediction }) => (
                  <tr key={scan._id}>
                    <td>{new Date(scan.uploadDate).toLocaleDateString()}</td>
                    <td>{prediction ? prediction.predictedClass : "—"}</td>
                    <td>{prediction ? `${Math.round(prediction.confidence * 100)}%` : "—"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
