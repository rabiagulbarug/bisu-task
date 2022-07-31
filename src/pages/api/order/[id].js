import orders from '../../../assets/database/orders.json';
import users from '../../../assets/database/users.json';
import products from '../../../assets/database/products.json';

export default async function handler(req, res) {
  const {id} = req.query;
  if (!id) {
    res.status(404).json({message: 'not found'});
  }
  const order = orders.find(order => Number(order.id) === Number(id));
  if (!order) {
    res.status(404).json({message: 'not found'});
  }
  const customer = users.find(user => user.id === order.customerId);
  if (!customer) {
    res.status(500).json({message: 'cannot find user with customerId', order});
  }

  res.json({
    data: {
      ...order,
      products: [...order.products.map(item => {
        return {...item, ...products.find(t => t.id === item.productId)};
      })],
      customer: {...customer, password: undefined}
    }
  }).status(200);
}
