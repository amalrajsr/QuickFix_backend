import serviceCollection from "../../model/serviceModel";
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

  // helper function to fetch count of bookings based on the status and count of bookings based on the service
  async getCount() {
    const [serviceDetails, bookingDetails] = await Promise.all([
      serviceCollection.find({},{service:1,bookings:1,_id:0}),
      bookingCollection.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
    ]);

    return {serviceDetails,bookingDetails}
  },
};
