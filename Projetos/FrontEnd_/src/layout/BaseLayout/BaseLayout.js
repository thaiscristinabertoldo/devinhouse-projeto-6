import { NavBar } from "../../components";
import { DivStyled } from "./BaseLayout.styles";

export const BaseLayout = ({ children }) => (
  <>
    <NavBar />
    <DivStyled>{children}</DivStyled>
  </>
);

// import { NavBar } from '../../components'
// import { useStyles } from './BaseLayout.styles'

// export const BaseLayout = ({ children }) => {
//   const classes = useStyles()

//   return (
//     <>
//       <NavBar />
//       <div className={classes.root}>{children}</div>
//     </>
//   )
// }
