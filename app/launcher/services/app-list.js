goog.provide('launcher.services.AppList');



/**
 * @param {zb.device.IStorage} storage
 * @extends {zb.events.EventPublisher}
 * @constructor
 */
launcher.services.AppList = function(storage) {
	goog.base(this);
	this._storage = storage;
	this._apps = null;
	this._loadApps();
};
goog.inherits(launcher.services.AppList, zb.events.EventPublisher);


/**
 * @param {string} oldUrl
 * @param {string} newUrl
 * @return {boolean}
 */
launcher.services.AppList.prototype.changeApp = function(oldUrl, newUrl) {
	this._logEvent('app-change');
	var index = this._findAppByUrl(oldUrl);
	if (-1 !== index) {
		this._apps[index].url = newUrl;

		// move to first position
		var app = this._apps[index];
		this._apps.splice(index, 1);
		this._fireEvent(this.EVENT_APP_REMOVED, index, newUrl);
		this._apps.splice(index, 0, app);
		this._fireEvent(this.EVENT_APP_ADDED, index, newUrl);

		this._fireEvent(this.EVENT_APP_CHANGED, newUrl, oldUrl);

		this._saveApps();
		return true;
	}
	return false;
};


/**
 * @param {string} url
 */
launcher.services.AppList.prototype.addApp = function(url) {
	this._logEvent('app-add');
	var index = this._findAppByUrl(url);
	if (-1 !== index) {
		this.removeApp(url);
	}

	/** @type {launcher.services.AppList.AppView} */
	var app = {
		url: url,
		launchTime: NaN,
		launchCount: 0
	};
	this._touchApp(app);
	this._apps.unshift(app);
	this._fireEvent(this.EVENT_APP_ADDED, 0, url);
	this._saveApps();
};


/**
 * @param {string} url
 */
launcher.services.AppList.prototype.removeApp = function(url) {
	this._logEvent('app-remove');
	var index = this._findAppByUrl(url);
	if (-1 !== index) {
		this._apps.splice(index, 1);
		this._fireEvent(this.EVENT_APP_REMOVED, index, url);
		this._saveApps();
	}
};


/**
 * @param {string} url
 * @return {IThenable}
 */
launcher.services.AppList.prototype.executeApp = function(url) {
	this._logEvent('app-execute');
	var app = this._apps[this._findAppByUrl(url)];

	if (app) {
		app.launchCount++;
		this._touchApp(app);
		this._saveApps();
	}

	return new Promise(function(resolve, reject) {
		// never resolve promise while new page is not loaded
		this._replaceUrl(url);
	}.bind(this));
};


/**
 * @param {number} index
 * @return {?launcher.services.AppList.AppView}
 */
launcher.services.AppList.prototype.getAppByIndex = function(index) {
	return this._apps[index] || null;
};


/**
 * @param {string} url
 * @return {?launcher.services.AppList.AppView}
 */
launcher.services.AppList.prototype.getAppByUrl = function(url) {
	return this._apps[this._findAppByUrl(url)] || null;
};


/**
 * @return {Array.<launcher.services.AppList.AppView>}
 */
launcher.services.AppList.prototype.getApps = function() {
	if (!this._apps) {
		this._loadApps();
	}
	return this._apps;
};


/**
 * @param {string} eventName
 * @private
 */
launcher.services.AppList.prototype._logEvent = function(eventName) {
	app.services.ga.sendEvent('app', eventName);
};


/**
 * @param {launcher.services.AppList.AppView} app
 */
launcher.services.AppList.prototype._touchApp = function(app) {
	app.launchTime = Date.now();
};


/**
 * @param {string} url
 * @return {number}
 * @private
 */
launcher.services.AppList.prototype._findAppByUrl = function(url) {
	for (var i = this._apps.length; i--;) {
		if (this._apps[i].url === url) {
			return i;
		}
	}
	return -1;
};


/**
 * @private
 */
launcher.services.AppList.prototype._loadApps = function() {
	var appsData = null;
	try {
		appsData = JSON.parse(this._storage.getItem(this.STORAGE_KEY) || '');
	} catch (e) {
		appsData = [];
	}

	if (appsData instanceof Array) {
		this._apps = appsData.map(function(appData) {
			// extract external data for internal usage
			return {
				url: appData['url'],
				launchTime: appData['launchTime'],
				launchCount: appData['launchCount']
			};
		});
	} else {
		this._apps = [];
	}
};


/**
 * @private
 */
launcher.services.AppList.prototype._saveApps = function() {
	this._apps.sort(this._compareTime);
	var apps = this.getApps()
		.map(function(appView) {
			// export local data for external storage
			return {
				'url': appView.url,
				'launchTime': appView.launchTime,
				'launchCount': appView.launchCount
			};
		});
	this._storage.setItem(this.STORAGE_KEY, JSON.stringify(apps));
	this._fireEvent(this.EVENT_APP_LIST_CHANGED, this.getApps());
};


/**
 * @param {launcher.services.AppList.AppView} appA
 * @param {launcher.services.AppList.AppView} appB
 * @return {number}
 * @private
 */
launcher.services.AppList.prototype._compareTime = function(appA, appB) {
	return appB.launchTime - appA.launchTime;
};


/**
 * @param {string} url
 * @private
 */
launcher.services.AppList.prototype._replaceUrl = function(url) {
	location.href = url;
};


/**
 * @type {zb.device.IStorage}
 * @private
 */
launcher.services.AppList.prototype._storage;


/**
 * @type {Array.<launcher.services.AppList.AppView>}
 * @private
 */
launcher.services.AppList.prototype._apps;


/**
 * @const {string}
 */
launcher.services.AppList.prototype.STORAGE_KEY = 'app-launcher-list';


/**
 * Fired with: {number} index, {string} url
 * @const {string}
 */
launcher.services.AppList.prototype.EVENT_APP_ADDED = 'app-added';


/**
 * Fired with: {number} index, {string} newUrl, {string} oldUrl
 * @const {string}
 */
launcher.services.AppList.prototype.EVENT_APP_CHANGED = 'app-changed';


/**
 * Fired with: {number} index, {string} url
 * @const {string}
 */
launcher.services.AppList.prototype.EVENT_APP_REMOVED = 'app-removed';


/**
 * Fired with: {Array.<launcher.services.AppList.AppView>}
 * @const {string}
 */
launcher.services.AppList.prototype.EVENT_APP_LIST_CHANGED = 'app-list-changed';


/**
 * @typedef {{
 *     url: string,
 *     launchTime: number,
 *     launchCount: number
 * }}
 */
launcher.services.AppList.AppView;
