import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function CustomAlert({severity, title, message}) {
  return (
    <Alert severity={severity}>
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
  );
}
