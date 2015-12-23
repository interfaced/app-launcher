goog.provide('launcher.scenes.AbstractBase');
goog.require('launcher.scenes.templates.abstractBase.abstractBase');
goog.require('zb.html');
goog.require('zb.layers.CuteScene');



/**
 * @param {launcher.scenes.templates.abstractBase.AbstractBaseIn=} opt_params
 * @extends {zb.layers.CuteScene}
 * @constructor
 */
launcher.scenes.AbstractBase = function(opt_params) {
	goog.base(this);
	this._addContainerClass('s-abstract-base');

	var result = launcher.scenes.templates.abstractBase.abstractBase(opt_params);
	var nodes = Array.prototype.slice.call(this._container.childNodes, 0);

	zb.html.empty(this._container);
	this._container.appendChild(result.root);
	nodes.forEach(function(node) {
		result.content.appendChild(node);
	});

	this._createHelpBar();
	this._notice = result.notice;
};
goog.inherits(launcher.scenes.AbstractBase, zb.layers.CuteScene);


/**
 * @inheritDoc
 */
launcher.scenes.AbstractBase.prototype.processKey = function(zbKey, e) {
	if (goog.base(this, 'processKey', zbKey, e)) {
		return true;
	}
	return this._helpBar.processHelpBarKey(zbKey, e);
};


/**
 * @protected
 */
launcher.scenes.AbstractBase.prototype._createHelpBar = function() {
	this._helpBar = new zb.ui.HelpBar;
	this._helpBar.setOrder([
		zb.device.input.Keys.ENTER,
		zb.device.input.Keys.PAGE_UP,
		zb.device.input.Keys.PAGE_DOWN,
		zb.device.input.Keys.RED,
		zb.device.input.Keys.GREEN,
		zb.device.input.Keys.YELLOW,
		zb.device.input.Keys.BLUE,
		zb.device.input.Keys.BACK
	]);
	this._container.appendChild(this._helpBar.getContainer());
	this.appendWidget(this._helpBar);
};


/**
 * @protected
 */
launcher.scenes.AbstractBase.prototype._updateHelpBar = function() {
};


/**
 * @return {launcher.services.HelpBarItemFactory}
 * @protected
 */
launcher.scenes.AbstractBase.prototype._getHelpBarItemFactory = function() {
	return app.services.helpBarItemFactory;
};


/**
 * @type {zb.ui.HelpBar}
 * @protected
 */
launcher.scenes.AbstractBase.prototype._helpBar;


/**
 * @type {launcher.widgets.Notice}
 * @protected
 */
launcher.scenes.AbstractBase.prototype._notice;
