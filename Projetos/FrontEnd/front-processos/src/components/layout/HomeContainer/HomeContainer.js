import { Navbar } from '../../Navbar'
import { useStyles } from './HomeContainer.style'

export const HomeContainer = ({ children }) => {
  const classes = useStyles()

  return (
    <>
      <Navbar />
      <div className={classes.root}>{children}</div>
    </>
  )
}
