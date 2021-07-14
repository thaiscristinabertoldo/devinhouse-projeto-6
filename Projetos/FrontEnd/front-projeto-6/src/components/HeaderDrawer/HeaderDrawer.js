import { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DarkModeIcon from "@material-ui/icons/DarkMode";
import EditIcon from "@material-ui/icons/Edit";
import FaceIcon from "@material-ui/icons/Face";
import InfoIcon from "@material-ui/icons/Info";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import LightModeIcon from "@material-ui/icons/LightMode";
import ListIcon from "@material-ui/icons/List";
import { useThemes } from "context/theme";

export const HeaderDrawer = ({ openDrawer, setOpenDrawer }) => {
  const { darkMode, ToggleTheme } = useThemes();
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <Drawer
      anchor="right"
      onClose={() => setOpenDrawer((old) => !old)}
      open={openDrawer}
    >
      <List>
        <ListItem divider>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography>OPTIONS</Typography>
          </ListItemText>
        </ListItem>
        <ListItem divider>
          <ListItemButton onClick={ToggleTheme}>
            <ListItemIcon>
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </ListItemIcon>
            <ListItemText>
              <Typography>{darkMode ? "LIGHT" : "DARK"}</Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        {true ? (
          <List>
            <ListItem divider>
              <ListItemButton onClick={() => setOpenMenu((old) => !old)}>
                <ListItemIcon>
                  <FaceIcon />
                  {openMenu ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </ListItemIcon>
                <ListItemText>
                  <Typography>ACCOUNT</Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
            {openMenu && (
              <List>
                <ListItem>
                  <ListItemButton onClick={null}>
                    <ListItemIcon>
                      <InfoIcon />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography>INFO ACCOUNT</Typography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton onClick={null}>
                    <ListItemIcon>
                      <EditIcon />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography>EDIT ACCOUNT</Typography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton onClick={null}>
                    <ListItemIcon>
                      <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography>LOG OUT</Typography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              </List>
            )}
          </List>
        ) : (
          <ListItem divider>
            <ListItemButton onClick={null}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography>LOG IN</Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};
