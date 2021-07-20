import { Navbar } from '../../Navbar'
import { useStyles } from './HomeContainer.style'

export const HomeContainer = ({ children, toggleTheme }) => {
  const classes = useStyles()

  return (
    <>
      <Navbar toggleTheme={toggleTheme} />
      <div className={classes.root}>{children}</div>
    </>
  )
}
