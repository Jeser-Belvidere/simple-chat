import styles from './styles.module.css'
import Input from '@shared/ui/input/Input'
import Title from '@shared/ui/title/Title'
import Card from '@shared/ui/card/index'
import Button from '@shared/ui/button/Button'
import Separator from '@shared/ui/separator/Separator'
import signUpAPI from './api/signup'
import { useState, useEffect } from 'react'

type props = {
	tabHandler: () => void
}

export type userData = {
	username: string
	password: string
}

export default function SignUp({ tabHandler }: props) {
	const [formValid, setformValid] = useState(true)
	const [username, setUsername] = useState('')
	const [firstPassword, setFirstPassword] = useState('')
	const [secondPassword, setSecondPassword] = useState('')
	const [passwordError, setPasswordError] = useState<string | null>(null)

	const handleSubmit = (event: React.FormEvent, userData: userData) => {
		event.preventDefault()
		if (formValid) {
			signUpAPI(userData)
		}
	}

	const onBlurPassword = (firstPassword: string, secondPassword: string) => {
		if (firstPassword !== secondPassword) {
			setPasswordError('Passwords mismatch')
		} else setPasswordError(null)
	}

	useEffect(() => {
		if (passwordError) {
			setformValid(false)
		} else setformValid(true)
	}, [passwordError])

	return (
		<Card.Content classNames="p-lg" height={400} width={380}>
			<Title tag="h2" size={30}>
				Sign Up
			</Title>
			<form onSubmit={(e) => handleSubmit(e, { username, password: secondPassword })}>
				<Input
					id="username"
					name="username"
					required
					label="Username"
					classNames="mt-sm"
					onChange={(e) => setUsername(e.target.value)}
				/>
				<Input
					id="firstPassword"
					name="firstPassword"
					type="password"
					required
					label="Password"
					classNames="mt-sm"
					onChange={(e) => setFirstPassword(e.target.value)}
					onBlur={() => onBlurPassword(firstPassword, secondPassword)}
				/>
				{passwordError && <div className={styles.error}>{passwordError}</div>}
				<Input
					id="secondPassword"
					name="secondPassword"
					type="password"
					required
					label="Repeat password"
					classNames="mt-sm"
					onChange={(e) => setSecondPassword(e.target.value)}
					onBlur={() => onBlurPassword(firstPassword, secondPassword)}
				/>
				{passwordError && <div className={styles.error}>{passwordError}</div>}
				<Card.Actions>
					<Separator />
					<div className="mt-sm row justify-around">
						<Button label="Back" handler={tabHandler} type="reset" />
						<Button label="Register" type="submit" />
					</div>
				</Card.Actions>
			</form>
		</Card.Content>
	)
}
