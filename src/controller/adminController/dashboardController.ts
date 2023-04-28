import { dashboardHelper } from "../../helper/admin/dashboardHelper";
import asyncHandler from "express-async-handler";

export const getDashboardDetails = asyncHandler(async (req, res) => {
  const [total, bookingDetails, revenueDetails] = await Promise.all([
    dashboardHelper.getTotal(), // fectch total revenue ,total completed bookings and total users
    dashboardHelper.getCount(), // group bookings based on status
    dashboardHelper.getWeeklyRevenue(), // fetch weekly revenue
  ]);

  res.json({
    success: true,
     total,
     bookingDetails,
     revenueDetails
  });
});

