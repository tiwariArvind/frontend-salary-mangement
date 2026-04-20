// src/components/EmployeeList.js
import { useEffect, useState } from "react";
import API from "../api";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    API.get("/employees").then(res => setEmployees(res.data));
  }, []);

  return (
    <div>
      <h2>Employees</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Job</th>
            <th>Country</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(e => (
            <tr key={e.id}>
              <td>{e.full_name}</td>
              <td>{e.job_title}</td>
              <td>{e.country}</td>
              <td>{e.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}