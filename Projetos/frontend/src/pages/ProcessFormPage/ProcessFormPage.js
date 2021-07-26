import React, { useEffect, useRef, useState } from 'react';
import { Field, Form, Formik } from 'formik';

import { Button } from '@material-ui/core';

import SaveIcon from '@material-ui/icons/Save';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import ForwardRoundedIcon from '@material-ui/icons/ForwardRounded';

import { processSchema } from './form-utils/form-schema';
import { processInitialValues } from './form-utils/initial-values';

import { TextInput } from '../../components/TextInput';
import { BaseLayout } from '../../layouts/BaseLayout';
import { createProcess, getProcessById, updateProcessById } from '../../services/api/processos-service';
import { Grid, GridItem } from '../../components/Grid';
import { getAllAssuntos } from '../../services/api/assuntos-service';
import { AutocompleteInput } from '../../components/AutocompleteInput';
import { getAllInteressados } from '../../services/api/interessados-service';
import { Section, SectionTitle } from '../../components/Section';
import { toast } from 'react-toastify';

export const ProcessFormPage = ({ history, match }) => {
  const processIdFrompath = useRef(match.params.id || undefined).current;
  const [formInitialValues, setFormInitialValues] = useState(processInitialValues);
  const [assuntos, setAssuntos] = useState([]);
  const [interessados, setInteressados] = useState([]);

  useEffect(() => {
    if (processIdFrompath) {
      getProcessById(processIdFrompath).then(setFormInitialValues);
    }
  }, [processIdFrompath]);

  useEffect(() => {
    Promise.all([getAllAssuntos(), getAllInteressados()]).then(([assuntos, interessados]) => {
      setAssuntos(assuntos);
      setInteressados(interessados);
    });
  }, []);

  const handleSubmit = async (values) => {
    const { cdAssunto, cdInteressado } = values;
    const dataToPersist = Object.assign({}, values, { cdAssuntoId: cdAssunto?.id, cdInteressadoId: cdInteressado?.id });
    if (processIdFrompath) {
      await updateProcessById(processIdFrompath, dataToPersist);
      toast.success('Processo atualizado com sucesso!');
    } else {
      await createProcess(dataToPersist);
      toast.success('Processo criado com sucesso!');
    }
    history.goBack();
  };

  const renderProcessMeta = () => (
    <FormSection>
      <Grid container spacing={1}>
        <GridItem sm={6}>
          <Field
            InputLabelProps={{ shrink: true }}
            inputProps={{ readOnly: true }}
            name="chaveProcesso"
            label="Chave do Processo"
            variant={'outlined'}
            disabled
            as={TextInput}
          />
        </GridItem>
        <GridItem sm={6}>
          <Field
            InputLabelProps={{ shrink: true }}
            inputProps={{ readOnly: true }}
            name="nuProcesso"
            label="Número do Processo"
            variant={'outlined'}
            disabled
            as={TextInput}
          />
        </GridItem>
      </Grid>
    </FormSection>
  );

  return (
    <BaseLayout>
      <Section display="block" paddingX={4}>
        <SectionTitle variant={'h4'} align="center" noDivider>
          Formulário de {!!processIdFrompath ? 'edição' : 'cadastro'} de processo
        </SectionTitle>
        <Formik
          enableReinitialize
          validateOnBlur
          onSubmit={handleSubmit}
          initialValues={formInitialValues}
          validationSchema={processSchema}
        >
          {(formProps) => {
            return (
              <Form>
                {!!processIdFrompath && renderProcessMeta()}
                {/*<pre>{JSON.stringify(formProps.errors, 0, 2)}</pre>*/}
                <FormSection>
                  <SectionTitle>Dados do processo</SectionTitle>
                  <Grid container spacing={1}>
                    <GridItem sm={6}>
                      <Field
                        fullWidth
                        name="sgOrgaoSetor"
                        label="Órgão/Setor"
                        as={TextInput}
                        {...buildErrorProps('sgOrgaoSetor', formProps)}
                        inputProps={{ maxLength: 4 }}
                      />
                    </GridItem>
                    <GridItem sm={6}>
                      <Field
                        name="nuAno"
                        label="Ano do Processo"
                        type="number"
                        as={TextInput}
                        {...buildErrorProps('nuAno', formProps)}
                      />
                    </GridItem>
                    <GridItem>
                      <Field
                        name="descricao"
                        label="Descrição"
                        multiline={true}
                        rows={4}
                        as={TextInput}
                        {...buildErrorProps('descricao', formProps)}
                      />
                    </GridItem>
                  </Grid>
                </FormSection>

                <FormSection>
                  <SectionTitle>Assunto</SectionTitle>
                  <Grid container spacing={1}>
                    <GridItem sm={8}>
                      <Field
                        label="Descrição do assunto"
                        name="cdAssunto"
                        component={AutocompleteInput}
                        options={assuntos}
                        {...buildErrorProps('cdAssunto', formProps)}
                        renderOption={(option) => (
                          <>
                            {option.id} - {option.descricao} - {option.dtCadastro}
                          </>
                        )}
                      />
                    </GridItem>
                    <GridItem sm={4}>
                      <Field name="cdAssunto.dtCadastro" label="Data do Cadastro" disabled as={TextInput} />
                    </GridItem>
                  </Grid>
                </FormSection>

                <FormSection>
                  <SectionTitle>Interessado</SectionTitle>
                  <Grid container spacing={2}>
                    <GridItem sm={8}>
                      <Field
                        label="Número de identificação do interessado"
                        placeholder="Informe o número de identificação do interessado"
                        name="cdInteressado"
                        component={AutocompleteInput}
                        options={interessados}
                        labelProperty="nuIdentificacao"
                        {...buildErrorProps('cdInteressado', formProps)}
                        renderOption={(option) => (
                          <>
                            {option.nuIdentificacao} - {option.nmInteressado}
                          </>
                        )}
                      />
                    </GridItem>
                    <GridItem sm={4}>
                      <Field name="cdInteressado.dtNascimento" label="Data de Nascimento" disabled as={TextInput} />
                    </GridItem>
                    <GridItem>
                      <Field name="cdInteressado.nmInteressado" label="Nome do Interessado" disabled as={TextInput} />
                    </GridItem>
                  </Grid>
                </FormSection>

                <FormSection>
                  <Grid container alignContent="space-between" spacing={2}>
                    <GridItem xs container justifyContent="flex-start">
                      <Button
                        color="default"
                        variant="contained"
                        startIcon={<ForwardRoundedIcon style={{ transform: 'rotate(180deg)' }} />}
                        onClick={history.goBack}
                      >
                        Voltar
                      </Button>
                    </GridItem>
                    <GridItem xs container justifyContent="center">
                      <Button
                        style={{ color: 'white' }}
                        color="secondary"
                        variant="contained"
                        startIcon={<CancelRoundedIcon />}
                        onClick={formProps.resetForm}
                        disabled={formProps.isSubmitting || !!processIdFrompath}
                      >
                        Limpar
                      </Button>
                    </GridItem>
                    <GridItem xs container justifyContent="flex-end">
                      <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        onClick={formProps.handleSubmit}
                        disabled={formProps.isSubmitting || !formProps.isValid}
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

const FormSection = ({ children, ...rest }) => (
  <Section display="block" paper padding={2} elevation={0} {...rest}>
    {children}
  </Section>
);

const buildErrorProps = (field, formProps) => {
  return { error: formProps.errors[field] && formProps.touched[field], helperText: formProps.errors[field] };
};
