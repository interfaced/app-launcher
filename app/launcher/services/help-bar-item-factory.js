goog.provide('launcher.services.HelpBarItemFactory');
goog.require('zb.device.input');
goog.require('zb.ui.HelpBarItem');



/**
 * @constructor
 */
launcher.services.HelpBarItemFactory = function() {
};


/**
 * @param {Function=} opt_handler
 * @return {zb.ui.HelpBarItem}
 */
launcher.services.HelpBarItemFactory.prototype.createBack = function(opt_handler) {
	opt_handler = opt_handler || app.back.bind(app);
	return this._createHelpBarItem({
		label: 'back',
		keys: [zb.device.input.Keys.BACK],
		cssClass: '_back'
	}, opt_handler);
};


/**
 * @param {Function} handler
 * @return {zb.ui.HelpBarItem}
 */
launcher.services.HelpBarItemFactory.prototype.createOk = function(handler) {
	return this._createHelpBarItem({
		label: 'run selected',
		keys: [zb.device.input.Keys.ENTER],
		cssClass: '_ok'
	}, handler);
};


/**
 * @param {Function=} opt_handler
 * @return {zb.ui.HelpBarItem}
 */
launcher.services.HelpBarItemFactory.prototype.createRemoveApp = function(opt_handler) {
	return this._createHelpBarItem({
		label: 'remove selected',
		keys: [zb.device.input.Keys.RED],
		cssClass: '_red'
	}, opt_handler);
};


/**
 * @param {Function=} opt_handler
 * @return {zb.ui.HelpBarItem}
 */
launcher.services.HelpBarItemFactory.prototype.createAddApp = function(opt_handler) {
	return this._createHelpBarItem({
		label: 'add application',
		keys: [zb.device.input.Keys.GREEN],
		cssClass: '_green'
	}, opt_handler);
};


/**
 * @param {Function=} opt_handler
 * @return {zb.ui.HelpBarItem}
 */
launcher.services.HelpBarItemFactory.prototype.createAbout = function(opt_handler) {
	opt_handler = opt_handler || app.show.bind(app, 'about', {});
	return this._createHelpBarItem({
		label: 'about',
		keys: [zb.device.input.Keys.BLUE],
		cssClass: '_blue'
	}, opt_handler);
};


/**
 * @param {Function=} opt_handler
 * @return {zb.ui.HelpBarItem}
 */
launcher.services.HelpBarItemFactory.prototype.createPagination = function(opt_handler) {
	return this._createHelpBarItem({
		label: 'page up/page down',
		keys: [zb.device.input.Keys.PAGE_UP, zb.device.input.Keys.PAGE_DOWN],
		cssClass: '_pagination'
	}, opt_handler);
};


/**
 * @param {zb.ui.HelpBarItem.Options} item
 * @param {Function=} opt_handler
 * @return {zb.ui.HelpBarItem}
 * @private
 */
launcher.services.HelpBarItemFactory.prototype._createHelpBarItem = function(item, opt_handler) {
	var helpBarItem = new zb.ui.HelpBarItem(item);
	if (opt_handler) {
		helpBarItem.on(helpBarItem.EVENT_CLICK, opt_handler);
	}
	return helpBarItem;
};
