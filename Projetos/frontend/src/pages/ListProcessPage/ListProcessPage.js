import { Grid } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { ProcessCardContainer } from '../../components/ProcessCardContainer/ProcessCardContainer';
import { ProcessCardContainerSkeleton } from '../../components/ProcessCardContainerSkeleton';
import { SearchBar } from '../../components/SearchBar';
import { useStyles } from './ListProcessPage.styles';

export const ListProcessPage = (props) => {
  const { process } = props;
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
        {load && process?.map(() => <ProcessCardContainerSkeleton />)}
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
              processStakeholders={element.cdInteressado.nmInteressado}
              processDescription={element.descricao}
            />
          ))}
      </Grid>
    </div>
  );
};
