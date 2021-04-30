const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const prodConfig = {
	mode: 'production',
	optimization: {
		minimizer: ['...', new CssMinimizerPlugin()]
	}
}
module.exports = prodConfig
