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
 * @param {string} url
 */
launcher.services.AppList.prototype.addApp = function(url) {
	var index = this._findAppByUrl(url);
	if (-1 !== index) {
		// prevent url duplication
		return;
	}

	/** @type {launcher.services.AppList.AppView} */
	var app = {
		url: url,
		launchTime: Date.now(),
		launchCount: 0
	};
	this._apps.unshift(app);
	this._saveApps();
	this._fireEvent(this.EVENT_APP_ADDED, url);
};


/**
 * @param {string} url
 */
launcher.services.AppList.prototype.removeApp = function(url) {
	var index = this._findAppByUrl(url);
	if (-1 !== index) {
		this._apps.splice(index, 1);
		this._saveApps();
		this._fireEvent(this.EVENT_APP_REMOVED, url);
	}
};


/**
 * @param {string} url
 */
launcher.services.AppList.prototype.executeApp = function(url) {
	var app = this._apps[this._findAppByUrl(url)];

	if (app) {
		app.launchCount++;
		app.launchTime = Date.now();
		this._saveApps();
	}

	this._replaceUrl(url);
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
 * Fired with: {string} url
 * @const {string}
 */
launcher.services.AppList.prototype.EVENT_APP_ADDED = 'app-added';


/**
 * Fired with: {string} url
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
