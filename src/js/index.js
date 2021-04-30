import F2 from '@antv/f2'

const main = (config, data) => {
	const pos = (config && config.y + '*' + config.x) || ''
	let num = 0
	data = data.map(item => {
		item[config.x] = Number(item[config.x]) || 0
		num += Number(item.receiveCount) || 0
		return item
	})

	const chart = new F2.Chart({
		id: 'chart-high',
		pixelRatio: window.devicePixelRatio,
		appendPadding: 0,
		padding: [0, '20', 'auto', 'auto']
	})
	chart.axis(config.y, {
		line: {
			lineWidth: 1,
			top: true,
			stroke: '#E0E6ED'
		},
		labelOffset: 15,
		grid: null
	})

	chart.source(data, {
		sales: {
			tickCount: 6
		}
	})
	chart.coord('rect', {
		transposed: true
	})

	chart.tooltip({
		showTooltipMarker: true,
		tooltipMarkerStyle: {
			fill: '#f5f5f5',
			radius: 5,
			padding: [0, 0, 0, 0]
		},
		background: {
			radius: 5,
			fill: 'rgba(0,0,0,.5)',
			padding: [6, 10]
		},
		xTipBackground: {
			stroke: '#fff',
			lineWidth: 1,
			radius: 3
		},
		onShow(obj) {
			obj.tooltip.offsetY = obj.y + 20
			obj.tooltip.offsetX = 0
			const items = obj.items
			items[0].marker = null
			items[0].name = null
			items[0].name = items[0].title
			items[0].value = items[0].value
		}
	})
	chart
		.interval()
		.position(pos)
		.color('l(0) 0:#2697FF 1:#85C5FF')
		.style(config.y, { radius: 5 })
		.size(10)

	chart.render()

	// 总数
	document.querySelector('#all_num').innerHTML = num
}
function tableData(config, data) {
	const wrap = document.querySelector('#d-wrap')
	const tab = document.querySelector('#table-item').innerHTML
	let fram = ''
	data.forEach(item => {
		fram += tab.replace(/{{(.*?)}}/g, (p, v) => {
			return item[config[v]]
		})
	})
	console.log(document.querySelector('#d-wrap'))
	wrap.innerHTML = fram
}

export default {
	main,
	tableData
}
