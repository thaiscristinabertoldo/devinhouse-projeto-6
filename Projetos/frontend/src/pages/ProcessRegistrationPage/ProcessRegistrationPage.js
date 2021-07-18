import { Button, Divider, Grid, Paper, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { Input } from '../../components/Input';
import { useStyles } from './ProcessRegistrationPage.styles';
import SaveIcon from '@material-ui/icons/Save';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import ForwardRoundedIcon from '@material-ui/icons/ForwardRounded';
import { useHistory } from 'react-router-dom';
import SearchSubjectComboBox from '../../components/SearchSubjectComboBox/SearchSubjectComboBox';
import SearchStakeholderComboBox from '../../components/SearchStakeholderComboBox/SearchStakeholderComboBox';

export const ProcessRegistrationPage = () => {
  const classes = useStyles();

  const history = useHistory();

  const handleGoBack = () => {
    history.push('/processos');
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  const INITIAL_PROCESS = {
    id: 0,
    nuProcesso: 0,
    sgOrgaoSetor: '',
    nuAno: '',
    chaveProcesso: '',
    descricao: '',
    cdAssunto: {
      id: 0,
      descricao: '',
      dtCadastro: '',
      flAtivo: '',
    },
    cdInteressado: {
      id: 0,
      nmInteressado: '',
      nuIdentificacao: '',
      dtNascimento: '',
      flAtivo: '',
    },
  };

  return (
    <Grid container justifyContent="center">
      <Paper elevation={3} className={classes.container}>
        <Grid container justifyContent="center">
          <Typography variant="h1" align="center" gutterBottom className={classes.title}>
            <strong>Formulário de Cadastro de Processo</strong>
          </Typography>
          <Formik initialValues={INITIAL_PROCESS} onSubmit={handleSubmit}>
            <Form className={classes.form}>
              <Divider orientation="horizontal" variant="fullWidth" />
              <Grid container direction="row" justifyContent="space-between">
                <div className={classes.halfInput}>
                  <Field
                    autoFocus
                    name="chaveProcesso"
                    as={() => <Input label="Chave do Processo" defaultValue="SOFT 26/2021" disabled="true" />}
                  />
                </div>
                <div className={classes.halfInput}>
                  <Field
                    autoFocus
                    name="nuProcesso"
                    as={() => <Input label="Número do Processo" defaultValue="26" disabled="true" />}
                  />
                </div>
              </Grid>
              <Field autoFocus name="nuAno" as={() => <Input label="Ano do Processo" />} />
              <Field autoFocus name="sgOrgaoSetor" as={() => <Input label="Órgão/Setor" />} />
              <Field autoFocus name="descricao" as={() => <Input label="Descrição" multiline="true" />} />
              <Divider orientation="horizontal" variant="fullWidth" className={classes.divider} />
              <Grid container justifyContent="center">
                <Typography variant="h2" className={classes.subtitle}>
                  <strong>Assunto</strong>
                </Typography>
              </Grid>
              <Divider orientation="horizontal" variant="fullWidth" className={classes.divider} />
              <SearchSubjectComboBox />
              <Grid container direction="row" justifyContent="space-between">
                <div className={classes.halfInput}>
                  <Field autoFocus name="dtCadastro" as={() => <Input label="Data do Cadastro" disabled="true" />} />
                </div>
                <div className={classes.halfInput}>
                  <Field autoFocus name="flAtivo" as={() => <Input label="Ativo" disabled="true" />} />
                </div>
              </Grid>
              <Divider orientation="horizontal" variant="fullWidth" className={classes.divider} />
              <Grid container justifyContent="center">
                <Typography variant="h2" className={classes.subtitle}>
                  <strong>Interessado</strong>
                </Typography>
              </Grid>
              <Divider orientation="horizontal" variant="fullWidth" className={classes.divider} />
              <SearchStakeholderComboBox />
              <Field autoFocus name="nmInteressado" as={() => <Input label="Nome do Interessado" disabled="true" />} />
              <Grid container direction="row" justifyContent="space-between">
                <div className={classes.halfInput}>
                  <Field
                    autoFocus
                    name="dtNascimento"
                    as={() => <Input label="Data de Nascimento" disabled="true" />}
                  />
                </div>
                <div className={classes.halfInput}>
                  <Field autoFocus name="flAtivo" as={() => <Input label="Ativo" disabled="true" />} />
                </div>
              </Grid>
              <br />
              <Grid container justifyContent="space-between">
                <Button
                  variant="contained"
                  className={classes.button}
                  startIcon={<ForwardRoundedIcon style={{ transform: 'rotate(180deg)' }} />}
                  onClick={handleGoBack}
                >
                  <strong>Voltar</strong>
                </Button>
                <Button variant="contained" className={classes.button} startIcon={<CancelRoundedIcon />}>
                  <strong>Limpar</strong>
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  className={classes.button}
                  startIcon={<SaveIcon />}
                  onClick={(e) => {
                    e.preventDefault();
                    console.log('oI');
                  }}
                >
                  <strong>Salvar</strong>
                </Button>
              </Grid>
            </Form>
          </Formik>
        </Grid>
      </Paper>
    </Grid>
  );
};
