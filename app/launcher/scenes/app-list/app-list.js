goog.provide('launcher.scenes.AppList');
goog.require('launcher.popups.Confirm');
goog.require('launcher.scenes.AbstractBase');
goog.require('launcher.scenes.templates.appList.appList');
goog.require('zb.stub');
goog.require('zb.ui.HelpBar');



/**
 * @constructor
 * @extends {launcher.scenes.AbstractBase}
 */
launcher.scenes.AppList = function() {
	goog.base(this);
	this._addContainerClass('s-app-list');

	this._appList = new zb.ui.DataList;
	this._exported.appList.setDataList(this._appList, {
		padding: this.COUNT_APPS_ON_PAGE - 1
	});
	this._exported.appList.on(this._exported.appList.EVENT_CLICK, this._onAppClick.bind(this));

	app.services.appList.on(app.services.appList.EVENT_APP_LIST_CHANGED, this._setApps.bind(this));
	app.services.appList.on(app.services.appList.EVENT_APP_REMOVED, this._notice.showRemoved.bind(this._notice));
	app.services.appList.on(app.services.appList.EVENT_APP_ADDED, this._notice.showAdded.bind(this._notice));
};
goog.inherits(launcher.scenes.AppList, launcher.scenes.AbstractBase);


/**
 * @inheritDoc
 */
launcher.scenes.AppList.prototype.afterDOMShow = function(state, data) {
	goog.base(this, 'afterDOMShow', state, data);

	this._appList.setItems(app.services.appList.getApps());
};


/**
 * @inheritDoc
 */
launcher.scenes.AppList.prototype._renderTemplate = function() {
	return launcher.scenes.templates.appList.appList(this._getTemplateData(), this._getTemplateOptions());
};


/**
 * @inheritDoc
 */
launcher.scenes.AppList.prototype._createHelpBar = function() {
	goog.base(this, '_createHelpBar');

	var helpBar = this._helpBar;
	var factory = this._getHelpBarItemFactory();

	this._paginationHelpBarItem = factory.createPagination(this._pagination.bind(this));
	this._paginationHelpBarItem.hide();

	helpBar.setItems([
		factory.createOk(this._executeApp.bind(this)),
		factory.createBack(),
		factory.createRemoveApp(this._removeApp.bind(this)),
		factory.createAddApp(this._addApp.bind(this)),
		factory.createAbout(),
		this._paginationHelpBarItem
	]);
};


/**
 * @inheritDoc
 */
launcher.scenes.AppList.prototype._updateHelpBar = function() {
	if (this._paginationHelpBarItem) {
		this._showHidePaginationHelpBarItem(this._appList.size() > this.COUNT_APPS_ON_PAGE);
	}
};


/**
 * @param {string} eventName
 * @param {launcher.services.AppList.AppView} appView
 * @private
 */
launcher.scenes.AppList.prototype._onAppClick = function(eventName, appView) {
	app.services.appList.executeApp(appView.url);
};


/**
 * @private
 */
launcher.scenes.AppList.prototype._executeApp = function() {
	var application = this._exported.appList.getCurrentData();
	app.services.appList.executeApp(application.url);
};


/**
 * @private
 */
launcher.scenes.AppList.prototype._removeApp = function() {
	var currentApp = this._appList.current();
	if (!currentApp) {
		return;
	}

	launcher.popups.Confirm
		.asPromise({
			url: currentApp.url
		})
		.then(function() {
			app.services.appList.removeApp(currentApp.url);
			var appList = app.services.appList.getApps();
			if (!appList.length) {
				app.show('app-add', {});
			}
		});
};


/**
 * @private
 */
launcher.scenes.AppList.prototype._addApp = function() {
	app.show('app-add', {});
};


/**
 * @param {string} eventName
 * @param {Array.<launcher.services.AppList.AppView>} apps
 * @private
 */
launcher.scenes.AppList.prototype._setApps = function(eventName, apps) {
	this._appList.setItems(apps);
	this._updateHelpBar();
};


/**
 * @param {string} eventName
 * @param {zb.device.input.Keys} zbKey
 * @private
 */
launcher.scenes.AppList.prototype._pagination = function(eventName, zbKey) {
	var step = this.COUNT_APPS_ON_PAGE;
	if (zbKey === zb.device.input.Keys.PAGE_UP) {
		step = -step;
	}
	var index = this._appList.currentIndex() + step;
	if (!this._appList.isValidIndex(index)) {
		if (step < 0) {
			index = 0;
		} else {
			index = this._appList.size() - 1;
		}
	}
	this._appList.selectAt(index);
};


/**
 * @param {boolean} show
 * @private
 */
launcher.scenes.AppList.prototype._showHidePaginationHelpBarItem = function(show) {
	if (show) {
		this._paginationHelpBarItem.show();
	} else {
		this._paginationHelpBarItem.hide();
	}
};


/**
* @type {launcher.scenes.templates.appList.AppListOut}
* @protected
*/
launcher.scenes.AppList.prototype._exported;


/**
 * @type {zb.ui.DataList.<launcher.services.AppList.AppView>}
 * @private
 */
launcher.scenes.AppList.prototype._appList;


/**
 * @type {zb.ui.IHelpBarItem}
 * @private
 */
launcher.scenes.AppList.prototype._paginationHelpBarItem;


/**
 * @const {number}
 */
launcher.scenes.AppList.prototype.COUNT_APPS_ON_PAGE = 10;
