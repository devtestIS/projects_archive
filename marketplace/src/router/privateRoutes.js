import Dashboard from '@/views/Dashboard.vue'
import Transactions from '@/views/Transactions.vue'
import Account from '@/views/Account.vue'

export default [
  {
    path: '/',
    name: 'Dashboard',
    components: {
      default: Dashboard,
      transactions: Transactions
    }
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  }
]
