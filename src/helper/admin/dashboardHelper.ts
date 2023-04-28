import { IBooking } from "../../interface/interface";
import bookingCollection from "../../model/bookingModel";
import userCollection from "../../model/userModel";

interface ITotal {
  revenue: any[];
  bookings: number;
  users: number;
}
export const dashboardHelper = {
  async getTotal() {
    try {
      const [totalRevenue, totalCompletedBookings, totalUsers] =
        await Promise.all([
          bookingCollection.aggregate([
            { $match: { status: "completed" } },
            { $group: { _id: null, total: { $sum: "$totalCharge" } } },
            { $project: { _id: 0 } },
          ]),
          bookingCollection.find({ status: "completed" }).count(),
          userCollection.find().count(),
        ]);
      const total = {
        totalRevenue: totalRevenue[0]?.total,
        totalCompletedBookings,
        totalUsers,
      };
      return total;
    } catch (error) {
      throw new Error();
    }
  },

  // helper function to fetch count of bookings based on the status
  async getCount(): Promise<IBooking[]> {
    try {
      const bookingDetails: IBooking[] = await bookingCollection.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]);

      return bookingDetails;
    } catch (error) {
      throw new Error("failed to fetch booking details for admin dashboard");
    }
  },

  async getWeeklyRevenue() {
    try {
      const result = await bookingCollection.aggregate([
        {
          $match: {
            payment: true,
            date: {
              $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
              $lt: new Date(),
            },
          },
        },
        {
          $group: {
            _id: { $dayOfWeek: "$date" },
            total: { $sum: "$totalCharge" },
          },
        },
        { $project: { day: "$_id", total: 1, _id: 0 } },
      ]);
      return result;
    } catch (error) {
      throw new Error("failed to fetch weekly revenue details for admin dashboard");
    }
  },
};
