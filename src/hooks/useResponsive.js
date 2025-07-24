import { useState, useEffect, useMemo } from 'react'
export const useResponsive = (status) => {
	const defaultWidth = useMemo(() => {
		switch (status) {
			case 'xl':
				return 1440
			case 'lg':
				return 992
			case 'md':
				return 768
			case 'sm':
				return 375
			default:
				return 540
		}
	}, [status])

	const [isMobile, setIsMobile] = useState(false)
	useEffect(() => {
		if (window) {
			setIsMobile(window.innerWidth < defaultWidth)
			window.addEventListener('resize', () => {
				setIsMobile(window.innerWidth < defaultWidth)
			})
		}
	}, [defaultWidth])
	return isMobile
}
