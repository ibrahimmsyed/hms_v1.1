// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/chat/${name}`),
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (id) => path(ROOTS_DASHBOARD, `/user/${id}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
  patient: {
    root: path(ROOTS_DASHBOARD, '/patient'),
    new: path(ROOTS_DASHBOARD, '/patient/new'),
    profile: path(ROOTS_DASHBOARD, '/patient/profile'),
    tab: (tab) => path(ROOTS_DASHBOARD, `/patient/${tab}`),
    selected: (tab, id) => path(ROOTS_DASHBOARD, `/patient/${tab}/${id}`),
    appointments: path(ROOTS_DASHBOARD, '/patient/appointments'),
    newplans: path(ROOTS_DASHBOARD, '/patient/plans/new'),
    newprescription: path(ROOTS_DASHBOARD, '/patient/prescriptions/new'),
    plans: path(ROOTS_DASHBOARD, '/patient/plans'),
    files: path(ROOTS_DASHBOARD, '/patient/files'),
    mlcfiles: path(ROOTS_DASHBOARD, '/patient/mlc/new'),
    newfiles: path(ROOTS_DASHBOARD, '/patient/files/new'),
    payments: path(ROOTS_DASHBOARD, '/patient/payments'),
    communication: path(ROOTS_DASHBOARD, '/patient/communication'),
    
    account: path(ROOTS_DASHBOARD, '/patient/account'),
    edit: (name) => path(ROOTS_DASHBOARD, `/patient/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/patient/reece-chung/edit`),
  },
  files:{
    new: (id, name) => path(ROOTS_DASHBOARD, `/files/${id}/${name}/new`),
  },
  mlc:{
    new: (id, name) => path(ROOTS_DASHBOARD, `/mlc/${id}/${name}/new`),
  },
  prescription:{
    new: (id, name) => path(ROOTS_DASHBOARD, `/prescription/${id}/${name}/new`),
  },
  treatments:{
    new: (id, name) => path(ROOTS_DASHBOARD, `/treatments/${id}/${name}/new`),
  },
  notes:{
    new: (id, name) => path(ROOTS_DASHBOARD, `/notes/${id}/${name}/new`),
  },
  labs: {
    root: path(ROOTS_DASHBOARD, '/labs'),
    orders: path(ROOTS_DASHBOARD, '/labs/orders'),
    // new: path(ROOTS_DASHBOARD, '/labs/new'),
    cards: path(ROOTS_DASHBOARD, '/labs/cards'),
    profile: path(ROOTS_DASHBOARD, '/labs/profile'),
    account: path(ROOTS_DASHBOARD, '/labs/account'),
    edit: (id) => path(ROOTS_DASHBOARD, `/labs/${id}/edit`),
    new: (id, name) => path(ROOTS_DASHBOARD, `/labs/${id}/${name}/new`),
    demoEdit: path(ROOTS_DASHBOARD, `/labs/reece-chung/edit`),
  },
  settings: {
    root: path(ROOTS_DASHBOARD, '/settings'),
    practicedetails: path(ROOTS_DASHBOARD, '/settings/practicedetails'),
    inventory: path(ROOTS_DASHBOARD, '/settings/inventory'),
    labwork: path(ROOTS_DASHBOARD, '/settings/labwork'),
    inventoryPath: {
      new: path(ROOTS_DASHBOARD, '/settings/inventory/new'),
      edit: (name) => path(ROOTS_DASHBOARD, `/settings/inventory/${name}/edit`)
    },
    practicestaff: path(ROOTS_DASHBOARD, '/settings/practicestaff'),
    profile: path(ROOTS_DASHBOARD, '/patient/profile'),
    account: path(ROOTS_DASHBOARD, '/patient/account'),
    edit: (name) => path(ROOTS_DASHBOARD, `/patient/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/patient/reece-chung/edit`),
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    new: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}`),
    edit: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    demoView: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
  },
  invoice: {
    root: path(ROOTS_DASHBOARD, '/invoice'),
    list: path(ROOTS_DASHBOARD, '/invoice/list'),
    // new: path(ROOTS_DASHBOARD, '/invoice/new'),
    new: (id, name) => path(ROOTS_DASHBOARD, `/invoice/${id}/${name}/new`),
    view: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    new: path(ROOTS_DASHBOARD, '/blog/new'),
    view: (title) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
    demoView: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
  },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
