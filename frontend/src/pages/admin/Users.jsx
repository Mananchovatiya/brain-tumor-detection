import { useEffect, useState } from "react";
import { getUsers, toggleUserActive } from "../../services/adminService";
import { SkeletonTable } from "../../components/Skeleton";

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data.users);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggle = async (id) => {
    try {
      await toggleUserActive(id);
      fetchUsers(); // refresh list to reflect the new status
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update user.");
    }
  };

  if (loading) return <p className="text-neutral-500">Loading users...</p>;

  return (
    <div>
      <h1 className="page-heading">All Users</h1>
      {error && <p className="mt-4 text-sm text-danger-600">{error}</p>}

      <div className="mt-6 overflow-x-auto">
        <table className="table-base">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td className="capitalize">{u.role}</td>
                <td>
                  <span className={u.isActive ? "badge-success" : "badge-danger"}>
                    {u.isActive ? "Active" : "Deactivated"}
                  </span>
                </td>
                <td>
                  <button onClick={() => handleToggle(u._id)} className="btn-secondary !px-3 !py-1 text-xs">
                    {u.isActive ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
