import orders from '../../../assets/database/orders.json';
import users from '../../../assets/database/users.json';
import products from '../../../assets/database/products.json';

export default async function handler(req, res) {
  const {id} = req.query;
  if (!id) {
    res.json({message: 'not found', error: true});
  }
  const order = orders.find(order => Number(order.id) === Number(id));
  if (!order) {
    res.json({message: 'not found', error: true});
  }
  const customer = users.find(user => user.id === order.customerId);
  if (!customer) {
    res.json({message: 'cannot find user with customerId', order, error: true});
  }

  res.json({
    data: {
      ...order,
      products: [...order.products.map(item => {
        return {...item, ...products.find(t => t.id === item.productId)};
      })],
      customer: {...customer, password: undefined}
    }
  });
}
