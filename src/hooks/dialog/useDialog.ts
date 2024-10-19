import { DialogProps } from '@/components/Dialog';
import { useDialogContext } from './useDialogContext';
import { FormEvent, useCallback } from 'react';

type ConfirmDetails = Pick<
  DialogProps,
  'variant' | 'title' | 'message' | 'primaryButtonTitle'
>;

type SuccessDetails = Pick<DialogProps, 'title' | 'message'>;
type ErrorDetails = Pick<DialogProps, 'title' | 'message'>;

export type UseDialogOptions<T extends unknown[]> = {
  action: (...args: T) => Promise<unknown> | unknown;
  confirmDetails: ConfirmDetails;
  successDetails: SuccessDetails;
  errorDetails: ErrorDetails;
  showErrorLog?: boolean;
};

export const useDialog = <T extends unknown[]>({
  action,
  confirmDetails,
  successDetails,
  errorDetails,
  showErrorLog,
}: UseDialogOptions<T>): ((...args: T) => Promise<void>) => {
  const { setDialogProps } = useDialogContext();

  const showDialogConfirmation = useCallback(() => {
    return new Promise<boolean>((resolve) => {
      const dialogProps: DialogProps = {
        ...confirmDetails,
        secondaryButtonTitle: 'Cancel',
        onSelectSecondaryButton: () => resolve(false),
        onSelectPrimaryButton: () => resolve(true),
      };

      setDialogProps(dialogProps);
    });
  }, [confirmDetails, setDialogProps]);

  const showDialogSuccess = useCallback(() => {
    if (!successDetails) return;

    return new Promise<boolean>((resolve) => {
      const dialogProps: DialogProps = {
        ...successDetails,
        variant: 'success',
        secondaryButtonTitle: 'Close',
        onSelectSecondaryButton: () => resolve(true),
      };

      setDialogProps(dialogProps);
    });
  }, [setDialogProps, successDetails]);

  const showDialogError = useCallback(
    (error: Error) => {
      if (!errorDetails) return;

      return new Promise<boolean>((resolve) => {
        const dialogProps: DialogProps = {
          ...errorDetails,
          ...(showErrorLog ? { message: error.message } : {}),
          variant: 'danger',
          secondaryButtonTitle: 'Close',
          onSelectSecondaryButton: () => resolve(true),
        };

        setDialogProps(dialogProps);
      });
    },
    [errorDetails, setDialogProps, showErrorLog]
  );

  const hideDialogConfirm = useCallback(() => {
    setDialogProps(null);
  }, [setDialogProps]);

  const hideDialogSuccess = useCallback(() => {
    setDialogProps(null);
  }, [setDialogProps]);

  const hideDialogError = useCallback(() => {
    setDialogProps(null);
  }, [setDialogProps]);

  const confirmAction: (...args: T) => Promise<void> = useCallback(
    async (...args: T) => {
      const e = args[0] as FormEvent<HTMLFormElement>;

      if (typeof e?.preventDefault === 'function') {
        e.preventDefault();
      }

      const confirmed = await showDialogConfirmation();

      if (confirmed) {
        try {
          setDialogProps((prev) => {
            if (!prev) return prev;

            return {
              ...prev,
              isSubmitting: true,
            };
          });

          await action(...args);

          hideDialogConfirm();

          if (!successDetails) return;
          await showDialogSuccess();
          hideDialogSuccess();
        } catch (error) {
          hideDialogConfirm();
          if (!errorDetails || !(error instanceof Error)) return;

          await showDialogError(error);
          hideDialogError();
        }
      } else {
        hideDialogConfirm();
      }
    },
    [
      action,
      errorDetails,
      hideDialogConfirm,
      hideDialogError,
      hideDialogSuccess,
      setDialogProps,
      showDialogConfirmation,
      showDialogError,
      showDialogSuccess,
      successDetails,
    ]
  );

  return confirmAction;
};
