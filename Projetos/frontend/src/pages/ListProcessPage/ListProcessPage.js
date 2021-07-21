import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Fab,
  FormControlLabel,
  Grid,
  makeStyles,
  Paper,
  Radio,
  RadioGroup,
  Slide,
  Typography,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { AddButton } from '../../components/AddButton';
import { ProcessCardContainer } from '../../components/ProcessCardContainer/ProcessCardContainer';
import { ProcessCardContainerSkeleton } from '../../components/ProcessCardContainerSkeleton';
import { SearchBar } from '../../components/SearchBar';
import { styles } from './ListProcessPage.styles';
import { Link, useHistory } from 'react-router-dom';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { ScrollTop } from '../../components/BackToTopButton/BackToTopButton';
import { useSearchContext } from '../../contexts/search-context';
import { Pre } from '../../components/Pre/Pre';

const useStyles = makeStyles(styles);

export const ListProcessPage = (props) => {
  const classes = useStyles();

  const [load, setLoad] = useState(true);

  const [value, setValue] = useState('PROCESS');

  const { onChangeSearchType, searchType, onChangeSearchKey, searchKey, loadProcessListOfSearch, process } =
    useSearchContext();

  const handleChangeCheckedSearchOption = (event) => {
    setValue(event.target.value);
    onChangeSearchType(event.target.value);
  };

  useEffect(() => {
    setTimeout(() => setLoad(false), 3000);
  }, []);

  const history = useHistory();

  const handleClickIntoAddButtonToGoToTheRegistrationProcessPage = () => {
    history.push('/processos/formulario/');
  };

  const handleEditProcess = (id) => {
    history.push(`/processos/formulario/${id}`);
  };

  return (
    <>
      <Container>
        <Grid container justifyContent="center">
          <SearchBar />
        </Grid>
        <Box justifyContent="space-between" display="flex" width="100%" alignItems="center" marginY={2}>
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue="top"
            value={value}
            onChange={handleChangeCheckedSearchOption}
          >
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
          <AddButton handleClick={handleClickIntoAddButtonToGoToTheRegistrationProcessPage} />
        </Box>
        <Grid container direction="row" justifyContent="center" alignItems="center">
          {load && process?.map((_, index) => <ProcessCardContainerSkeleton key={index} />)}
          {!load &&
            process?.map((element, index) => (
              <ProcessCardContainer
                key={index}
                processTitle={element.chaveProcesso}
                processDate={element.nuAno}
                processNumber={element.nuProcesso}
                processOrgan={element.sgOrgaoSetor}
                processSubject={element.cdAssunto.descricao}
                subjectDescriptionStatus={element.cdAssunto.flAtivo}
                processStakeholder={element.cdInteressado.nmInteressado}
                stakeholderStatus={element.cdInteressado.flAtivo}
                processDescription={element.descricao}
                handleEditProcess={() => handleEditProcess(element.id)}
              />
            ))}
          {process?.length === 0 && (
            <Card style={{ width: '100%', height: '50%' }}>
              <CardContent>
                <Grid direction="column" justifyContent="center" style={{ width: '100%' }}>
                  <Typography component="h1" align="center" style={{ fontSize: 'x-large' }}>
                    <strong>Nenhum processo foi encontrado!</strong>
                  </Typography>
                  <br />
                  <Divider />
                  <br />
                  <Typography component="h6" align="center">
                    <Button
                      color="primary"
                      onClick={() => {
                        onChangeSearchKey('');
                        loadProcessListOfSearch();
                      }}
                    >
                      Clique aqui para voltar para a tela anterior!
                    </Button>
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          )}
        </Grid>
        {!load && (
          <Slide direction="up" in={!load} mountOnEnter unmountOnExit>
            <Grid container justifyContent="flex-end" className={classes.addButton}></Grid>
          </Slide>
        )}
        <ScrollTop {...props}>
          <Fab color="primary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon style={{ color: 'white' }} />
          </Fab>
        </ScrollTop>
      </Container>
    </>
  );
};
