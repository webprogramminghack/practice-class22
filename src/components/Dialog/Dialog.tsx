import styles from './Dialog.module.scss';
import React, { useCallback } from 'react';
import IconSuccess from '@/assets/svg/icon-success.svg';
import IconInfo from '@/assets/svg/icon-info.svg';
import IconDanger from '@/assets/svg/icon-danger.svg';
import { Button } from '@/components/Button';
import { createPortal } from 'react-dom';

export type DialogProps = {
  variant: 'success' | 'info' | 'danger';
  title: string;
  message: string;
  secondaryButtonTitle: string;
  primaryButtonTitle?: string;
  onSelectSecondaryButton: () => void;
  onSelectPrimaryButton?: () => void;
  isSubmitting?: boolean;
};

const getIcon = (type: DialogProps['variant']) => {
  switch (type) {
    case 'danger':
      return <IconDanger />;
    case 'success':
      return <IconSuccess />;
    case 'info':
      return <IconInfo />;
    default: {
      const _exhaustiveCheck: never = type;
      throw new Error(`Unhandled type: ${_exhaustiveCheck}`);
    }
  }
};

export const Dialog: React.FC<DialogProps> = ({
  variant,
  title,
  message,
  secondaryButtonTitle,
  primaryButtonTitle,
  onSelectSecondaryButton,
  onSelectPrimaryButton,
  isSubmitting,
}) => {
  const handleOnClickSubmitButton = useCallback(() => {
    if (!onSelectPrimaryButton) return;

    onSelectPrimaryButton();
  }, [onSelectPrimaryButton]);

  return createPortal(
    <div className={styles.dialogWrapper}>
      <div className={styles.dialog}>
        <div className={styles.body}>
          <div className={styles.variantIcon}>
            <div className={styles.icon}>{getIcon(variant)}</div>
          </div>
          <div className={styles.content}>
            <p className={styles.title}>{title}</p>
            <p className={styles.description}>{message}</p>
          </div>
        </div>
        <div className={styles.footer}>
          {variant !== 'success' && primaryButtonTitle && (
            <Button
              color={variant === 'danger' ? 'danger' : 'primary'}
              isLoading={isSubmitting}
              onClick={handleOnClickSubmitButton}
            >
              {primaryButtonTitle}
            </Button>
          )}

          <Button
            color='secondary'
            disabled={isSubmitting}
            onClick={onSelectSecondaryButton}
          >
            {secondaryButtonTitle}
          </Button>
        </div>
      </div>
    </div>,
    document.getElementById('portal') as HTMLElement
  );
};
