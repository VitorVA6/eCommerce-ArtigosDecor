import * as yup from 'yup' 

const regexNomeComposto = /^([a-zA-ZÀ-ÿ]+)( [a-zA-ZÀ-ÿ]+)/

export const emailSchema = yup.object().shape({
    email: yup.string()
    .email('Email inválido.')
    .required("Campo obrigatório.")
})

export const passwordSchema = yup.object().shape({
    password: yup.string().min(6, 'Senha muito curta').required('Campo obrigatório.'),
    newPassword: yup.string().min(6, 'Senha muito curta').required('Campo obrigatório.'),
    confirmPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Confirmação de senha não bate com a nova senha.').required('Campo obrigatório.')
})

export const block1Schema = yup.object().shape({
    name: yup.string().min(6, 'Digite seu nome completo').matches(regexNomeComposto, 'aaa.').required('Campo obrigatório'),
    cpf: yup.string().min(14, 'Campo inválido').required('Campo obrigatório'),
    whats: yup.string().min(15, 'Campo inválido').required('Campo obrigatório')
})

export const block2Schema = yup.object().shape({
    cep: yup.string().min(9, 'CEP inválido').required('Campo obrigatório'),
    endereco: yup.string().required('Campo obrigatório'),
    numero: yup.string().required('Campo obrigatório'),
    bairro: yup.string().required('Campo obrigatório'),
    complemento: yup.string(),
})