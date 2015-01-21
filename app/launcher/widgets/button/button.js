goog.provide('launcher.widgets.Button');
goog.require('zb.ui.Button');



/**
 * @inheritDoc
 * @extends {zb.ui.Button}
 * @constructor
 */
launcher.widgets.Button = function(opt_container, opt_data) {
	goog.base(this, opt_container, opt_data);

	this._container.classList.add('w-button');
};
goog.inherits(launcher.widgets.Button, zb.ui.Button);
