goog.provide('launcher.scenes.AppAdd');
goog.require('launcher.scenes.AbstractBase');
goog.require('launcher.scenes.templates.appAdd.appAdd');
goog.require('zb.html');



/**
 * @constructor
 * @extends {launcher.scenes.AbstractBase}
 */
launcher.scenes.AppAdd = function() {
	this._url = null;

	goog.base(this);
	this._addContainerClass('s-app-add');
	this.setDefaultWidget(this._exported.input);

	this._exported.submit.on(this._exported.submit.EVENT_CLICK, function() {
		this._exported.input.fireFinish();
	}.bind(this));

	this._exported.input.on(this._exported.input.EVENT_FINISH, this._onInputFinish.bind(this));
	this._exported.input.setTheme(this._exported.input.THEME_NONE);

	this._exported.keyboard.setInput(this._exported.input);

	this.setNavigationRule(this._exported.keyboard, zb.std.plain.Direction.Value.RIGHT, null);
	this.setNavigationRule(this._exported.keyboard, zb.std.plain.Direction.Value.LEFT, null);
};
goog.inherits(launcher.scenes.AppAdd, launcher.scenes.AbstractBase);


/**
 * @param {launcher.scenes.AppAdd.Data} data
 * @inheritDoc
 */
launcher.scenes.AppAdd.prototype.beforeDOMShow = function(state, data) {
	goog.base(this, 'beforeDOMShow', state, data);

	if (state) {
		return;
	}

	var url = 'http://';
	var title = 'New application URL';
	var savedUrl = null;

	if (data.url !== undefined) {
		url = data.url;
		savedUrl = data.url;
		title = 'Edit application URL';
	}

	this._url = savedUrl;
	this._exported.input.setValue(url);
	zb.html.text(this._exported.title, title);
};


/**
 * @inheritDoc
 */
launcher.scenes.AppAdd.prototype.afterDOMShow = function(state, data) {
	goog.base(this, 'afterDOMShow', state, data);
	this._exported.input.showCaret(true);
};


/**
 * @inheritDoc
 */
launcher.scenes.AppAdd.prototype._createHelpBar = function() {
	goog.base(this, '_createHelpBar');

	var helpBar = this._helpBar;
	var factory = this._getHelpBarItemFactory();

	helpBar.setItems([
		factory.createBack(this._pressBack.bind(this)),
		factory.createAbout()
	]);
};


/**
 * @inheritDoc
 */
launcher.scenes.AppAdd.prototype._renderTemplate = function() {
	return launcher.scenes.templates.appAdd.appAdd(this._getTemplateData(), this._getTemplateOptions());
};


/**
 * @inheritDoc
 */
launcher.scenes.AppAdd.prototype._processKey = function(zbKey, e) {
	if (!this._exported.keyboard.processShortcutKey(zbKey)) {
		return goog.base(this, '_processKey', zbKey, e);
	}
	return true;
};


/**
 * @param {string} eventName
 * @param {string} url
 * @private
 */
launcher.scenes.AppAdd.prototype._onInputFinish = function(eventName, url) {
	if (url) {
		this._exported.input.setValue('', true);

		if (this._url !== null) {
			app.services.appList.changeApp(this._url, url);
		} else {
			app.services.appList.addApp(url);
		}

		if (app.canBack()) {
			app.back();
		} else {
			app.home();
		}
	}
};


/**
 * @private
 */
launcher.scenes.AppAdd.prototype._pressBack = function() {
	if (app.services.appList.getApps().length) {
		app.back();
	} else {
		app.exit();
	}
};


/**
* @type {launcher.scenes.templates.appAdd.AppAddOut}
* @protected
*/
launcher.scenes.AppAdd.prototype._exported;


/**
* @type {?string}
* @protected
*/
launcher.scenes.AppAdd.prototype._url;


/**
 * @typedef {{
 *      url: (string|undefined)
 * }}
 */
launcher.scenes.AppAdd.Input;


/**
 * @typedef {launcher.scenes.AppAdd.Input}
 */
launcher.scenes.AppAdd.Data;
