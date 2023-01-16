import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
import { PATH_AFTER_LOGIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';


// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> },
      ],
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <GeneralApp /> },
        { path: 'ecommerce', element: <GeneralEcommerce /> },
        { path: 'analytics', element: <GeneralAnalytics /> },
        { path: 'banking', element: <GeneralBanking /> },
        { path: 'booking', element: <GeneralBooking /> },

        {
          path: 'e-commerce',
          children: [
            { element: <Navigate to="/dashboard/e-commerce/shop" replace />, index: true },
            { path: 'shop', element: <EcommerceShop /> },
            { path: 'product/:name', element: <EcommerceProductDetails /> },
            { path: 'list', element: <EcommerceProductList /> },
            { path: 'product/new', element: <EcommerceProductCreate /> },
            { path: 'product/:name/edit', element: <EcommerceProductCreate /> },
            { path: 'checkout', element: <EcommerceCheckout /> },
          ],
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
            { path: 'profile', element: <UserProfile /> },
            { path: 'cards', element: <UserCards /> },
            { path: 'list', element: <UserList /> },
            { path: 'new', element: <UserCreate /> },
            { path: ':name/edit', element: <UserCreate /> },
            { path: 'account', element: <UserAccount /> },
          ],
        },
        {
          path: 'patient',
          children: [
            { element: <Navigate to="/dashboard/patient/profile" replace />, index: true },
            { path: 'profile', element: <PatientCards /> },
            { path: 'appointments', element: <UserCards /> },
            { path: 'appointments/new', element: <UserCards /> },
            { path: 'appointments/:id/edit', element: <UserCards /> },
            { path: 'plans', element: <UserList /> },
            { path: 'plans/new', element: <TreatmentPlanCart /> },
            { path: 'plans/:id/edit', element: <TreatmentPlanCart /> },
            { path: 'prescriptions/new', element: <PrescriptionCart /> },
            { path: 'files', element: <UserList /> },
            { path: 'mlc/new', element: <MLCNewEditForm /> }, 
            { path: 'files/new', element: <FileNewEditForm /> },
            { path: 'mlc/:id/edit', element: <MLCNewEditForm /> },
            { path: 'payments', element: <UserList /> },
            { path: 'communication', element: <UserList /> },
            { path: 'new', element: <PatientCreate /> },
            { path: ':name/edit', element: <PatientCreate /> },
            { path: 'account', element: <UserAccount /> },
          ],
        },
        {
          path: 'labs',
          children: [
            { element: <Navigate to="/dashboard/labs/orders" replace />, index: true },
            { path: 'orders', element: <LabOrders /> },
            { path: 'new', element: <LabsCreate /> },
            { path: ':id/:name/new', element: <LabsCreate /> },
            { path: ':id/edit', element: <LabsCreate /> },
          ],
        },
        {
          path: 'files',
          children: [
            { element: <Navigate to="/dashboard/files" replace />, index: true },
            { path: ':id/:name/new', element: <FileNewEditForm /> },
            { path: ':id/edit', element: <FileNewEditForm /> },
          ],
        },
        {
          path: 'mlc',
          children: [
            { element: <Navigate to="/dashboard/mlc" replace />, index: true },
            { path: ':id/:name/new', element: <MLCNewEditForm /> },
            { path: ':id/edit', element: <MLCNewEditForm /> },
          ],
        },
        {
          path: 'treatments',
          children: [
            { element: <Navigate to="/dashboard/treatments" replace />, index: true },
            { path: ':id/:name/new', element: <TreatmentPlanCart /> },
            { path: ':id/edit', element: <TreatmentPlanCart /> },
          ],
        },
        {
          path: 'notes',
          children: [
            { element: <Navigate to="/dashboard/notes" replace />, index: true },
            { path: ':id/:name/new', element: <NotesNewEditForm /> },
            { path: ':id/edit', element: <NotesNewEditForm /> },
          ],
        },
        {
          path: 'prescription',
          children: [
            { element: <Navigate to="/dashboard/prescription" replace />, index: true },
            { path: ':id/:name/new', element: <PrescriptionCart /> },
            { path: ':id/edit', element: <PrescriptionCart /> },
          ],
        },
        {
          path: 'settings',
          children: [
            { element: <Navigate to="/dashboard/settings/practicedetails" replace />, index: true },
            { path: 'practicedetails', element: <PracticeDetails /> },
            { path: 'practicestaff', element: <PracticeStaff /> },
            { path: 'inventory', element: <Inventory /> },
            { path: 'labwork', element: <LabsWork /> },
            { path: 'inventory/new', element: <InventoryCreate /> },
            { path: 'inventory/:id/edit', element: <InventoryCreate /> },
            { path: 'new', element: <PatientCreate /> },
            { path: ':name/edit', element: <PatientCreate /> },
            { path: 'account', element: <UserAccount /> },
          ],
        },
        {
          path: 'invoice',
          children: [
            { element: <Navigate to="/dashboard/invoice/list" replace />, index: true },
            { path: 'list', element: <InvoiceList /> },
            { path: ':id', element: <InvoiceDetails /> },
            { path: ':id/edit', element: <InvoiceEdit /> },
            { path: 'new', element: <InvoiceCreate /> },
          ],
        },
        {
          path: 'blog',
          children: [
            { element: <Navigate to="/dashboard/blog/posts" replace />, index: true },
            { path: 'posts', element: <BlogPosts /> },
            { path: 'post/:title', element: <BlogPost /> },
            { path: 'new', element: <BlogNewPost /> },
          ],
        },
        {
          path: 'mail',
          children: [
            { element: <Navigate to="/dashboard/mail/all" replace />, index: true },
            { path: 'label/:customLabel', element: <Mail /> },
            { path: 'label/:customLabel/:mailId', element: <Mail /> },
            { path: ':systemLabel', element: <Mail /> },
            { path: ':systemLabel/:mailId', element: <Mail /> },
          ],
        },
        {
          path: 'chat',
          children: [
            { element: <Chat />, index: true },
            { path: 'new', element: <Chat /> },
            { path: ':conversationKey', element: <Chat /> },
          ],
        },
        {
          path: 'calendar',
          children: [
            { element: <Calendar />, index: true },
            { path: 'calendar', element: <Calendar /> },
            { path: ':id/:name/new', element: <Calendar /> },
            { path: ':id/edit', element: <Calendar /> },
          ],
        },
        // { path: 'calendar', element: <Calendar /> },
        { path: 'kanban', element: <Kanban /> },
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: 'pricing', element: <Pricing /> },
        { path: 'payment', element: <Payment /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: <Navigate to="/auth/login" replace />,
      children: [
        { element: <HomePage />, index: true },
        { path: 'about-us', element: <About /> },
        { path: 'contact-us', element: <Contact /> },
        { path: 'faqs', element: <Faqs /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));

// DASHBOARD

// GENERAL
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const GeneralEcommerce = Loadable(lazy(() => import('../pages/dashboard/GeneralEcommerce')));
const GeneralAnalytics = Loadable(lazy(() => import('../pages/dashboard/GeneralAnalytics')));
const GeneralBanking = Loadable(lazy(() => import('../pages/dashboard/GeneralBanking')));
const GeneralBooking = Loadable(lazy(() => import('../pages/dashboard/GeneralBooking')));

// ECOMMERCE
const EcommerceShop = Loadable(lazy(() => import('../pages/dashboard/EcommerceShop')));
const EcommerceProductDetails = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductDetails')));
const EcommerceProductList = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductList')));
const EcommerceProductCreate = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductCreate')));
const EcommerceCheckout = Loadable(lazy(() => import('../pages/dashboard/EcommerceCheckout')));

// INVOICE
const InvoiceList = Loadable(lazy(() => import('../pages/dashboard/InvoiceList')));
const InvoiceDetails = Loadable(lazy(() => import('../pages/dashboard/InvoiceDetails')));
const InvoiceCreate = Loadable(lazy(() => import('../pages/dashboard/InvoiceCreate')));
const InvoiceEdit = Loadable(lazy(() => import('../pages/dashboard/InvoiceEdit')));

// BLOG
const BlogPosts = Loadable(lazy(() => import('../pages/dashboard/BlogPosts')));
const BlogPost = Loadable(lazy(() => import('../pages/dashboard/BlogPost')));
const BlogNewPost = Loadable(lazy(() => import('../pages/dashboard/BlogNewPost')));

// USER
const UserProfile = Loadable(lazy(() => import('../pages/dashboard/UserProfile')));
const UserCards = Loadable(lazy(() => import('../pages/dashboard/UserCards')));
const UserList = Loadable(lazy(() => import('../pages/dashboard/UserList')));
const UserAccount = Loadable(lazy(() => import('../pages/dashboard/UserAccount')));
const UserCreate = Loadable(lazy(() => import('../pages/dashboard/UserCreate')));

//
const PatientCards = Loadable(lazy(() => import('../pages/dashboard/PatientCards')));
const PatientCreate = Loadable(lazy(() => import('../pages/dashboard/PatientCreate')));

//
const PracticeDetails = Loadable(lazy(() => import('../pages/dashboard/PracticeDetails')));
const PracticeStaff = Loadable(lazy(() => import('../pages/dashboard/PracticeStaff')));
const LabOrders = Loadable(lazy(() => import('../pages/dashboard/LabOrders')));
const LabsCreate = Loadable(lazy(() => import('../pages/dashboard/LabsCreate')));
const TreatmentPlanCart = Loadable(lazy(() => import('../sections/@dashboard/e-commerce/checkout/TreatmentPlanCart')));
const NotesNewEditForm = Loadable(lazy(() => import('../sections/@dashboard/e-commerce/NotesNewEditForm')));
const PrescriptionCart = Loadable(lazy(() => import('../sections/@dashboard/e-commerce/checkout/PrescriptionCart')));

const MLCNewEditForm = Loadable(lazy(() => import('../sections/@dashboard/e-commerce/MLCNewEditForm')));
const FileNewEditForm = Loadable(lazy(() => import('../sections/@dashboard/e-commerce/FileNewEditForm')));
const Inventory = Loadable(lazy(() => import('../pages/dashboard/Inventory')));
const InventoryCreate = Loadable(lazy(() => import('../pages/dashboard/InventoryCreate')));
const LabsWork = Loadable(lazy(() => import('../pages/dashboard/LabsWork')));
// APP
const Chat = Loadable(lazy(() => import('../pages/dashboard/Chat')));
const Mail = Loadable(lazy(() => import('../pages/dashboard/Mail')));
const Calendar = Loadable(lazy(() => import('../pages/dashboard/Calendar')));
const Kanban = Loadable(lazy(() => import('../pages/dashboard/Kanban')));

// MAIN
const HomePage = Loadable(lazy(() => import('../pages/Home')));
const About = Loadable(lazy(() => import('../pages/About')));
const Contact = Loadable(lazy(() => import('../pages/Contact')));
const Faqs = Loadable(lazy(() => import('../pages/Faqs')));
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Pricing = Loadable(lazy(() => import('../pages/Pricing')));
const Payment = Loadable(lazy(() => import('../pages/Payment')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
