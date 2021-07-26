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
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useStyles } from './DrawerMenu.styles';
import { useHistory } from 'react-router-dom';

export const DrawerMenu = (props) => {
  const classes = useStyles();

  const { handleDrawerClose, open = false } = props;

  const theme = useTheme();

  const history = useHistory();

  const actualApplicationPath = window.location.pathname;

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
        <IconButton onClick={handleDrawerClose} className={classes.closeIcon}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button onClick={() => history.push('/processos')} disabled={actualApplicationPath === '/processos'}>
          <ListItemIcon>
            <ListAltIcon className={classes.optionIcon} />
          </ListItemIcon>
          <ListItemText primary={'Listar processos'} />
        </ListItem>
        <ListItem
          button
          onClick={() => history.push('/processos/formulario')}
          disabled={actualApplicationPath === '/processos/formulario'}
        >
          <ListItemIcon className={classes.optionIcon}>
            <CreateNewFolderIcon />
          </ListItemIcon>
          <ListItemText primary={'Cadastrar processo'} />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => history.goBack()} className={classes.backOption}>
          <ListItemIcon>
            <ArrowBackIcon className={classes.backOptionIcon} />
          </ListItemIcon>
          <ListItemText primary={'Voltar'} />
        </ListItem>
      </List>
    </Drawer>
  );
};
