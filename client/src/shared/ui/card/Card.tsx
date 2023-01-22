import styles from './styles.module.css'

type CardProps = {
	children?: React.ReactNode
	height?: number | string
	width?: number | string
	classNames?: string
}

export default function Card({ children, height, width, classNames = '' }: CardProps) {
	return (
		<div style={{ width: height, height: width }} className={styles.card_wrapper}>
			<div className={styles.card}>
				<div className={styles.content + ' ' + classNames}>{children}</div>
			</div>
		</div>
	)
}
