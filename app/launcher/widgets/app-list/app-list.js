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


/**
 * @inheritDoc
 */
launcher.widgets.AppList.prototype.loadState = function(state) {
	goog.base(this, 'loadState', state);
	//этот метод следует удалить, после исправления dynamicList
	this._fixCurrentIndex();
};


/**
 * @private
 */
launcher.widgets.AppList.prototype._fixCurrentIndex = function() {
	//исправляет значение _currentIndex после удаления всех элементов из dataList, а затем добавлении новых
	var index = this._data.currentIndex();
	var size = this._data.size();
	if (isNaN(index) && size) {
		this._data.selectAt(0);
	}
};
