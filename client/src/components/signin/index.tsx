import Input from '@shared/ui/input/Input'
import Title from '@shared/ui/title/Title'
import Card from '@shared/ui/card/index'
import Button from '@shared/ui/button/Button'
import Separator from '@shared/ui/separator/Separator'
import loginIcon from '@assets/icons/login.svg'
import { useState } from 'react'
import signInAPI from './api/signIn'

const signIn = (event: React.SyntheticEvent) => {
	console.log(event)
}

type props = {
	tabHandler: () => void
}

export type userData = {
	username: string
	password: string
}

export default function SignIn({ tabHandler }: props) {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = (event: React.FormEvent, userData: userData) => {
		event.preventDefault()
		signInAPI(userData)
	}

	return (
		<Card.Content classNames="p-lg" height={400} width={380}>
			<Title tag="h2" size={30}>
				Sign In
			</Title>
			<form onSubmit={(e) => handleSubmit(e, { username, password })}>
				<Input
					required
					label="username"
					classNames="mt-md"
					onChange={(e) => setUsername(e.target.value)}
				/>
				<Input
					required
					type="password"
					label="Password"
					classNames="mt-md"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Card.Actions>
					<Separator />
					<div className="mt-sm row justify-around">
						<Button label="signin" icon={loginIcon} handler={signIn} />
						<Button label="signup" handler={tabHandler} />
					</div>
				</Card.Actions>
			</form>
		</Card.Content>
	)
}
