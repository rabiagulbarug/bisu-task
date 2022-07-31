import users from '../../../assets/database/users.json';

export default async function handler(req, res) {
  const {email, password} = JSON.parse(req.body);
  if (req.method !== 'POST') {
    res.json({message: 'method not allowed', error: true});
  }
  const user = users.find(t => t.email === email && t.password === password);
  if (!user) {
    res.json({message: 'invalid credentials', error: true});
  }

  return res.json({data: user});
}
