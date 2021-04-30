// -- 登记办理接件量
import config from '../config/config.js'
import { HTTP } from '../service/http.js'
import render from './index.js'

const { main, tableData } = render
const ajax = new HTTP(config)

ajax.get('/api/webapp/Statistics/djbljjl', 'JSON', res => {
	const config = {
		x: 'receiveCount',
		y: 'districtName'
	}

	if (res.status === '200') {
		main(config, res.body)
	}
})

ajax.get('/api/webapp/Statistics/fczmcxl', 'JSON', res => {
	const config = {
		name: 'name',
		value: 'value'
	}
	if (res.status === '200') {
		tableData(config, res.body)
	}
})
