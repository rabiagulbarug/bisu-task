import orders from '../../../assets/database/orders.json';
import users from '../../../assets/database/users.json';

export default async function handler(req, res) {
  const totalAmount = orders.filter(order => order.status === 'completed').reduce((acc, order) => {
    return acc + Number(order.totalPrice);
  }, 0);
  const totalUsers = users.length;
  const totalOrders = orders.length;
  const newOrders = orders.filter(order => order.status === 'pending').length;
  const enRouteOrders = orders.filter(order => order.status === 'enRoute').length;
  const completedOrders = orders.filter(order => order.status === 'completed').length;

  res.json({
    data: {
      totalAmount,
      totalUsers,
      totalOrders,
      newOrders,
      enRouteOrders,
      completedOrders
    }
  }).status(200);
}
