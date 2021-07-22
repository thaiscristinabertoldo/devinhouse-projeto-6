import { Box, Container, Fab, FormControlLabel, Grid, Radio, RadioGroup } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { ProcessCardSkeleton } from '../components/ProcessCardSkeleton';
import { SearchBar } from '../../components/SearchBar';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { ScrollTop } from '../../components/BackToTopButton/BackToTopButton';
import { AddButton } from '../../components/AddButton';
import { ProcessCard } from '../components/ProcessCard';
import { NoContentMessageCard } from '../components/NoContentMessageCard';
import { mockedProcessList } from '../../mock';

export const ListProcessPage = (props) => {
  const { history } = props;

  const [loading, setLoading] = useState(false);
  const [processList, setProcessList] = useState([]);

  const fetchProcess = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(mockedProcessList);
      }, 5000);
    });
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      setProcessList(await fetchProcess());
      setLoading(false);
    })();
    // getAllProcess().then(setProcessList, handleRequestError);
  }, []);

  const goToProcessForm = () => {
    history.push('/processos/formulario/');
  };

  const goToEditProcessForm = (id) => {
    history.push(`/processos/formulario/${id}`);
  };

  const handleDeleteProcess = () => {
    // TODO implementar deleção
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
    <Container maxWidth="xl">
      <Grid container justifyContent="center">
        <SearchBar term="termo de busca" setTerm={() => {}} />
      </Grid>
      <Box justifyContent="space-between" display="flex" width="100%" alignItems="center" marginY={2}>
        <RadioGroup row aria-label="position" name="position" defaultValue="top" value={''} onChange={console.log}>
          <FormControlLabel
            value="PROCESS"
            control={<Radio color="primary" />}
            label="Busca por Processo"
            labelPlacement="left"
          />
          <FormControlLabel
            value="SUBJECT"
            control={<Radio color="primary" />}
            label="Busca por Assunto"
            labelPlacement="left"
          />
        </RadioGroup>
        <AddButton onClick={goToProcessForm}>Adicionar</AddButton>
      </Box>
      <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center">
        {loading && (
          <>
            <ProcessCardSkeleton />
            <ProcessCardSkeleton />
            <ProcessCardSkeleton />
          </>
        )}
        {!loading && !!processList.length && renderProcessList()}
        {!loading && processList.length === 0 && <NoContentMessageCard />}
      </Box>
      <ScrollTop {...props}>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon style={{ color: 'white' }} />
        </Fab>
      </ScrollTop>
    </Container>
  );
};
