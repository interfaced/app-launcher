var path = require('path');
var join = path.join;


/**
 * @param {Object} config
 * @return {Object}
 */
module.exports = function(config) {
	return {
		appNamespace: 'launcher',
		samsung: {
			widgetServer: {
				ip: '127.0.0.1'
			},
			widgetConfig: {
				widget: {
					ThumbIcon: join(__dirname, 'custom-platforms', 'samsung', 'icons', '106x87.png'),
					BigThumbIcon: join(__dirname, 'custom-platforms', 'samsung', 'icons', '115x95.png'),
					BigListIcon: join(__dirname, 'custom-platforms', 'samsung', 'icons', '95x78.png'),
					ListIcon: join(__dirname, 'custom-platforms', 'samsung', 'icons', '85x70.png')
				}
			}
		},
		dune: {
			template: join(__dirname, 'custom-platforms', 'dune', 'template')
		},
		eltex: {
			template: join(__dirname, 'custom-platforms', 'eltex', 'template')
		}
	};
};
