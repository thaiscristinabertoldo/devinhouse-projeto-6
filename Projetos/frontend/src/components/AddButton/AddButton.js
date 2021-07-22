import { Button } from '@material-ui/core';
import PostAddIcon from '@material-ui/icons/PostAdd';

export const AddButton = ({ children: label = 'Adicionar', handleClick }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      style={{ color: 'white' }}
      startIcon={<PostAddIcon />}
      onClick={handleClick}
    >
      {label}
    </Button>
  );
};
