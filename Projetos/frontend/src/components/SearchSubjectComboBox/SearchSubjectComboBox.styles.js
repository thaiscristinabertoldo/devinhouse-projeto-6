import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  comboBox: {
    marginTop: 15,
  },
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});
