import { useEffect, useState } from "react";
import API from "../api";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");
      setEmployees(res.data.data || res.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  // 🗑️ DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await API.delete(`/employees/${id}`);
      fetchEmployees();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  

  // ✏️ START EDIT
  const handleEdit = (employee) => {
    setEditingEmployee(employee.id);
    setFormData({
      first_name: employee.first_name,
      last_name: employee.last_name,
      job_title: employee.job_title,
      country: employee.country,
      salary: employee.salary,
      department: employee.department || ""
    });
  };

  // ✏️ INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 💾 UPDATE
  const handleUpdate = async () => {
    setLoading(true);

    try {
      await API.put(`/employees/${editingEmployee}`, {
        employee: formData
      });

      setEditingEmployee(null);
      fetchEmployees();
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Employees</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Job</th>
            <th>Country</th>
            <th>Salary</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((e) => (
            <tr key={e.id}>
              {editingEmployee === e.id ? (
                <>
                  <td>
                    <input
                      name="first_name"
                      value={formData.first_name || ""}
                      onChange={handleChange}
                    />
                  </td>

                  <td>
                    <input
                      name="last_name"
                      value={formData.last_name || ""}
                      onChange={handleChange}
                    />
                  </td>

                  <td>
                    <input
                      name="job_title"
                      value={formData.job_title || ""}
                      onChange={handleChange}
                    />
                  </td>

                  <td>
                    <input
                      name="country"
                      value={formData.country || ""}
                      onChange={handleChange}
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      name="salary"
                      value={formData.salary || ""}
                      onChange={handleChange}
                    />
                  </td>

                  <td>
                    <input
                      name="department"
                      value={formData.department || ""}
                      onChange={handleChange}
                    />
                  </td>

                  <td>
                    <button onClick={handleUpdate} disabled={loading}>
                      {loading ? "Saving..." : "Save"}
                    </button>
                    <button onClick={() => setEditingEmployee(null)}>
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{e.first_name}</td>
                  <td>{e.last_name}</td>
                  <td>{e.job_title}</td>
                  <td>{e.country}</td>
                  <td>{e.salary}</td>
                  <td>{e.department}</td>

                  <td>
                    <button onClick={() => handleEdit(e)}>Edit</button>
                    <button onClick={() => handleDelete(e.id)}>
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}