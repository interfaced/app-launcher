goog.provide('launcher.scenes.About');
goog.require('launcher.scenes.AbstractBase');
goog.require('launcher.scenes.templates.about.about');



/**
 * @constructor
 * @extends {launcher.scenes.AbstractBase}
 */
launcher.scenes.About = function() {
	goog.base(this);
	this._addContainerClass('s-about');
};
goog.inherits(launcher.scenes.About, launcher.scenes.AbstractBase);


/**
 * @inheritDoc
 */
launcher.scenes.About.prototype._createHelpBar = function() {
	goog.base(this, '_createHelpBar');

	var helpBar = this._helpBar;
	var factory = this._getHelpBarItemFactory();

	helpBar.setItems([
		factory.createBack()
	]);
};


/**
 * @inheritDoc
 */
launcher.scenes.About.prototype._renderTemplate = function() {
	return launcher.scenes.templates.about.about(this._getTemplateData(), this._getTemplateOptions());
};


/**
* @type {launcher.scenes.templates.about.AboutOut}
* @protected
*/
launcher.scenes.About.prototype._exported;
