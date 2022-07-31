import users from "src/assets/database/users.json";

export default async function handler(req, res) {
  const { role } = req.query;
  switch (role) {
    case 'admin':
      res.json({data: users.filter(user => user.role === 'admin')});
      break;
    case 'support':
      res.json({data: users.filter(user => user.role === 'support')});
      break;
    case 'customer':
      res.json({data: users.filter(user => user.role === 'customer')});
      break;
    case 'all':
    default:
      res.json({data: users});
      break;
  }
  res.json({message: 'not found', error: true});
}
