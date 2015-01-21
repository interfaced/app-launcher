goog.provide('launcher.widgets.Keyboard');
goog.require('launcher.widgets.templates.keyboard.keyboard');
goog.require('zb.ui.Keyboard');



/**
 * @extends {zb.ui.Keyboard}
 * @constructor
 */
launcher.widgets.Keyboard = function() {
	goog.base(this);

	this._addLayout(this._exported.layoutAbc, this._exported.itemsAbc);
	this._addLayout(this._exported.layoutNum, this._exported.itemsNum);

	this._setLayout(this._exported.layoutAbc);
};
goog.inherits(launcher.widgets.Keyboard, zb.ui.Keyboard);


/**
 * @inheritDoc
 */
launcher.widgets.Keyboard.prototype._renderTemplate = function() {
	return launcher.widgets.templates.keyboard.keyboard(this._getTemplateData(), this._getTemplateOptions());
};


/**
 * @inheritDoc
 */
launcher.widgets.Keyboard.prototype._handleClick = function(action) {
	var isHandled = true;
	switch (action) {
		case launcher.widgets.Keyboard.Actions.CAPS:
			this.setCaps(!this._isCaps);
			break;
		case launcher.widgets.Keyboard.Actions.BACKSPACE:
			if (this._input) {
				this._input.backspace();
			}
			break;
		case launcher.widgets.Keyboard.Actions.TYPE_ABC:
			this.setType(launcher.widgets.Keyboard.Types.ABC);
			break;
		case launcher.widgets.Keyboard.Actions.TYPE_NUM:
			this.setType(launcher.widgets.Keyboard.Types.NUM);
			break;
		default:
			zb.console.debug('_execAction fail', action);
			isHandled = false;
	}
	return isHandled;
};


/**
 * @enum {zb.ui.Keyboard.Type}
 */
launcher.widgets.Keyboard.Types = {
	ABC: 'abc',
	NUM: 'num'
};


/**
 * @enum {zb.ui.Keyboard.Action}
 */
launcher.widgets.Keyboard.Actions = {
	CAPS: 'caps',
	BACKSPACE: 'backspace',
	TYPE_ABC: 'type-abc',
	TYPE_NUM: 'type-num'
};
