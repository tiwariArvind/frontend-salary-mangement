// src/components/Insights.js
import { useState } from "react";
import API from "../api";

export default function Insights() {
  const [country, setCountry] = useState("");
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const res = await API.get("/insights/salary_by_country", {
      params: { country }
    });
    setData(res.data);
  };

  return (
    <div>
      <h2>Salary Insights</h2>
      <input onChange={(e) => setCountry(e.target.value)} placeholder="Country" />
      <button onClick={fetchData}>Get Insights</button>

      {data && (
        <div>
          <p>Min: {data.min_salary}</p>
          <p>Max: {data.max_salary}</p>
          <p>Avg: {data.avg_salary}</p>
        </div>
      )}
    </div>
  );
}
