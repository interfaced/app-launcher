goog.provide('launcher.Application');
goog.require('launcher.BaseApplication');
goog.require('launcher.services.AppList');
goog.require('launcher.services.HelpBarItemFactory');
goog.require('zb.ui.GoogleAnalytics');



/**
 * @constructor
 * @extends {launcher.BaseApplication}
 */
launcher.Application = function() {
	zb.console.setLevel(zb.console.Level.LOG | zb.console.Level.ERROR);
	this.services = {
		ga: null,
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
	var gaId = '';
	if (COMPILED) {
		gaId = launcher.appConfig.googleAnalyticsId;

		this._layerManager.on(this._layerManager.EVENT_TRANSITION_SUCCESS, function(eventName, transitionData) {
			transitionData = /** @type {zb.LayerManager.TransitionData} */(transitionData);
			var layer = transitionData.layer;
			var pageName = '/' + /s-([a-z0-9\-]+)$/i.exec(layer.getCSSClassName())[1];
			this.services.ga.sendPageview(pageName);
		}.bind(this));
	}

	this.services.ga = new zb.ui.GoogleAnalytics(gaId, this.device, {
		analyticsJS: 'analytics.js'
	});
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
		this.services.ga.sendEvent('app', 'start');
		this.home();
	} else {
		this.services.ga.sendEvent('app', 'first-start');
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
 * Rewrites original method to restricts current resolution to HD
 * @inheritDoc
 */
launcher.Application.prototype._appendScreenSizeClass = function() {
	var currentResolution = zb.device.ResolutionInfo[this.device.info.osdResolutionType()];
	var maxSupportedResolution = zb.device.ResolutionInfo[zb.device.Resolution.HD];

	if (!currentResolution || currentResolution.width > maxSupportedResolution.width) {
		currentResolution = maxSupportedResolution;
	}

	this._body.classList.add('zb-' + currentResolution.name);
	this._appendViewportSize(currentResolution);
};


/**
 * @type {{
 *      ga: zb.ui.GoogleAnalytics,
 *      appList: launcher.services.AppList,
 *      helpBarItemFactory: launcher.services.HelpBarItemFactory
 * }}
 */
launcher.Application.prototype.services;
