import { memo, useCallback, useRef, useState } from 'react';

import BigNumber from 'bignumber.js';
import { useIntl } from 'react-intl';

import type { IDialogInstance } from '@onekeyhq/components';
import {
  Accordion,
  Dialog,
  Divider,
  NumberSizeableText,
} from '@onekeyhq/components';
import { useDebounce } from '@onekeyhq/kit/src/hooks/useDebounce';
import {
  useSwapFromTokenAmountAtom,
  useSwapSelectFromTokenAtom,
  useSwapSelectToTokenAtom,
  useSwapSlippageDialogOpeningAtom,
  useSwapSlippagePercentageAtom,
  useSwapSlippagePercentageCustomValueAtom,
  useSwapSlippagePercentageModeAtom,
} from '@onekeyhq/kit/src/states/jotai/contexts/swap';
import { useSettingsPersistAtom } from '@onekeyhq/kit-bg/src/states/jotai/atoms';
import { ETranslations } from '@onekeyhq/shared/src/locale';
import {
  ESwapSlippageSegmentKey,
  type IFetchQuoteResult,
  type ISwapSlippageSegmentItem,
} from '@onekeyhq/shared/types/swap/types';

import SwapCommonInfoItem from '../../components/SwapCommonInfoItem';
import SwapProviderInfoItem from '../../components/SwapProviderInfoItem';
import SwapQuoteResultRate from '../../components/SwapQuoteResultRate';
import { useSwapQuoteLoading } from '../../hooks/useSwapState';

import SwapApproveAllowanceSelectContainer from './SwapApproveAllowanceSelectContainer';
import SwapSlippageContentContainer from './SwapSlippageContentContainer';
import SwapSlippageTriggerContainer from './SwapSlippageTriggerContainer';

interface ISwapQuoteResultProps {
  receivedAddress?: string;
  quoteResult?: IFetchQuoteResult;
  onOpenProviderList?: () => void;
}

const SwapQuoteResult = ({
  onOpenProviderList,
  quoteResult,
}: ISwapQuoteResultProps) => {
  const [openResult, setOpenResult] = useState(false);
  const [fromToken] = useSwapSelectFromTokenAtom();
  const [toToken] = useSwapSelectToTokenAtom();
  const [fromTokenAmount] = useSwapFromTokenAmountAtom();
  const [settingsPersistAtom] = useSettingsPersistAtom();
  const swapQuoteLoading = useSwapQuoteLoading();
  const intl = useIntl();
  const [, setSwapSlippageDialogOpening] = useSwapSlippageDialogOpeningAtom();
  const [{ slippageItem, autoValue }] = useSwapSlippagePercentageAtom();
  const [, setSwapSlippageCustomValue] =
    useSwapSlippagePercentageCustomValueAtom();
  const [, setSwapSlippageMode] = useSwapSlippagePercentageModeAtom();
  const dialogRef = useRef<ReturnType<typeof Dialog.show> | null>(null);
  const slippageOnSave = useCallback(
    (item: ISwapSlippageSegmentItem, close: IDialogInstance['close']) => {
      setSwapSlippageMode(item.key);
      if (item.key === ESwapSlippageSegmentKey.CUSTOM) {
        setSwapSlippageCustomValue(item.value);
      }
      void close({ flag: 'save' });
    },
    [setSwapSlippageCustomValue, setSwapSlippageMode],
  );

  const slippageHandleClick = useCallback(() => {
    dialogRef.current = Dialog.show({
      title: intl.formatMessage({ id: ETranslations.slippage_tolerance_title }),
      renderContent: (
        <SwapSlippageContentContainer
          swapSlippage={slippageItem}
          autoValue={autoValue}
          onSave={slippageOnSave}
        />
      ),
      onOpen: () => {
        setSwapSlippageDialogOpening({ status: true });
      },
      onClose: (extra) => {
        setSwapSlippageDialogOpening({ status: false, flag: extra?.flag });
      },
    });
  }, [
    intl,
    slippageItem,
    autoValue,
    slippageOnSave,
    setSwapSlippageDialogOpening,
  ]);
  const fromAmountDebounce = useDebounce(fromTokenAmount, 500, {
    leading: true,
  });
  if (
    !fromToken ||
    !toToken ||
    new BigNumber(fromTokenAmount).isNaN() ||
    new BigNumber(fromTokenAmount).isZero()
  ) {
    return null;
  }
  if (
    fromToken &&
    toToken &&
    !new BigNumber(fromAmountDebounce).isZero() &&
    !new BigNumber(fromAmountDebounce).isNaN()
  ) {
    return (
      <Accordion type="single" collapsible>
        <Accordion.Item value="1">
          <Accordion.Trigger
            unstyled
            borderWidth={0}
            bg="$transparent"
            p="$0"
            cursor="pointer"
          >
            {({ open }: { open: boolean }) => (
              <SwapQuoteResultRate
                rate={quoteResult?.instantRate}
                fromToken={fromToken}
                toToken={toToken}
                providerIcon={quoteResult?.info.providerLogo ?? ''}
                providerName={quoteResult?.info.providerName ?? ''}
                isLoading={swapQuoteLoading}
                onOpenResult={
                  quoteResult?.info.provider
                    ? () => setOpenResult(!openResult)
                    : undefined
                }
                openResult={open}
              />
            )}
          </Accordion.Trigger>
          <Accordion.HeightAnimator animation="quick">
            <Accordion.Content
              gap="$4"
              p="$0"
              animation="quick"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            >
              <Divider mt="$4" />
              {quoteResult?.allowanceResult ? (
                <SwapApproveAllowanceSelectContainer
                  allowanceResult={quoteResult?.allowanceResult}
                  fromTokenSymbol={fromToken?.symbol ?? ''}
                  isLoading={swapQuoteLoading}
                />
              ) : null}
              {quoteResult?.info.provider ? (
                <SwapProviderInfoItem
                  providerIcon={quoteResult?.info.providerLogo ?? ''} // TODO default logo
                  providerName={quoteResult?.info.providerName ?? ''}
                  isLoading={swapQuoteLoading}
                  fromToken={fromToken}
                  toToken={toToken}
                  showLock={!!quoteResult?.allowanceResult}
                  onPress={
                    quoteResult?.info.provider
                      ? () => {
                          onOpenProviderList?.();
                        }
                      : undefined
                  }
                />
              ) : null}
              {quoteResult?.toAmount &&
              !quoteResult?.allowanceResult &&
              !quoteResult?.unSupportSlippage ? (
                <SwapSlippageTriggerContainer
                  isLoading={swapQuoteLoading}
                  onPress={slippageHandleClick}
                />
              ) : null}
              {quoteResult?.fee?.estimatedFeeFiatValue ? (
                <SwapCommonInfoItem
                  title={intl.formatMessage({
                    id: ETranslations.swap_page_provider_est_network_fee,
                  })}
                  isLoading={swapQuoteLoading}
                  valueComponent={
                    <NumberSizeableText
                      size="$bodyMdMedium"
                      formatter="value"
                      formatterOptions={{
                        currency: settingsPersistAtom.currencyInfo.symbol,
                      }}
                    >
                      {quoteResult.fee?.estimatedFeeFiatValue}
                    </NumberSizeableText>
                  }
                />
              ) : null}
            </Accordion.Content>
          </Accordion.HeightAnimator>
        </Accordion.Item>
      </Accordion>
    );
  }
};

export default memo(SwapQuoteResult);
