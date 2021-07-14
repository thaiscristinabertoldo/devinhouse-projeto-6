import { useState } from "react";
import { Divider, Menu, MenuItem } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EditIcon from "@material-ui/icons/Edit";
import FaceIcon from "@material-ui/icons/Face";
import InfoIcon from "@material-ui/icons/Info";
import { HeaderMenu } from "components/HeaderMenu";

export const LoginMenu = () => {
  const [anchorLogin, setAnchorLogin] = useState(null);
  const openMenu = Boolean(anchorLogin);
  return (
    <div>
      <HeaderMenu
        title="Account"
        onClick={(e) => setAnchorLogin(() => e.currentTarget)}
      >
        <FaceIcon />
      </HeaderMenu>
      <Menu
        anchorEl={anchorLogin}
        openMenu={openMenu}
        onClose={() => setAnchorLogin(null)}
      >
        <MenuItem>
          <InfoIcon />
          &nbsp;Info account
        </MenuItem>
        <MenuItem>
          <EditIcon />
          &nbsp;Edit account
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <AccountCircleIcon />
          &nbsp;Log out
        </MenuItem>
      </Menu>
    </div>
  );
};
