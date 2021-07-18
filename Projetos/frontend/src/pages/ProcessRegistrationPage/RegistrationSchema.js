import * as Yup from 'yup';

const MENSAGEM_DE_OBRIGATORIEDADE_DO_CAMPO = 'Campo obrigatório!';

export const registrationSchema = Yup.object().shape({
  nuProcesso: Yup.number().required(MENSAGEM_DE_OBRIGATORIEDADE_DO_CAMPO),
  sgOrgaoSetor: Yup.string().required(MENSAGEM_DE_OBRIGATORIEDADE_DO_CAMPO),
  descricao: Yup.string().required(MENSAGEM_DE_OBRIGATORIEDADE_DO_CAMPO),
  
});
