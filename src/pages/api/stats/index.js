import orders from '../../../assets/database/orders.json';
import users from '../../../assets/database/users.json';

export default async function handler(req, res) {
  const totalAmount = orders?.filter(order => order?.status === 'completed').reduce((acc, order) => {
    return acc + Number(order?.totalPrice ?? 0);
  }, 0) ?? 0;
  const totalUsers = users?.length ?? 0;
  const totalOrders = orders?.length ?? 0;
  const newOrders = orders?.filter(order => order?.status === 'pending')?.length ?? 0;
  const enRouteOrders = orders?.filter(order => order?.status === 'enRoute')?.length ?? 0;
  const completedOrders = orders?.filter(order => order?.status === 'completed')?.length ?? 0;

  res.json({
    data: {
      totalAmount,
      totalUsers,
      totalOrders,
      newOrders,
      enRouteOrders,
      completedOrders
    }
  });
}
