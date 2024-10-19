import React from 'react';
import { Button } from './components/Button';
import styles from './App.module.scss';
import { useDialog } from './hooks/dialog';
import { OtherComponent } from './components/OtherComponent';
import { OtherComponent2 } from './components/OtherComponent2';
import { Counter } from './components/Counter';

const App: React.FC = () => {
  const showAlert = () => {
    throw new Error('lalalallaala');
    // alert('Hello everyone!');
  };

  const showAlertWithConfirmation = useDialog({
    action: showAlert,
    confirmDetails: {
      variant: 'danger',
      title: 'Do you want to show an alert?',
      message: 'This will show an alert on the screen.',
      primaryButtonTitle: 'Show alert',
    },
    successDetails: {
      title: 'Alert shown',
      message: 'The alert has been shown successfully.',
    },
    errorDetails: {
      title: 'Error showing alert',
      message: 'An error occurred while showing the alert.',
    },
  });

  return (
    <div className={styles.container}>
      {/* <Button onClick={showAlertWithConfirmation}>Show alert</Button> */}
      {/* <OtherComponent /> */}
      {/* <OtherComponent2 /> */}
      <Counter />
    </div>
  );
};

export default App;
