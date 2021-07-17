// import { makeStyles } from '@material-ui/core'

// export const useStyles = makeStyles((theme) => ({
//   root: {
//     paddingTop: theme.spacing(18),
//     paddingLeft: theme.spacing(18),
//     paddingRight: theme.spacing(18),
//   },
//   container: {
//     marginTop: theme.spacing(8),
//   },
// }))

import { styled } from '@material-ui/core/styles'

export const DivStyled = styled('div') (({ theme }) => ({
  paddingTop: theme.spacing(18),
  paddingLeft: theme.spacing(18),
  paddingRight: theme.spacing(18),
}))
