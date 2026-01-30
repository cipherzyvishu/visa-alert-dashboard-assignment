import { useEffect, useState } from "react";
import { fetchAlerts } from "./api/alertsApi";

import AlertForm from "./components/AlertForm";
import AlertsTable from "./components/AlertTable";

export default function App() {
  const [alerts, setAlerts] = useState([]);

  // Filter state
  const [countryFilter, setCountryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Load alerts with filters
  const loadAlerts = async () => {
    const filters = {}

    if(countryFilter.trim() !== "") {
      filters.country = countryFilter.trim()
    }
    if(statusFilter !== "") {
      filters.status = statusFilter
    }
    const data = await fetchAlerts(filters);

    setAlerts(data);
  };

  useEffect(() => {
    loadAlerts();
  }, [countryFilter, statusFilter]);

  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 to-white p-10">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-10">
        Flying Panda – Visa Alerts Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Form */}
        <AlertForm refresh={loadAlerts} />

        {/* Right Table */}
        <div className="md:col-span-2 space-y-6">
          {/* Filters */}
          <div className="flex gap-4">
            {/* Country Filter */}
            <input
              type="text"
              placeholder="Filter by Country..."
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="p-3 border rounded-xl w-full"
            />

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-3 border rounded-xl"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Booked">Booked</option>
              <option value="Expired">Expired</option>
            </select>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setCountryFilter("");
                setStatusFilter("");
              }}
              className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
            >
              Clear
            </button>
          </div>

          {/* Alerts Table */}
          <AlertsTable alerts={alerts} refresh={loadAlerts} />
        </div>
      </div>
    </div>
  );
}
