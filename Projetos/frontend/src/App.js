import { BaseLayout } from './layouts/BaseLayout';
import { ListProcessPage } from './pages/ListProcessPage';
import { ProcessRegistrationPage } from './pages/ProcessRegistrationPage';
import { Routes } from './router';

export const App = () => {
  return (
    <BaseLayout>
      {/*<ListProcessPage process={process} />*/}
      {/*<ProcessRegistrationPage/>*/}
      <Routes />
    </BaseLayout>

  );
};
