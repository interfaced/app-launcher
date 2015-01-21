goog.provide('launcher.popups.Confirm');
goog.require('launcher.popups.templates.confirm.confirm');
goog.require('zb.layers.CutePopup');



/**
 * @param {launcher.popups.Confirm.Input} params
 * @constructor
 * @extends {zb.layers.CutePopup}
 */
launcher.popups.Confirm = function(params) {
	this._url = params.url;
	goog.base(this);
	this._addContainerClass('p-confirm');

	this._exported.cancelBtn.on(this._exported.cancelBtn.EVENT_CLICK,
		this.close.bind(this, launcher.popups.Confirm.Status.CANCELLED));
	this._exported.OKBtn.on(this._exported.OKBtn.EVENT_CLICK,
		this.close.bind(this, launcher.popups.Confirm.Status.SUCCEEDED));
};
goog.inherits(launcher.popups.Confirm, zb.layers.CutePopup);


/**
 * @inheritDoc
 */
launcher.popups.Confirm.prototype._processKey = function(zbKey, e) {
	if (zbKey == zb.device.input.Keys.BACK) {
		this.close(launcher.popups.Confirm.Status.CANCELLED);
		return true;
	} else if (zbKey == zb.device.input.Keys.RED) {
		this.close(launcher.popups.Confirm.Status.SUCCEEDED);
		return true;
	}
	return goog.base(this, '_processKey', zbKey, e);
};


/**
 * @inheritDoc
 */
launcher.popups.Confirm.prototype._renderTemplate = function() {
	return launcher.popups.templates.confirm.confirm(this._getTemplateData(), this._getTemplateOptions());
};


/**
 * @inheritDoc
 * @return {launcher.popups.Confirm.Input}
 */
launcher.popups.Confirm.prototype._getTemplateData = function() {
	return {
		url: this._url
	};
};


/**
* @type {launcher.popups.templates.confirm.ConfirmOut}
* @protected
*/
launcher.popups.Confirm.prototype._exported;


/**
 * @type {string}
 * @private
 */
launcher.popups.Confirm.prototype._url;


/**
 * @enum {string}
 */
launcher.popups.Confirm.Status = {
	SUCCEEDED: 'succeeded',
	CANCELLED: 'cancelled'
};


/**
 * @param {launcher.popups.Confirm.Input} params
 * @param {zb.layers.Layer=} opt_layer
 * @return {IThenable}
 */
launcher.popups.Confirm.asPromise = function(params, opt_layer) {
	var popup = new launcher.popups.Confirm(params);
	if (opt_layer) {
		opt_layer.showChildLayerInstance(popup);
	} else {
		app.showChildLayerInstance(popup);
	}

	return new Promise(function(resolve, reject) {
		popup.on(popup.EVENT_CLOSE, function(eventName, status) {
			if (status === launcher.popups.Confirm.Status.SUCCEEDED) {
				resolve(status);
			} else {
				reject(status);
			}
		});
	});
};


/**
 * @typedef {{
 *     url: string
 * }}
 */
launcher.popups.Confirm.Input;
