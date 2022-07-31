import orders from '../../../assets/database/orders.json';
import users from '../../../assets/database/users.json';

export default async function handler(req, res) {
  const {status} = req.query;
  const mapUsers = order => ({...order, customer: users.find(t => Number(t.id) === Number(order.customerId))});

  switch (status) {
    case 'pending':
      res.json({data: orders.map(mapUsers).filter(order => order.status === 'pending')}).status(200);
      break;
    case 'enRoute':
      res.json({data: orders.map(mapUsers).filter(order => order.status === 'enRoute')}).status(200);
      break;
    case 'completed':
      res.json({data: orders.map(mapUsers).filter(order => order.status === 'completed')}).status(200);
      break;
    case 'all':
    default:
      res.json({data: orders.map(mapUsers)}).status(200)
      break;
  }
  res.json({message: 'not found'}).status(404);
}
