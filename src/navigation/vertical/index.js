// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import Basket from 'mdi-material-ui/Basket'
import Users from 'mdi-material-ui/AccountGroup'

const navigation = (isAdmin) => {
  const adminRoutes = [
    {
      title: 'Kullanıcılar',
      icon: Users,
      path: '/users',
    }
  ];

  const commonRoutes = [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Siparişler',
      icon: Basket,
      path: '/orders'
    },
  ];

  return isAdmin ? [...commonRoutes, ...adminRoutes] : commonRoutes;
}

export default navigation
