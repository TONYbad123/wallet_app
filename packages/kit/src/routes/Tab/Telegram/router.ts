import type { ITabSubNavigatorConfig } from '@onekeyhq/components';
import { ETranslations } from '@onekeyhq/shared/src/locale';
import { ETabMeRoutes } from '@onekeyhq/shared/src/routes/tabMe';

import { LazyLoadRootTabPage } from '../../../components/LazyLoadPage';

const Telegram = LazyLoadRootTabPage(() => import('./Telegram'));

export const telegramRouters: ITabSubNavigatorConfig<any, any>[] = [
  {
    rewrite: '/',
    name: 'Telegram',
    component: Telegram,
  },
];
