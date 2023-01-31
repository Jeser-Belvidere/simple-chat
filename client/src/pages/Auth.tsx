import SignIn from '@components/signin'
import SignUp from '@components/singup'
import { useState } from 'react'

export default function AuthPage() {
	const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin')

	return (
		<div className="all-centered fullheight">
			{activeTab === 'signin' ? (
				<SignIn tabHandler={() => setActiveTab('signup')} />
			) : (
				<SignUp tabHandler={() => setActiveTab('signin')} />
			)}
		</div>
	)
}
