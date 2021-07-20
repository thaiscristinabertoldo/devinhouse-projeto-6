import * as Yup from 'yup';

const MENSAGEM_DE_OBRIGATORIEDADE_DO_CAMPO = 'Campo obrigatório!';

export const registrationSchema = Yup.object().shape({
  sgOrgaoSetor: Yup.string().required(MENSAGEM_DE_OBRIGATORIEDADE_DO_CAMPO),
  nuAno: Yup.string().required(MENSAGEM_DE_OBRIGATORIEDADE_DO_CAMPO),
  descricao: Yup.string().required(MENSAGEM_DE_OBRIGATORIEDADE_DO_CAMPO),
  cdAssunto: Yup.object().required(MENSAGEM_DE_OBRIGATORIEDADE_DO_CAMPO),
  cdInteressado: Yup.object().required(MENSAGEM_DE_OBRIGATORIEDADE_DO_CAMPO),
});
export const initialProcessValues = {
  sgOrgaoSetor: '',
  nuAno: '',
  descricao: '',
  cdAssunto: {},
  cdInteressado: {},
};
