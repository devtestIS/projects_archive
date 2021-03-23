import UserProfile from '@/views/UserProfile.vue';
import UserSubscribe from '@/views/UserSubscribe.vue';
import UserStatistics from '@/views/UserStatistics.vue';
import UserHistory from '@/views/UserHistory.vue';
import UserPaymentDetails from '@/views/UserPaymentDetails.vue';
import UserDocumentation from '@/views/UserDocumentation.vue';
import AdminDocumentManagment from '@/views/AdminDocumentManagment.vue';
import AdminMethodsManagment from '@/views/AdminMethodsManagment.vue';
import AdminUsersManagment from '@/views/AdminUsersManagment.vue';
import AdminUserActivity from '@/views/AdminUserActivity.vue';
import AdminAnalytics from '@/views/AdminAnalytics.vue';

export default [
  {
    path: '/user-profile',
    name: 'user-profile',
    component: UserProfile,
  },
  {
    path: '/subscription',
    name: 'user-subscription',
    component: UserSubscribe,
  },
  {
    path: '/statistics',
    name: 'user-statistics',
    component: UserStatistics,
  },
  {
    path: '/history',
    name: 'user-history',
    component: UserHistory,
  },
  {
    path: '/requisites',
    name: 'payment-details',
    component: UserPaymentDetails,
  },
  {
    path: '/documentation',
    name: 'documentation',
    component: UserDocumentation,
  },
  {
    path: '/admin/document-management',
    name: 'document-management',
    component: AdminDocumentManagment,
  },
  {
    path: '/admin/methods-management',
    name: 'methods-management',
    component: AdminMethodsManagment,
  },
  {
    path: '/admin/users-management',
    name: 'users-management',
    component: AdminUsersManagment,
  },
  {
    path: '/admin/user-activity',
    name: 'user-activity',
    component: AdminUserActivity,
  },
  {
    path: '/admin/analytics',
    name: 'analytics',
    component: AdminAnalytics,
  },
];
