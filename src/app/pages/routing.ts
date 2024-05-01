import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'users',
    loadChildren: () =>
    import('../modules/users/users.module').then((m) => m.UsersModule)
  },
  {
    path: 'user-create',
    loadChildren: () =>
    import('../modules/user-create/user-create.module').then((m) => m.UserCreateModule)
  },
  {
    path: 'user-edit/:id',
    loadChildren: () =>
    import('../modules/user-edit/user-edit.module').then((m) => m.UserEditModule)
  },
  {
    path: 'settings/company-info',
    loadChildren: () =>
    import('../modules/settings/company-info/company-info.module').then((m) => m.CompanyInfoModule)
  },
  {
    path: 'settings/embezzlement-category',
    loadChildren: () =>
    import('../modules/settings/embezzlement-category/embezzlement-category.module').then((m) => m.EmbezzlementCategoryModule)
  },
  {
    path: 'settings/document-type',
    loadChildren: () =>
    import('../modules/settings/document-type/document-type.module').then((m) => m.DocumentTypeModule)
  },
  {
    path: 'sidebar-leave',
    loadChildren: () =>
    import('../modules/Request/sidebar-leave/sidebar-leave.module').then((m) => m.SidebarLeaveModule)
  },
  {
    path: 'sidebar-advance-payment',
    loadChildren: () =>
    import('../modules/Request/sidebar-advance-payment/sidebar-advance-payment.module').then((m) => m.SidebarAdvancePaymentModule)
  },
  {
    path: 'sidebar-spending-payment',
    loadChildren: () =>
    import('../modules/Request/sidebar-spending-payment/sidebar-spending-payment.module').then((m) => m.SidebarSpendingPaymentModule)
  },
  {
    path: 'sidebar-overtime-payment',
    loadChildren: () =>
    import('../modules/Request/sidebar-overtime-payment/sidebar-overtime-payment.module').then((m) => m.SidebarOvertimePaymentModule)
  },
  {
    path: 'sidebar-document-request',
    loadChildren: () =>
    import('../modules/Request/sidebar-document-request/sidebar-document-request.module').then((m) => m.SidebarDocumentRequestModule)
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
