import { Button } from '@material-ui/core';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { useStyles } from './AddButton.styles';

export const AddButton = (props) => {
  const classes = useStyles();
  const { handleClick } = props;

  return (
    <Button variant="contained" className={classes.button} startIcon={<PostAddIcon />} onClick={handleClick}>
      <strong>Adicionar</strong>
    </Button>
  );
};
