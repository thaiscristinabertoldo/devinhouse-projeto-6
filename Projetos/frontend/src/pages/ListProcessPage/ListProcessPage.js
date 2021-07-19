import { Box, Container, Fab, FormControlLabel, Grid, makeStyles, Radio, RadioGroup, Slide } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { AddButton } from '../../components/AddButton';
import { ProcessCardContainer } from '../../components/ProcessCardContainer/ProcessCardContainer';
import { ProcessCardContainerSkeleton } from '../../components/ProcessCardContainerSkeleton';
import { SearchBar } from '../../components/SearchBar';
import { styles } from './ListProcessPage.styles';
import { processList as process } from '../../mock';
import { useHistory } from 'react-router-dom';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { ScrollTop } from '../../components/BackToTopButton/BackToTopButton';

const useStyles = makeStyles(styles);

export const ListProcessPage = (props) => {
  const classes = useStyles();

  const [load, setLoad] = useState(true);

  const [value, setValue] = useState('processo');

  const handleChangeCheckedSearchOption = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setTimeout(() => setLoad(false), 3000);
  }, []);

  const history = useHistory();

  const handleClickIntoAddButtonToGoToTheRegistrationProcessPage = () => {
    history.push('/processos/cadastro');
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
              value="processo"
              control={<Radio color="primary" />}
              label="Busca por Processo"
              labelPlacement="left"
            />
            <FormControlLabel
              value="assunto"
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
              />
            ))}
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
