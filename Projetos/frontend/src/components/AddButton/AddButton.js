import { Button } from '@material-ui/core';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { useStyles } from './AddButton.styles';

export const AddButton = () => {
  const classes = useStyles();

  return (
    <Button variant="contained"  className={classes.button} startIcon={<PostAddIcon />}>
      <strong>Adicionar</strong>
    </Button>
  );
};
