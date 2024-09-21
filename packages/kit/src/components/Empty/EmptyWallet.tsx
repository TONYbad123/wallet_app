import { useIntl } from 'react-intl';
import { TonConnectUIProvider, TonConnectButton } from '@tonconnect/ui-react';
import { Empty } from '@onekeyhq/components';
import { useToOnBoardingPage } from '@onekeyhq/kit/src/views/Onboarding/pages';
import { ETranslations } from '@onekeyhq/shared/src/locale';

function EmptyWallet() {
  const intl = useIntl();
  const toOnBoardingPage = useToOnBoardingPage();
  return (
    <>
      <TonConnectUIProvider manifestUrl="https://tg.ton.44ceshi.com/tonconnect-manifest.json">
        <TonConnectButton />
        <Empty
          testID="Wallet-No-Wallet-Empty"
          icon="WalletCryptoOutline"
          title={intl.formatMessage({ id: ETranslations.global_no_wallet })}
          description={intl.formatMessage({
            id: ETranslations.global_no_wallet_desc,
          })}
          buttonProps={{
            children: intl.formatMessage({
              id: ETranslations.global_create_wallet,
            }),
            onPress: () => {
              void toOnBoardingPage();
            },
          }}
        />
      </TonConnectUIProvider>
    </>
  );
}

export { EmptyWallet };
