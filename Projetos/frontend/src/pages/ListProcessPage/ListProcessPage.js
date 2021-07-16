import { Grid } from '@material-ui/core';
import { ProcessCardContainer } from '../../components/ProcessCardContainer/ProcessCardContainer';
import { useStyles } from './ListProcessPage.styles';

export const ListProcessPage = (props) => {
  const { process } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>ListProcessPage</h1>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        {process?.map((element, index) => (
          <ProcessCardContainer
            processTitle={element.chaveProcesso}
            processNumber={element.nuProcesso}
            processOrgan={element.sgOrgaoSetor}
            processDescription={element.cdAssunto.descricao}
            descriptionStatus={element.cdAssunto.flAtivo === ('s' || 'S') ? 'Sim' : 'Não'}
            processStakeholders={element.cdInteressado.nmInteressado}
            processDescription={element.descricao }
          />
        ))}
      </Grid>
    </div>
  );
};
