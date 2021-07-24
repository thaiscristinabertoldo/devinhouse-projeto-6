import React, { useEffect } from 'react';

import { Box, Container, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { useProcessList } from '../../contexts/process-context';
import { ProcessCardSkeleton } from '../components/ProcessCardSkeleton';
import { SearchBar } from '../../components/SearchBar';
import { AddButton } from '../../components/AddButton';
import { ProcessCard } from '../components/ProcessCard';
import { NoContentMessageCard } from '../components/NoContentMessageCard';
import { deleteProcess } from '../../services/api/processos-service';
import { BaseLayout } from '../../layouts/BaseLayout';
import { STATUS } from '../../reducers/process-reducer';
import { PageError } from '../components/PageError';

export const ListProcessPage = ({ history }) => {
  const { state, actions } = useProcessList();
  const { processList, searchContext, status } = state;
  const { fetchProcess, searchProcess, setSearchContext } = actions;

  useEffect(fetchProcess, [fetchProcess]);

  const goToProcessForm = () => {
    history.push('/processos/formulario/');
  };

  const goToEditProcessForm = (id) => {
    history.push(`/processos/formulario/${id}`);
  };

  const handleDeleteProcess = (id) => {
    deleteProcess(id);
    fetchProcess({ cdAssunto: null, chaveProcesso: null });
  };

  const renderProcessList = () => {
    return processList.map((process) => (
      <ProcessCard
        key={process.id}
        processData={process}
        onDelete={(id) => handleDeleteProcess(id)}
        onEdit={(id) => goToEditProcessForm(id)}
      />
    ));
  };

  return (
    <BaseLayout>
      <Container maxWidth="xl">
        <SearchBar onSearch={searchProcess} />
        <Box justifyContent="space-between" display="flex" width="100%" alignItems="center" marginY={2}>
          <AddButton onClick={goToProcessForm}>Adicionar</AddButton>
          <RadioGroup row name="searchContext" value={searchContext} onChange={(e) => setSearchContext(e.target.value)}>
            <FormControlLabel
              value="PROCESS"
              control={<Radio color="primary" />}
              label="Busca por Processo"
              labelPlacement="end"
            />
            <FormControlLabel
              value="SUBJECT"
              control={<Radio color="primary" />}
              label="Busca por Assunto"
              labelPlacement="end"
            />
          </RadioGroup>
        </Box>

        <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center">
          {status === STATUS.LOADING && renderLoadingList()}
          {status === STATUS.COMPLETE && renderProcessList()}
          {status === STATUS.ERROR && <PageError errorMessage={state.error} />}
          {status === STATUS.COMPLETE && processList.length === 0 && <NoContentMessageCard />}
        </Box>
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
