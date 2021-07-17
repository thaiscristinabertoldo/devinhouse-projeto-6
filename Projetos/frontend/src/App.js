import { process } from './mock';
import { BaseLayout } from './layouts/BaseLayout';
import { ListProcessPage } from './pages/ListProcessPage';
import { LoginPage } from './pages/LoginPage';

export const App = () => {
  return (
    <BaseLayout>
      {/*<ListProcessPage process={process} />*/}
      <LoginPage />
    </BaseLayout>

  );
};
