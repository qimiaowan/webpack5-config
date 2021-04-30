const fs = require('fs')
const path = require('path')

module.exports = file => {
	const fileName = path.join(__dirname, '../', file)
	const data = fs.readFileSync(fileName, { encoding: 'utf8' })
	const d = data.replace(/\r/g, ',').replace(/\n/g, '')
	const arr = d.split(',').map(item => {
		return item.split('=')
	})
	const obj = {}
	arr.forEach(item => {
		obj[item[0]] = item[1]
	})
	return obj
}
