import React from 'react';
import TextField from 'material-ui/TextField';

const FormTextField = (props) => {
  const { name, input, label, meta: { touched, error }, ...custom } = props;
  return (
    <TextField
      id={name}
      label={label}
      value={input.value}
      error={error !== undefined && touched && error.length > 0}
      helperText={touched && error}
      onChange={input.onChange}
      onBlur={input.onBlur}
      {...custom}
    />
  );
};

export default FormTextField;
