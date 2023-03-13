import * as yup from 'yup' 

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