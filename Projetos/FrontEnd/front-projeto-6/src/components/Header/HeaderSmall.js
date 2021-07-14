import { useState } from "react";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import MenuIcon from "@material-ui/icons/Menu";
import { HeaderDrawer } from "components/HeaderDrawer";
import { HeaderMenu } from "components/HeaderMenu";
import { StyledHeader, Field } from "./Header.styled";

export const HeaderSmall = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <StyledHeader>
        <Field>
          <AccountBalanceIcon style={{ marginRight: "8px" }} />
        </Field>
        <Field>
          <HeaderMenu
            title="OPTIONS"
            onClick={() => setOpenDrawer((old) => !old)}
          >
            <MenuIcon />
          </HeaderMenu>
          <HeaderDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
        </Field>
      </StyledHeader>
    </>
  );
};
