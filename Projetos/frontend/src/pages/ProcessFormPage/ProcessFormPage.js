import { useEffect, useRef, useState } from 'react';
import { Field, Form, Formik } from 'formik';

import { Button } from '@material-ui/core';

import SaveIcon from '@material-ui/icons/Save';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import ForwardRoundedIcon from '@material-ui/icons/ForwardRounded';

import { getProcessById } from '../../services/api/processos-service';
import { processSchema } from './form-utils/form-schema';
import { processInitialValues } from './form-utils/initial-values';

import { TextInput } from '../../components/TextInput';
import { BaseLayout } from '../../layouts/BaseLayout';
import { Grid, GridItem } from '../../components/Grid';
import { Section, SectionTitle } from '../../components/Section';
import { SearchSubjectComboBox } from '../../components/SearchSubjectComboBox';
import { SearchStakeholderComboBox } from '../../components/SearchStakeholderComboBox';

export const ProcessFormPage = ({ history, match }) => {
  const processIdFrompath = useRef(match.params.id || undefined).current;
  const [formInitialValues, setFormInitialValues] = useState();

  useEffect(() => {
    (() => {
      getProcessById(processIdFrompath).then(setFormInitialValues);
    })();
  }, []);

  const handleSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
    // createProcess(values);
    // setTimeout(() => {
    //   alert(JSON.stringify(values, null, 2));
    //   setSubmitting(false);
    // }, 400);
  };

  return (
    <BaseLayout>
      <Section display="block" paddingX={4} marginBottom={4}>
        <SectionTitle variant={'h4'} align="center" noDivider>
          Formulário de {!!processIdFrompath ? 'edição' : 'cadastro'} de processo
        </SectionTitle>
        <Formik
          enableReinitialize
          validateOnBlur
          onSubmit={handleSubmit}
          initialValues={processInitialValues}
          validationSchema={processSchema}
        >
          {(formProps) => {
            return (
              <Form>
                {!!processIdFrompath && (
                  <FormSection>
                    <Grid container spacing={1}>
                      <GridItem sm={6}>
                        <Field name="chaveProcesso" label="Chave do Processo" disabled="true" as={TextInput} />
                      </GridItem>
                      <GridItem sm={6}>
                        <Field name="nuProcesso" label="Número do Processo" disabled="true" as={TextInput} />
                      </GridItem>
                    </Grid>
                  </FormSection>
                )}
                <pre>{JSON.stringify(formProps.values, 0, 2)}</pre>

                <FormSection>
                  <SectionTitle>Dados do processo</SectionTitle>
                  <Grid container spacing={1}>
                    <GridItem sm={2}>
                      <Field fullWidth name="sgOrgaoSetor" label="Órgão/Setor" as={TextInput} />
                    </GridItem>
                    <GridItem sm={2}>
                      <Field name="nuAno" label="Ano do Processo" as={TextInput} />
                    </GridItem>
                    <GridItem>
                      <Field name="descricao" label="Descrição" multiline="true" as={TextInput} />
                    </GridItem>
                  </Grid>
                </FormSection>

                <FormSection>
                  <SectionTitle>Assunto</SectionTitle>
                  <Grid container spacing={1}>
                    <GridItem sm={8}>
                      <Field autoFocus name="cdAssunto" as={SearchSubjectComboBox} />
                    </GridItem>
                    <GridItem sm={4}>
                      <Field name="cdAssunto.dtCadastro" label="Data do Cadastro" disabled="true" as={TextInput} />
                    </GridItem>
                  </Grid>
                </FormSection>

                <FormSection>
                  <SectionTitle>Interessado</SectionTitle>
                  <Grid container spacing={1}>
                    <Field autoFocus name="cdInteressado" as={SearchStakeholderComboBox} />
                    <GridItem sm={8}>
                      <Field
                        name="cdInteressado.nmInteressado"
                        label="Nome do Interessado"
                        disabled="true"
                        as={TextInput}
                      />
                    </GridItem>
                    <GridItem sm={4}>
                      <Field
                        name="cdInteressado.dtNascimento"
                        label="Data de Nascimento"
                        disabled="true"
                        as={TextInput}
                      />
                    </GridItem>
                  </Grid>
                </FormSection>

                <FormSection>
                  <Grid container alignContent="space-between">
                    <GridItem xs container justifyContent="flex-start">
                      <Button
                        style={{ backgroundColor: 'gray', color: 'white' }}
                        variant="contained"
                        startIcon={<ForwardRoundedIcon style={{ transform: 'rotate(180deg)' }} />}
                        onClick={history.goBack}
                      >
                        Voltar
                      </Button>
                    </GridItem>
                    <GridItem xs container justifyContent="center">
                      <Button
                        style={{ backgroundColor: 'lightcoral', color: 'white' }}
                        variant="contained"
                        startIcon={<CancelRoundedIcon />}
                        onClick={formProps.resetForm}
                        // disabled={isSubmitting}
                      >
                        Limpar
                      </Button>
                    </GridItem>
                    <GridItem xs container justifyContent="flex-end">
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        onClick={handleSubmit}
                        // disabled={isSubmitting || !isValid}
                      >
                        Salvar
                      </Button>
                    </GridItem>
                  </Grid>
                </FormSection>
              </Form>
            );
          }}
        </Formik>
      </Section>
    </BaseLayout>
  );
};

const FormSection = ({ children }) => (
  <Section display="block" paper padding={2} elevation={0}>
    {children}
  </Section>
);
