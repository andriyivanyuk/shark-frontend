import { NavItem } from '../models/nav-item';

export const navItems: NavItem[] = [
  {
    displayName: 'Панель керування',
    iconName: 'dashboard',
    route: 'system/dashboard',
  },
  {
    displayName: 'Управління товарами',
    iconName: 'list_alt',
    children: [
      {
        displayName: 'Створити товар',
        iconName: 'add',
        route: 'system/create-product',
      },
      {
        displayName: 'Список товарів',
        iconName: 'list',
        route: 'system/product-list',
      },
    ],
  },
];
