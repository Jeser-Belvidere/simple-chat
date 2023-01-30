import styles from './styles.module.css'

type TitleProps = {
	children: string
	tag: 'h1' | 'h2' | 'h3' | 'p'
	classNames?: string
	style?: React.CSSProperties
	size?: number
}

export default function Title({
	children,
	tag,
	classNames = '',
	style = { fontSize: 16 },
	size = 16,
}: TitleProps) {
	const renderTitle = (tag: string) => {
		switch (tag) {
			case 'h1':
				return <h1>{children}</h1>
			case 'h2':
				return <h2>{children}</h2>
			case 'h3':
				return <h3>{children}</h3>
			case 'p':
				return <p>{children}</p>
			default:
				return <span>{children}</span>
		}
	}

	return (
		<div style={{ ...style, fontSize: size }} className={styles.title + ' ' + classNames}>
			{renderTitle(tag)}
		</div>
	)
}
