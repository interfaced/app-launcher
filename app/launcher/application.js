goog.provide('launcher.Application');
goog.require('launcher.BaseApplication');
goog.require('launcher.services.AppList');
goog.require('launcher.services.HelpBarItemFactory');



/**
 * @constructor
 * @extends {launcher.BaseApplication}
 */
launcher.Application = function() {
	zb.console.setLevel(zb.console.Level.LOG | zb.console.Level.ERROR);
	this.services = {
		appList: null,
		helpBarItemFactory: null
	};

	goog.base(this);
};
goog.inherits(launcher.Application, launcher.BaseApplication);


/**
 * @return {boolean}
 */
launcher.Application.prototype.canBack = function() {
	return this._historyManager.canBack();
};


/**
 * @inheritDoc
 */
launcher.Application.prototype.onReady = function() {
	this.services.appList = new launcher.services.AppList(this.device.storage);
	this.services.helpBarItemFactory = new launcher.services.HelpBarItemFactory;
	this.setHomeScene('app-list');
};


/**
 * @inheritDoc
 */
launcher.Application.prototype.onStart = function() {
	var apps = this.services.appList.getApps();
	if (apps.length) {
		this.home();
	} else {
		this.show('app-add', {});
	}
};


/**
 * @inheritDoc
 */
launcher.Application.prototype._backOnEmptyHistory = function() {
	this.isDeviceWebos() ? this.device.showAppsManager() : this.device.exit();
};


/**
 * @inheritDoc
 */
launcher.Application.prototype._appendScreenSizeClass = function() {
	this._body.classList.add('zb-hd');
};


/**
 * @type {{
 *      appList: launcher.services.AppList,
 *      helpBarItemFactory: launcher.services.HelpBarItemFactory
 * }}
 */
launcher.Application.prototype.services;
