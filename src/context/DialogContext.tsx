import React, { createContext, useState } from 'react';
import { Dialog, DialogProps } from '@/components/Dialog';

type DialogContextType = {
  setDialogProps: React.Dispatch<React.SetStateAction<DialogProps | null>>;
};

export const DialogContext = createContext<DialogContextType | null>(null);

type DialogProviderProps = {
  children: React.ReactNode;
};

export const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
  const [dialogProps, setDialogProps] = useState<DialogProps | null>(null);

  return (
    <DialogContext.Provider value={{ setDialogProps }}>
      {dialogProps && <Dialog {...dialogProps} />}
      {children}
    </DialogContext.Provider>
  );
};
