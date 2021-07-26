import { Box, Divider, Paper, Typography } from '@material-ui/core';

export const Section = ({ children, paper, ...rest }) => (
  <Box data-testid="custom-section" component={paper ? Paper : 'div'} width="100%" marginY={2} {...rest}>
    {children}
  </Box>
);

export const SectionTitle = ({ children: title, noDivider = false, ...rest }) => {
  return (
    <Box marginY={2}>
      <Typography variant="h6" color="textPrimary" gutterBottom {...rest}>
        {title}
      </Typography>
      {!noDivider && <Divider data-testid="divider" />}
    </Box>
  );
};
