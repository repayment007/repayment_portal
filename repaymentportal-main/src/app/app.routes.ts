import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './authGuard/auth.guard';

// Cases
import { CasesList } from './pages/cases/cases-list/cases-list';
import { CasesCreate } from './pages/cases/cases-create/cases-create';
import { CasesEdit } from './pages/cases/cases-edit/cases-edit';
import { CasesView } from './pages/cases/cases-view/cases-view';

// Case Notes
import { CasenotesList } from './pages/casenotes/casenotes-list/casenotes-list';
import { CasenotesCreate } from './pages/casenotes/casenotes-create/casenotes-create';
import { CasenotesEdit } from './pages/casenotes/casenotes-edit/casenotes-edit';
import { CasenotesView } from './pages/casenotes/casenotes-view/casenotes-view';

// Consultations
import { ConsultationsList } from './pages/consultations/consultations-list/consultations-list';
import { ConsultationsView } from './pages/consultations/consultations-view/consultations-view';
import { ConsultationsCreate } from './pages/consultations/consultations-create/consultations-create';
import { ConsultationsEdit } from './pages/consultations/consultations-edit/consultations-edit';

// Testimonials
import { TestimonialsList } from './pages/testimonials/testimonials-list/testimonials-list';
import { TestimonialsView } from './pages/testimonials/testimonials-view/testimonials-view';
import { TestimonialsCreate } from './pages/testimonials/testimonials-create/testimonials-create';
import { TestimonialsEdit } from './pages/testimonials/testimonials-edit/testimonials-edit';

// Service Packages
import { ServicePackagesList } from './pages/service-packages/service-packages-list/service-packages-list';
import { ServicePackagesView } from './pages/service-packages/service-packages-view/service-packages-view';
import { ServicePackagesCreate } from './pages/service-packages/service-packages-create/service-packages-create';
import { ServicePackagesEdit } from './pages/service-packages/service-packages-edit/service-packages-edit';

// Health
import { HealthList } from './pages/health/health-list/health-list';
import { HealthView } from './pages/health/health-view/health-view';
import { HealthCreate } from './pages/health/health-create/health-create';
import { HealthEdit } from './pages/health/health-edit/health-edit';

// Admin
import { AdminList } from './pages/admin/admin-list/admin-list';
import { AdminView } from './pages/admin/admin-view/admin-view';
import { AdminCreate } from './pages/admin/admin-create/admin-create';
import { AdminEdit } from './pages/admin/admin-edit/admin-edit';

// Blog Posts
import { BlogPostsList } from './pages/blog-posts/blog-posts-list/blog-posts-list';
import { BlogPostsView } from './pages/blog-posts/blog-posts-view/blog-posts-view';
import { BlogPostsCreate } from './pages/blog-posts/blog-posts-create/blog-posts-create';
import { BlogPostsEdit } from './pages/blog-posts/blog-posts-edit/blog-posts-edit';

// Users
import { UsersList } from './pages/users/users-list/users-list';
import { UsersView } from './pages/users/users-view/users-view';

import { Notifications } from './pages/notifications/notifications';
import { Orders } from './pages/orders/orders';
import { OrdersView } from './pages/orders/orders-view/orders-view';

export const routes: Routes = [
  // Public routes (no guard)
  { path: 'login', component: LoginComponent },

  // Protected app shell — AuthGuard ensures only logged-in users can access
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },

      { path: 'admin', children: [
        { path: '', component: AdminList },
        { path: 'create', component: AdminCreate },
        { path: ':id', component: AdminView },
        { path: ':id/edit', component: AdminEdit }
      ]},

      { path: 'blog-posts', children: [
        { path: '', component: BlogPostsList },
        { path: 'create', component: BlogPostsCreate },
        { path: ':id', component: BlogPostsView },
        { path: ':id/edit', component: BlogPostsEdit }
      ]},

      { path: 'cases', children: [
        { path: '', component: CasesList },
        { path: 'create', component: CasesCreate },
        { path: ':id', component: CasesView },
        { path: ':id/edit', component: CasesEdit }
      ]},

      { path: 'casenotes', children: [
        { path: '', component: CasenotesList },
        { path: 'create', component: CasenotesCreate },
        { path: ':id', component: CasenotesView },
        { path: ':id/edit', component: CasenotesEdit }
      ]},

      { path: 'consultations', children: [
        { path: '', component: ConsultationsList },
        { path: 'create', component: ConsultationsCreate },
        { path: ':id', component: ConsultationsView },
        { path: ':id/edit', component: ConsultationsEdit }
      ]},

      { path: 'health', children: [
        { path: '', component: HealthList },
        { path: 'create', component: HealthCreate },
        { path: ':id', component: HealthView },
        { path: ':id/edit', component: HealthEdit }
      ]},

      { path: 'service-packages', children: [
        { path: '', component: ServicePackagesList },
        { path: 'create', component: ServicePackagesCreate },
        { path: ':id', component: ServicePackagesView },
        { path: ':id/edit', component: ServicePackagesEdit }
      ]},

      { path: 'testimonials', children: [
        { path: '', component: TestimonialsList },
        { path: 'create', component: TestimonialsCreate },
        { path: ':id', component: TestimonialsView },
        { path: ':id/edit', component: TestimonialsEdit }
      ]},

      { path: 'users', children: [
        { path: '', component: UsersList },
        { path: ':id', component: UsersView }
      ]},

      { path: 'notifications', component: Notifications },
      { path: 'orders', children: [
        { path: '', component: Orders },
        { path: ':id', component: OrdersView }
      ]},
    ]
  },

  // Fallback — redirect unknown paths to root (guard handles login redirect if not authenticated)
  { path: '**', redirectTo: '' }
];
