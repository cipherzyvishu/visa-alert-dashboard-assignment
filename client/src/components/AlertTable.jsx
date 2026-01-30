import { deleteAlert, updateAlertStatus } from "../api/alertsApi";
import StatusBadge from "./StatusBadge";

const AlertTable = ({ alerts, refresh }) => {
  return (
    <div className="bg-white p-6 shadow-md rounded-2xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Visa Alerts
      </h2>

      <table className="w-full text-left border-collapse">
        {/* Table Head */}
        <thead>
          <tr className="text-gray-500 border-b">
            <th className="py-3">Country</th>
            <th className="py-3">City</th>
            <th className="py-3">Visa Type</th>
            <th className="py-3">Status</th>
            <th className="py-3">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {alerts.map((alert) => (
            <tr
              key={alert.id}
              className="border-b hover:bg-gray-50 transition"
            >
              {/* Country */}
              <td className="py-4 font-medium">{alert.country}</td>

              {/* City */}
              <td>{alert.city}</td>

              {/* Visa Type */}
              <td>{alert.visaType}</td>

              {/* Status Badge */}
              <td>
                <StatusBadge status={alert.status} />
              </td>

              {/* Actions */}
              <td className="flex gap-3 py-4">
                {/* Mark Booked */}
                <button
                  disabled={alert.status === "Booked"}
                  onClick={async () => {
                    await updateAlertStatus(alert.id, "Booked");
                    refresh();
                  }}
                  className="px-4 py-2 bg-teal-500 text-white rounded-xl 
                             hover:bg-teal-600 
                             disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Mark Booked
                </button>

                {/* Mark Expired */}
                <button
                  disabled={alert.status === "Expired"}
                  onClick={async () => {
                    await updateAlertStatus(alert.id, "Expired");
                    refresh();
                  }}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-xl 
                             hover:bg-yellow-600 
                             disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Mark Expired
                </button>

                {/* Delete Alert */}
                <button
                  onClick={async () => {
                    await deleteAlert(alert.id);
                    refresh();
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {/* Empty State */}
          {alerts.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-400">
                No alerts yet. Create one!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AlertTable;
