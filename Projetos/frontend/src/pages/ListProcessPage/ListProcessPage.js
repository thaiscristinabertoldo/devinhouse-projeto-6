import { Grid, makeStyles, Slide } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { AddButton } from '../../components/AddButton';
import { ProcessCardContainer } from '../../components/ProcessCardContainer/ProcessCardContainer';
import { ProcessCardContainerSkeleton } from '../../components/ProcessCardContainerSkeleton';
import { SearchBar } from '../../components/SearchBar';
import { styles } from './ListProcessPage.styles';
import { processList as process } from '../../mock';

const useStyles = makeStyles(styles);

export const ListProcessPage = () => {
  const classes = useStyles();
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoad(false), 3000);
  }, []);

  return (
    <div>
      <Grid container justifyContent="center" className={classes.search}>
        <SearchBar />
      </Grid>
      <Grid container direction="column" justifyContent="center" alignItems="center">
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
          <Grid container justifyContent="flex-end" className={classes.addButton}>
            <AddButton />
          </Grid>
        </Slide>
      )}
    </div>
  );
};
