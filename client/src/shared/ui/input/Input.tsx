import styles from './styles.module.css'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	label?: string
	classNames?: string
}

export default function Input({ label, classNames, ...props }: InputProps) {
	return (
		<div className={styles.wrapper + ' ' + classNames}>
			<input {...props} className={styles.input}></input>
			<span>{label}</span>
			<i />
		</div>
	)
}
