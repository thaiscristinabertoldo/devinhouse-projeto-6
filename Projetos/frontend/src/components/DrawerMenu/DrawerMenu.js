import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListAltIcon from '@material-ui/icons/ListAlt';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import { useStyles } from './DrawerMenu.styles';
import { useHistory } from 'react-router-dom';

export const DrawerMenu = (props) => {
  const classes = useStyles();

  const { handleDrawerClose, open = false } = props;

  const theme = useTheme();

  const history = useHistory();

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button onClick={() => history.push('/processos')}>
          <ListItemIcon>
            <ListAltIcon />
          </ListItemIcon>
          <ListItemText primary={'Listar processos'} />
        </ListItem>
        <ListItem button onClick={() => history.push('/processos/formulario')}>
          <ListItemIcon>
            <CreateNewFolderIcon />
          </ListItemIcon>
          <ListItemText primary={'Cadastrar processo'} />
        </ListItem>
      </List>
    </Drawer>
  );
};
