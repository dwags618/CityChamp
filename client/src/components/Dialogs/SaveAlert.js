import React from 'react';
import ActionSaveAlert from './ActionSaveAlert';

const SaveAlert = (props) => {
  const { title, message, errorMessages } = props;

  return (
    <ActionSaveAlert
      title={title}
      message={message}
      list={errorMessages}
      centerScreen
      overlay
    />
  );
}

export default SaveAlert;
