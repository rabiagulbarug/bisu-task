import users from "src/assets/database/users.json";

export default async function handler(req, res) {
  const { role } = req.query;
  switch (role) {
    case 'admin':
      res.json({data: users.filter(user => user.role === 'admin')}).status(200);
      break;
    case 'support':
      res.json({data: users.filter(user => user.role === 'support')}).status(200);
      break;
    case 'customer':
      res.json({data: users.filter(user => user.role === 'customer')}).status(200);
      break;
    case 'all':
    default:
      res.json({data: users}).status(200)
      break;
  }
  res.json({message: 'not found'}).status(404);
}
