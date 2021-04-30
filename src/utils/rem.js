const setHtmlFontSize = () => {
	// 1920是设计稿的宽度，当大于1920时采用1920宽度
	const deviceWidth = document.documentElement.clientWidth
	let fontSize = 10
	if (deviceWidth > 375) {
		fontSize = deviceWidth / (375 / 10)
	}

	document.getElementsByTagName('html')[0].style.cssText = 'font-size:' + fontSize + 'px !important'
}
if (window.addEventListener) {
	window.addEventListener(
		'resize',
		() => {
			setHtmlFontSize()
		},
		false
	)
}
setHtmlFontSize()
