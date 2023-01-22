import styles from './styles.module.css'

type CardProps = {
	children?: React.ReactNode
	style?: React.CSSProperties
}

export default function CardActions({ children, style }: CardProps) {
	return (
		<div style={style} className={styles.actions}>
			{children}
		</div>
	)
}
