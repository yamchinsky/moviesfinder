import React, { useMemo, useState } from 'react'

import { useDispatch } from 'react-redux'
import { Form, Formik, useField } from 'formik'
import * as Yup from 'yup'
import './authForm.scss'
import { userSignIn, userSignUp } from '../../redux/slices/userSlice'

const initialForm = { email: '', password: '' }

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.email(`* E-mail адрес введен неверно!`)
		.min(5, '* Минимум 5 символов')
		.required('*это обязательное поле'),
	password: Yup.string()
		.required('*это обязательное поле')
		.min(5, '* Минимум 6 символов')
		.max(20, '* Максимум 20 символов'),
})

export const FormControl = ({ label, ...props }) => {
	const id = useMemo(() => Math.floor(Math.random() * 99999).toString(), [])
	const [field, meta] = useField(props)

	return (
		<div className="form_control_container">
			<label className="label" htmlFor={id}>
				{label}
				<input
					id={id}
					className={
						meta.error && meta.touched ? `${'input_error'}` : `${'input'}`
					}
					{...field}
					{...props}
				/>
				<div className={'box_error_message'}>
					{meta.error && meta.touched && (
						<p className={'error_message_text'}>{meta.error}</p>
					)}
				</div>
			</label>
		</div>
	)
}

export default function AuthForm() {
	const [action, setAction] = useState('')

	const dispatch = useDispatch()

	const handleSubmit = values => {
		if (action === 'register') {
			dispatch(userSignUp(values))
		} else if (action === 'login') {
			dispatch(userSignIn(values))
		}
	}

	return (
		<div className={'form_container'}>
			<Formik
				initialValues={initialForm}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				<Form className={'form'} autoComplete="off">
					<div className={'form_paragraph_container'}>
						<p className={'form_paragraph'}>
							Вы можете зайти с помощью e-mail и пароля, <br />
							предварительно зарегистрировавшись:
						</p>
					</div>
					<div className={'form_input_area'}>
						<FormControl label="Электронная почта*" name="email" type="email" />
						<FormControl label="Пароль*" type="password" name="password" />
						<div className={'form_buttons'}>
							<button
								type="submit"
								className={'form_button'}
								onClick={() => setAction('login')}
							>
								Войти
							</button>

							<button
								type="submit"
								className={'form_button'}
								onClick={() => setAction('register')}
							>
								Регистрация
							</button>
						</div>
					</div>
				</Form>
			</Formik>
		</div>
	)
}
