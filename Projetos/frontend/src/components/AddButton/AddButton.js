import { Button } from '@material-ui/core';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { useStyles } from './AddButton.styles';

export const AddButton = ({ children: label = 'Adicionar', onClick }) => {
  const classes = useStyles();

  return (
    <Button
      type="button"
      variant="contained"
      color="primary"
      className={classes.button}
      startIcon={<PostAddIcon />}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
