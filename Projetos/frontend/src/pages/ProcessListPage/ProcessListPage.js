import React, { useEffect, useState } from 'react';
import { generatePath } from 'react-router';

import { STATUS } from '../../reducers/process-reducer';
import { useProcess } from '../../contexts/process-context';
import { useAppTheme } from '../../contexts/theme-context';

import { Section } from '../../components/Section';
import { SearchBar } from '../../components/SearchBar';
import { AddButton } from '../../components/AddButton';
import { Container } from '../../components/Container';
import { ConfirmAlert } from '../../components/ConfirmAlert';
import { BaseLayout } from '../../layouts/BaseLayout';
import { ButtonWithIcon } from '../../components/ButtonWithIcon';
import { Grid, GridItem } from '../../components/Grid';
import { Selector, SelectorGroup } from '../../components/Selector';

import { PageError } from './components/PageError';
import { ProcessCard } from './components/ProcessCard';
import { ProcessCardSkeleton } from './components/ProcessCardSkeleton';
import { NoContentMessageCard } from './components/NoContentMessageCard';
import { ROUTER_URLS } from '../../router/constants';

export const ProcessListPage = ({ history }) => {
  const [selectedId, setSelectedId] = useState(null);

  const { viewAsGrid, onToggleView } = useAppTheme();
  const { state, actions } = useProcess();
  const { processList, status } = state;
  const { fetchProcessList, searchContext, searchProcess, setSearchContext, deleteProcess } = actions;

  useEffect(fetchProcessList, [fetchProcessList]);

  const goToProcessForm = () => {
    history.push(ROUTER_URLS.PROCESSOS_FORM);
  };

  const goToEditProcessForm = (id) => {
    history.push(generatePath(ROUTER_URLS.PROCESSOS_FORM_ID, { id }));
  };

  const confirmDelete = () => {
    deleteProcess(selectedId);
    setSelectedId(null);
  };

  const renderLoadingList = () => {
    const gridViewProps = viewAsGrid ? { container: true, spacing: 1 } : {};
    const numberOfProcessCardSkeleton = 8;
    const processSkeletonList = [];
    for (let i = 0; i < numberOfProcessCardSkeleton; i++) {
      processSkeletonList.push(<ProcessCardSkeleton />);
    }
    return (
      <Grid {...gridViewProps}>
        {processSkeletonList.map((processCardSkeleton) => (
          <GridItem key={process.id} sm={viewAsGrid ? 4 : null}>
            {processCardSkeleton}
          </GridItem>
        ))}
      </Grid>
    );
  };

  const renderProcessList = () => {
    const gridViewProps = viewAsGrid ? { container: true, spacing: 1 } : {};
    return (
      <Grid {...gridViewProps}>
        {processList.map((process, idx) => (
          <GridItem key={`${process.id}-${idx}`} sm={viewAsGrid ? 4 : null}>
            <ProcessCard processData={process} onDelete={setSelectedId} onEdit={(id) => goToEditProcessForm(id)} />
          </GridItem>
        ))}
      </Grid>
    );
  };

  return (
    <BaseLayout>
      <Container>
        <Section>
          <SearchBar onSearch={searchProcess} />
        </Section>
        <Section display="flex" justifyContent="space-between" alignItems="center">
          <AddButton onClick={goToProcessForm}>Adicionar</AddButton>
          <Section display="flex" width={null}>
            <SelectorGroup value={searchContext} onChange={setSearchContext}>
              <Selector value={'PROCESS'} label={'Busca por Número do Processo'} />
              <Selector value={'SUBJECT'} label={'Busca por Assunto'} />
            </SelectorGroup>
            <ButtonWithIcon onClick={onToggleView} iconName={viewAsGrid ? 'view_list' : 'grid_view'} />
          </Section>
        </Section>
        <Section>
          {status === STATUS.LOADING && renderLoadingList()}
          {status === STATUS.COMPLETE && renderProcessList()}
          {status === STATUS.ERROR && <PageError errorMessage={state.error} />}
          {status === STATUS.COMPLETE && processList.length === 0 && <NoContentMessageCard />}
        </Section>
        <ConfirmAlert
          open={!!selectedId}
          title={TEXT.ALERT_TITLE}
          message={TEXT.ALERT_MESSAGE}
          onConfirm={confirmDelete}
          onCancel={() => setSelectedId(null)}
        />
      </Container>
    </BaseLayout>
  );
};

const TEXT = {
  ALERT_TITLE: 'Confirmar exclusão de processo',
  ALERT_MESSAGE: 'Você tem certeza que deseja excluir o processo selecionado?',
};
