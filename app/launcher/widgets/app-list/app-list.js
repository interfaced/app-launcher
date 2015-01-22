goog.provide('launcher.widgets.AppList');
goog.require('launcher.widgets.AppListItem');
goog.require('zb.ui.ScrollList');



/**
 * @constructor
 * @extends {zb.ui.ScrollList}
 */
launcher.widgets.AppList = function() {
	goog.base(this, {
		itemClass: launcher.widgets.AppListItem,
		isVertical: true
	});

	this._container.classList.add('w-app-list');
};
goog.inherits(launcher.widgets.AppList, zb.ui.ScrollList);
