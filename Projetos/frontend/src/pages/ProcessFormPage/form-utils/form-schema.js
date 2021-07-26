import * as Yup from 'yup';

const CAMPO_OBRIGATORIO = 'Campo obrigatório!';

export const processSchema = Yup.object().shape({
  sgOrgaoSetor: Yup.string().required(CAMPO_OBRIGATORIO),
  nuAno: Yup.number().max(2022, 'O número máximo é 2022').required(CAMPO_OBRIGATORIO),
  descricao: Yup.string().required(CAMPO_OBRIGATORIO),
  cdAssunto: Yup.object().required(CAMPO_OBRIGATORIO),
  cdInteressado: Yup.object().required(CAMPO_OBRIGATORIO),
});
