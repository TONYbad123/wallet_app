import { analytics } from '@onekeyhq/shared/src/analytics';
import {
  backgroundClass,
  backgroundMethod,
} from '@onekeyhq/shared/src/background/backgroundDecorators';
import { buildServiceEndpoint } from '@onekeyhq/shared/src/config/appConfig';
import { EServiceEndpointEnum } from '@onekeyhq/shared/types/endpoint';

import {
  devSettingsPersistAtom,
  firmwareUpdateDevSettingsPersistAtom,
} from '../states/jotai/atoms/devSettings';

import ServiceBase from './ServiceBase';

import type {
  IDevSettingsKeys,
  IDevSettingsPersistAtom,
  IFirmwareUpdateDevSettings,
  IFirmwareUpdateDevSettingsKeys,
} from '../states/jotai/atoms/devSettings';

@backgroundClass()
class ServiceDevSetting extends ServiceBase {
  constructor({ backgroundApi }: { backgroundApi: any }) {
    super({ backgroundApi });
  }

  @backgroundMethod()
  public async switchDevMode(isOpen: boolean) {
    await devSettingsPersistAtom.set((prev) => ({
      enabled: isOpen,
      settings: isOpen ? prev.settings : {},
    }));
  }

  @backgroundMethod()
  public async updateDevSetting(name: IDevSettingsKeys, value: any) {
    await devSettingsPersistAtom.set((prev) => ({
      enabled: true,
      settings: {
        ...prev.settings,
        [name]: value,
      },
    }));
  }

  @backgroundMethod()
  public async getDevSetting(): Promise<IDevSettingsPersistAtom> {
    return devSettingsPersistAtom.get();
  }

  @backgroundMethod()
  public async getFirmwareUpdateDevSettings<
    T extends IFirmwareUpdateDevSettingsKeys,
  >(key: T): Promise<IFirmwareUpdateDevSettings[T] | undefined> {
    const dev = await devSettingsPersistAtom.get();
    if (!dev.enabled) {
      return undefined;
    }
    const fwDev = await firmwareUpdateDevSettingsPersistAtom.get();
    return fwDev[key];
  }

  @backgroundMethod()
  public async initAnalytics() {
    const devSettings = await this.getDevSetting();
    const instanceId = await this.backgroundApi.serviceSetting.getInstanceId();
    analytics.init({
      instanceId,
      baseURL: buildServiceEndpoint({
        serviceName: EServiceEndpointEnum.Utility,
        env: devSettings.settings?.enableTestEndpoint ? 'test' : 'prod',
      }),
    });
  }
}

export default ServiceDevSetting;
