import { process } from './mock';
import { ListProcessPage } from './pages/ListProcessPage';
import { BaseLayout } from './layouts/BaseLayout';

export const App = () => {
  return (
    <BaseLayout>
      <ListProcessPage process={process} />
    </BaseLayout>
  );
};
