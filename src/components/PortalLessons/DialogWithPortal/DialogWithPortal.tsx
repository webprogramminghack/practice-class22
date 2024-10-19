import React, { useCallback } from 'react';
import styles from './DialogWithPortal.module.scss';
import IconSuccess from '@/assets/svg/icon-success.svg';
import IconInfo from '@/assets/svg/icon-info.svg';
import IconDanger from '@/assets/svg/icon-danger.svg';
import { Button } from '@/components/Button';
import { createPortal } from 'react-dom';

type DialogProps = {
  level: 'success' | 'info' | 'danger';
  title: string;
  message: string;
  cancelButtonTitle: string;
  submitButtonTitle?: string;
  onSelectCancel: () => void;
  onSelectSubmit?: () => void;
  isSubmitting?: boolean;
};

const getIcon = (type: DialogProps['level']) => {
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

export const DialogWithPortal: React.FC<DialogProps> = ({
  level,
  title,
  message,
  cancelButtonTitle,
  submitButtonTitle,
  onSelectCancel,
  onSelectSubmit,
  isSubmitting,
}) => {
  const handleOnClickSubmitButton = useCallback(() => {
    if (!onSelectSubmit) return;

    onSelectSubmit();
  }, [onSelectSubmit]);

  return createPortal(
    <div className={styles.dialogWrapper}>
      <div className={styles.dialog}>
        <div className={styles.body}>
          <div className={styles.levelIcon}>
            <div className={styles.icon}>{getIcon(level)}</div>
          </div>
          <div className={styles.content}>
            <p className={styles.title}>{title}</p>
            <p className={styles.description}>{message}</p>
          </div>
        </div>
        <div className={styles.footer}>
          {level !== 'success' && submitButtonTitle && (
            <Button
              color={level === 'danger' ? 'danger' : 'primary'}
              isLoading={isSubmitting}
              onClick={handleOnClickSubmitButton}
            >
              {submitButtonTitle}
            </Button>
          )}

          <Button
            color='secondary'
            disabled={isSubmitting}
            onClick={onSelectCancel}
          >
            {cancelButtonTitle}
          </Button>
        </div>
      </div>
    </div>,
    document.getElementById('portal') as HTMLElement
  );
};
