import users from '../../../assets/database/users.json';

export default async function handler(req, res) {
  const {email, password} = JSON.parse(req.body);
  if (req.method !== 'POST') {
    res.status(405).json({message: 'method not allowed'});
  }
  const user = users.find(t => t.email === email && t.password === password);
  if (!user) {
    res.status(400).json({message: 'invalid credentials'});
  }

  return res.status(200).json({data: user});
}
