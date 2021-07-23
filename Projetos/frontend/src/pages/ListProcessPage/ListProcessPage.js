import { Box, Container, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { ProcessCardSkeleton } from '../components/ProcessCardSkeleton';
import { SearchBar } from '../../components/SearchBar';
import { AddButton } from '../../components/AddButton';
import { ProcessCard } from '../components/ProcessCard';
import { NoContentMessageCard } from '../components/NoContentMessageCard';
import { deleteProcess, getAllProcess } from '../../services/api/processos-service';
import { handleRequestError } from '../../services/api/error-service';
import { BaseLayout } from '../../layouts/BaseLayout';

const SEARCH_BY = {
  PROCESS: 'PROCESS',
  SUBJECT: 'SUBJECT',
};

export const ListProcessPage = (props) => {
  const { history } = props;

  const [loading, setLoading] = useState(false);
  const [processList, setProcessList] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [searchContext, setSearchContext] = useState('PROCESS');

  const fetchProcess = async ({ cdAssunto = null, chaveProcesso = null }) => {
    setLoading(true);
    try {
      const response = await getAllProcess({ cdAssunto, chaveProcesso });
      if (!!response) {
        setProcessList(response);
      }
    } catch (err) {
      handleRequestError(err);
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  };

  useEffect(() => {
    (async () => {
      return await fetchProcess({ cdAssunto: null, chaveProcesso: null });
    })();
  }, []);

  const handleSearchProcess = async () => {
    if (searchContext === SEARCH_BY.PROCESS) {
      fetchProcess({ chaveProcesso: searchTerm });
    }
    if (searchContext === SEARCH_BY.SUBJECT) {
      fetchProcess({ cdAssunto: searchTerm });
    }
  };

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
    return processList.map((process) => {
      return (
        <ProcessCard
          key={process.id}
          processData={process}
          onDelete={(id) => handleDeleteProcess(id)}
          onEdit={(id) => goToEditProcessForm(id)}
        />
      );
    });
  };

  return (
    <BaseLayout>
      <Container maxWidth="xl">
        <SearchBar term={searchTerm} setTerm={setSearchTerm} onSearch={handleSearchProcess} />
        <Box justifyContent="space-between" display="flex" width="100%" alignItems="center" marginY={2}>
          <AddButton onClick={goToProcessForm}>Adicionar</AddButton>
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue="top"
            value={searchContext}
            onChange={(e) => setSearchContext(e.target.value)}
          >
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
          {loading && renderLoadingList()}
          {!loading && !!processList.length && renderProcessList()}
          {!loading && processList.length === 0 && <NoContentMessageCard />}
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
      <ProcessCardSkeleton />
      <ProcessCardSkeleton />
      <ProcessCardSkeleton />
      <ProcessCardSkeleton />
      <ProcessCardSkeleton />
      <ProcessCardSkeleton />
    </>
  );
};
