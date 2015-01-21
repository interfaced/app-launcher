goog.provide('launcher.scenes.AppAdd');
goog.require('launcher.scenes.AbstractBase');
goog.require('launcher.scenes.templates.appAdd.appAdd');



/**
 * @constructor
 * @extends {launcher.scenes.AbstractBase}
 */
launcher.scenes.AppAdd = function() {
	goog.base(this);
	this._addContainerClass('s-app-add');
	this.setDefaultWidget(this._exported.input);

	this._exported.submit.on(this._exported.submit.EVENT_CLICK, function() {
		this._exported.input.fireFinish();
	}.bind(this));

	this._exported.input.on(this._exported.input.EVENT_FINISH, this._onInputFinish.bind(this));

	this._exported.keyboard.setInput(this._exported.input);

	this.setNavigationRule(this._exported.keyboard, zb.Direction.RIGHT, null);
	this.setNavigationRule(this._exported.keyboard, zb.Direction.LEFT, null);
};
goog.inherits(launcher.scenes.AppAdd, launcher.scenes.AbstractBase);


/**
 * @inheritDoc
 */
launcher.scenes.AppAdd.prototype.beforeDOMShow = function(state, data) {
	goog.base(this, 'beforeDOMShow', state, data);
	this._exported.input.setValue('http://');
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
 * @param {string} eventName
 * @param {string} url
 * @private
 */
launcher.scenes.AppAdd.prototype._onInputFinish = function(eventName, url) {
	if (url) {
		this._exported.input.setValue('', true);
		app.services.appList.addApp(url);
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
