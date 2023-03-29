import { Icon } from '@chakra-ui/react'
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock
} from 'react-icons/md'

// Admin Imports
import MainDashboard from 'pages/user/default'
import Profile from 'pages/user/profile'
import DataTables from 'pages/user/data-tables'

// Auth Imports
import SignInCentered from 'pages/auth/sign-in'
import { IRoute } from 'types/navigation'

const routes: IRoute[] = [
  {
    name: 'Main Dashboard',
    layout: '/user',
    path: '/default',
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard
  },
  {
    name: 'Data Tables',
    layout: '/user',
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: '/data-tables',
    component: DataTables
  },
  {
    name: 'Profile',
    layout: '/user',
    path: '/profile',
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Profile
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered
  }
]

export default routes
