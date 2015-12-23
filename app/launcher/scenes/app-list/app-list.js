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
	this._exported.appList.setSource(this._appList, {
		padding: this.COUNT_APPS_ON_PAGE
	});
	this._exported.appList.on(this._exported.appList.EVENT_CLICK, this._onAppClick.bind(this));

	app.services.appList.on(app.services.appList.EVENT_APP_REMOVED, this._onAppRemoved.bind(this));
	app.services.appList.on(app.services.appList.EVENT_APP_ADDED, this._onAppAdded.bind(this));
	app.services.appList.on(app.services.appList.EVENT_APP_CHANGED, this._onAppChanged.bind(this));

	this._appList.setItems(app.services.appList.getApps());

	// Prevent save/load state for app list.
	delete this._namedWidgets['appList'];

	this._configureThrobber();
	this._updateHelpBar();
};
goog.inherits(launcher.scenes.AppList, launcher.scenes.AbstractBase);


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
		factory.createOk(this._executeCurrentApp.bind(this)),
		factory.createBack(),
		factory.createRemoveApp(this._removeApp.bind(this)),
		factory.createEditApp(this._editApp.bind(this)),
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
	this._executeApp(appView.url);
};


/**
 * @private
 */
launcher.scenes.AppList.prototype._executeCurrentApp = function() {
	this._executeApp(this._getCurrentAppUrl());
};


/**
 * @param {string} url
 * @private
 */
launcher.scenes.AppList.prototype._executeApp = function(url) {
	var promise = app.services.appList.executeApp(url);
	this._exported.throbber.wait(promise);
};


/**
 * @private
 */
launcher.scenes.AppList.prototype._removeApp = function() {
	var url = this._getCurrentAppUrl();
	if (!url) {
		return;
	}

	launcher.popups.Confirm
		.asPromise({
			url: url
		})
		.then(function() {
			app.services.appList.removeApp(url);
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
 * @private
 */
launcher.scenes.AppList.prototype._editApp = function() {
	var url = this._getCurrentAppUrl();
	if (!url) {
		return;
	}

	app.show('app-add', {url: url});
};


/**
 * @return {string}
 * @protected
 */
launcher.scenes.AppList.prototype._getCurrentAppUrl = function() {
	var currentApp = this._appList.current();
	if (!currentApp) {
		return '';
	}

	return currentApp.url;
};


/**
 * @param {string} eventName
 * @param {number} index
 * @param {string} url
 * @private
 */
launcher.scenes.AppList.prototype._onAppRemoved = function(eventName, index, url) {
	this._notice.showRemoved();
	this._appList.removeAt(index);
	this._updateHelpBar();
};


/**
 * @param {string} eventName
 * @param {number} index
 * @param {string} url
 * @private
 */
launcher.scenes.AppList.prototype._onAppAdded = function(eventName, index, url) {
	var appItem = /** @type {!launcher.services.AppList.AppView} */(app.services.appList.getAppByIndex(index));
	this._notice.showAdded();
	this._appList.addAt(appItem, index);
	this._appList.selectAt(index);
	this._updateHelpBar();
};


/**
 * @param {string} eventName
 * @param {number} index
 * @param {string} newUrl
 * @param {string} oldUrl
 * @private
 */
launcher.scenes.AppList.prototype._onAppChanged = function(eventName, index, newUrl, oldUrl) {
	this._notice.showChanged();
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
 * @protected
 */
launcher.scenes.AppList.prototype._configureThrobber = function() {
	var throbber = this._exported.throbber;
	throbber.on(throbber.EVENT_START, function() {
		this._exported.throbberContainer.style.display = 'block';
	}.bind(this));
	throbber.on(throbber.EVENT_STOP, function() {
		this._exported.throbberContainer.style.display = 'none';
	}.bind(this));
	this._container.appendChild(this._exported.throbberContainer);
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
launcher.scenes.AppList.prototype.COUNT_APPS_ON_PAGE = 9;
