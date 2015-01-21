goog.provide('launcher.widgets.AppListItem');
goog.require('launcher.widgets.templates.appList.appListItem');
goog.require('zb.html');
goog.require('zb.ui.BaseListItem');



/**
 * @param {zb.ui.IBaseListItem.Input} params
 * @constructor
 * @extends {zb.ui.BaseListItem}
 */
launcher.widgets.AppListItem = function(params) {
	goog.base(this, params);
};
goog.inherits(launcher.widgets.AppListItem, zb.ui.BaseListItem);


/**
 * @inheritDoc
 */
launcher.widgets.AppListItem.prototype._createContainer = function() {
	var result = launcher.widgets.templates.appList.appListItem({
		app: /** @type {launcher.services.AppList.AppView} */(this._data)
	});

	this._container = zb.html.findFirstElementNode(result.root);
};
