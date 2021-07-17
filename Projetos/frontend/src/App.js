import { process } from './mock';
import { BaseLayout } from './layouts/BaseLayout';
import { ListProcessPage } from './pages/ListProcessPage';
import { ProcessRegistrationPage } from './pages/ProcessRegistrationPage';

export const App = () => {
  return (
    <BaseLayout>
      {/*<ListProcessPage process={process} />*/}
      <ProcessRegistrationPage/>
    </BaseLayout>
  );
};
