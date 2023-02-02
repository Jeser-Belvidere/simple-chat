import styles from './styles.module.css'

type CardProps = {
	children?: React.ReactNode
	style?: React.CSSProperties
	classNames?: string
}

export default function CardActions({ children, style, classNames }: CardProps) {
	return (
		<div style={style} className={styles.actions + ' ' + classNames}>
			{children}
		</div>
	)
}
