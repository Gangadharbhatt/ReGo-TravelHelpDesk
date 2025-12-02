// src/components/shared/forms/FormInput.jsx
import React from 'react';
import { TextField } from '@mui/material';
import { useField } from 'formik';
import { theme } from '../../../config/theme';

const FormInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <TextField
      fullWidth
      label={label}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      variant="outlined"
      sx={{
        mb: theme.spacing.lg,
        '& .MuiOutlinedInput-root': {
          borderRadius: theme.borderRadius.md,
          backgroundColor: theme.neutral[0],
          transition: theme.transitions.normal,
          '& fieldset': {
            borderColor: theme.neutral[300],
          },
          '&:hover fieldset': {
            borderColor: theme.neutral[400],
          },
          '&.Mui-focused fieldset': {
            borderColor: theme.primary[500],
            borderWidth: '2px',
            boxShadow: `0 0 0 3px ${theme.primary[100]}`,
          },
          '&.Mui-error fieldset': {
            borderColor: theme.error.main,
          },
        },
        '& .MuiInputLabel-root': {
          color: theme.neutral[500],
          '&.Mui-focused': {
            color: theme.primary[500],
          },
          '&.Mui-error': {
            color: theme.error.main,
          },
        },
        '& .MuiFormHelperText-root': {
          fontSize: theme.typography.fontSize.sm,
          marginLeft: 0,
        }
      }}
      {...field}
      {...props}
    />
  );
};

export default FormInput;