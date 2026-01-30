import { useState } from "react";
import { createAlert } from "../api/alertsApi";

const AlertForm = ({ refresh }) => {
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    visaType: "Tourist",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createAlert(formData);

    refresh();

    setFormData({ country: "", city: "", visaType: "Tourist" });
  };
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Create Visa Alert
      </h2>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Country */}
        <div>
          <label className="block text-gray-600 font-medium mb-2">
            Country
          </label>
          <input
            type="text"
            value={formData.country}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-teal-400 outline-none"
            placeholder="Enter Country"
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
          />
        </div>
        {/* City */}
        <div>
          <label className="block text-gray-600 font-medium mb-2">City</label>
          <input
            type="text"
            value={formData.city}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-teal-400 outline-none"
            placeholder="Enter City"
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>
        {/* VisaType */}
        <div>
          <label className="block text-gray-600 font-medium mb-2">
            VisaType
          </label>
          <select
            value={formData.visaType}
            onChange={(e) =>
              setFormData({ ...formData, visaType: e.target.value })
            }
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-teal-400 outline-none"
          >
            <option>Tourist</option>
            <option>Student</option>
            <option>Business</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-xl transition"
        >
          Create Alert
        </button>
      </form>
    </div>
  );
};
export default AlertForm;
