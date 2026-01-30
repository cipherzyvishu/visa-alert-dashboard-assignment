import express from "express";
import { readAlerts, writeAlerts } from "../utils/fileDb.js";
import { randomUUID } from "crypto";

const router = express.Router();

const VISA_TYPES = ["Tourist", "Student", "Business"];
const STATUS_TYPES = ["Active", "Booked", "Expired"];
//GET route
router.get("/", (req, res, next) => {
  try {
    let alerts = readAlerts();

    const { country, status } = req.query;

    if (country) {
      alerts = alerts.filter((a) => a.country.toLowerCase() === country.toLowerCase());
    }

    if (status) {
      alerts = alerts.filter((a) => a.status === status);
    }

    return res.status(200).json(alerts);
  } catch (err) {
    next(err);
  }
});

//POST a new alert
router.post("/", (req, res, next) => {
  try {
    const { country, city, visaType } = req.body;

    if (!city || !country || !visaType) {
      return res.status(400).json({
        message: "country, city and visaType are required",
      });
    }

    if (!VISA_TYPES.includes(visaType)) {
      return res.status(400).json({
        message: "Invalid visaType. Must be Tourist, Business, or Student.",
      });
    }

    const alerts = readAlerts();

    const newAlert = {
      id: randomUUID(),
      country,
      city,
      visaType,
      status: "Active",
      createdAt: new Date().toISOString(),
    };

    alerts.push(newAlert);
    writeAlerts(alerts);

    return res.status(201).json({
      message: "alert created successfully",
      alert: newAlert,
    });
  } catch (err) {
    next(err);
  }
});

//Update the status of an alert

router.put("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: "status is required",
      });
    }

    if (!STATUS_TYPES.includes(status)) {
      return res.status(400).json({
        message: "Invalid status. must be Active, Booked, or Expired",
      });
    }

    const alerts = readAlerts();

    const alert = alerts.find((a) => a.id === id);

    if (!alert) {
      return res.status(404).json({
        message: "alert not found",
      });
    }

    alert.status = status;

    writeAlerts(alerts);

    return res.status(200).json({
      message: "Alert status updated successfully",
      alert,
    });
  } catch (err) {
    next(err);
  }
});

//dELETE an alert

router.delete("/:id", (req, res, next) => {
  try {
    const { id } = req.params;

    let alerts = readAlerts();

    const exists = alerts.some((a) => a.id === id);

    if (!exists) {
      return res.status(404).json({
        message: "alert not found",
      });
    }

    alerts = alerts.filter((a) => a.id !== id);

    writeAlerts(alerts);

    return res.status(200).json({
      message: "alert deleted succensfully",
    });
  } catch (err) {
    next(err);
  }
});
export default router;
