import React, { useEffect } from 'react';

import { STATUS } from '../../reducers/process-reducer';
import { useProcessList } from '../../contexts/process-list-context';

import { Section } from '../../components/Section';
import { PageError } from '../components/PageError';
import { SearchBar } from '../../components/SearchBar';
import { AddButton } from '../../components/AddButton';
import { Container } from '../../components/Container';
import { BaseLayout } from '../../layouts/BaseLayout';
import { ProcessCard } from '../components/ProcessCard';
import { ProcessCardSkeleton } from '../components/ProcessCardSkeleton';
import { NoContentMessageCard } from '../components/NoContentMessageCard';
import { Selector, SelectorGroup } from '../../components/Selector';

export const ProcessListPage = ({ history }) => {
  const { state, actions } = useProcessList();
  const { processList, searchContext, status } = state;
  const { fetchProcessList, searchProcess, setSearchContext, deleteProcess } = actions;

  useEffect(fetchProcessList, [fetchProcessList]);

  const goToProcessForm = () => {
    history.push('/processos/formulario/');
  };

  const goToEditProcessForm = (id) => {
    history.push(`/processos/formulario/${id}`);
  };

  const renderProcessList = () => {
    return processList.map((process) => (
      <ProcessCard
        key={process.id}
        processData={process}
        onDelete={deleteProcess}
        onEdit={(id) => goToEditProcessForm(id)}
      />
    ));
  };

  return (
    <BaseLayout>
      <Container>
        <SearchBar onSearch={searchProcess} />
        <Section>
          <AddButton onClick={goToProcessForm}>Adicionar</AddButton>
          <SelectorGroup value={searchContext} onChange={setSearchContext}>
            <Selector value={'PROCESS'} label={'Busca por Processo'} />
            <Selector value={'SUBJECT'} label={'Busca por Assunto'} />
          </SelectorGroup>
        </Section>
        <Section flexWrap="wrap">
          {status === STATUS.LOADING && renderLoadingList()}
          {status === STATUS.COMPLETE && renderProcessList()}
          {status === STATUS.ERROR && <PageError errorMessage={state.error} />}
          {status === STATUS.COMPLETE && processList.length === 0 && <NoContentMessageCard />}
        </Section>
      </Container>
    </BaseLayout>
  );
};

const renderLoadingList = () => {
  return (
    <>
      <ProcessCardSkeleton />
      <ProcessCardSkeleton />
      <ProcessCardSkeleton />
    </>
  );
};
