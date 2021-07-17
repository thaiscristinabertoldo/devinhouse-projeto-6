import { BrowserRouter } from 'react-router-dom'

import { SnackbarProvider } from 'notistack'

import { SnackbarCloseButton } from './components'
import { BaseLayout } from './layout'
import { CustomThemeProvider } from './contexts'

import { AppRouter } from "./routes";

function App() {
  return (
    <CustomThemeProvider>
      <BrowserRouter>
        <SnackbarProvider
          maxSnack={1}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          autoHideDuration={2000}
          action={(key) => <SnackbarCloseButton key={key} />}
        >
            <BaseLayout>
              <AppRouter />
            </BaseLayout>
        </SnackbarProvider>
      </BrowserRouter>
    </CustomThemeProvider>
  )
}

export default App
