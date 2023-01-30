import styles from './styles.module.css'
import Icon from '@ui/Icon/Icon'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	color?: 'positive' | 'negative'
	icon?: string
	label?: string
	handler?: (event: React.SyntheticEvent) => void
}
export default function Button({ color, icon, label, handler, ...props }: ButtonProps) {
	return (
		//TODO: To complete button wrapper with icon
		<div>
			{/* {icon && <Icon icon={icon} />} */}
			<button
				{...props}
				style={{
					background: color,
				}}
				className={styles.button}
				onClick={(e) => (handler ? handler(e) : null)}
			>
				{label}
			</button>
		</div>
	)
}
