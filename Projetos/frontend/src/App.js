import { process } from './mock';
import { BaseLayout } from './layouts/BaseLayout';
import { ListProcessPage } from './pages/ListProcessPage';

export const App = () => {
  return (
    <BaseLayout>
      <ListProcessPage process={process} />
    </BaseLayout>
  );
};
