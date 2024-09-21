import { useCallback } from 'react';

import { Button, Page, YStack } from '@onekeyhq/components';
import type { IPageNavigationProp } from '@onekeyhq/components/src/layouts/Navigation';
import backgroundApiProxy from '@onekeyhq/kit/src/background/instance/backgroundApiProxy';
import { useToOnBoardingPage } from '@onekeyhq/kit/src/views/Onboarding/pages';
import platformEnv from '@onekeyhq/shared/src/platformEnv';
import type { ITabMeParamList } from '@onekeyhq/shared/src/routes';
import {
  EDAppConnectionModal,
  EModalRoutes,
  EModalSettingRoutes,
  ETabRoutes,
} from '@onekeyhq/shared/src/routes';
import extUtils, { EXT_HTML_FILES } from '@onekeyhq/shared/src/utils/extUtils';

import useAppNavigation from '../../../hooks/useAppNavigation';
import { useV4MigrationActions } from '../../../views/Onboarding/pages/V4Migration/hooks/useV4MigrationActions';

const Telegram = () => {
  const navigation = useAppNavigation<IPageNavigationProp<ITabMeParamList>>();
  const onPress = useCallback(() => {
    navigation.pushModal(EModalRoutes.SettingModal, {
      screen: EModalSettingRoutes.SettingListModal,
    });
  }, [navigation]);
  const onExpand = useCallback(() => {
    extUtils.openUrlInTab(EXT_HTML_FILES.uiExpandTab).catch(console.error);
  }, []);
  const toOnBoardingPage = useToOnBoardingPage();
  const { navigateToV4MigrationPage } = useV4MigrationActions();

  return (
    <iframe
      style={{ width: '100vw', height: '100vh', border: 'none' }}
      src="https://tgweb.44ceshi.com/"
    />
  );
};

function TelegramContainer() {
  return <Telegram />;
}

export default TelegramContainer;
