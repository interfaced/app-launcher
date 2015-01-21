goog.provide('launcher.widgets.Notice');
goog.require('launcher.appConfig');
goog.require('zb.Timeout');
goog.require('zb.widgets.InlineWidget');



/**
 * @param {HTMLElement} container
 * @extends {zb.widgets.InlineWidget}
 * @constructor
 */
launcher.widgets.Notice = function(container) {
	goog.base(this, container);
	this._container.classList.add('s-abstract-base-head__notice');

	this._timeout = new zb.Timeout(function() {
		zb.html.hide(this._container);
	}.bind(this), launcher.appConfig.noticeTime);

	this.hide();
};
goog.inherits(launcher.widgets.Notice, zb.widgets.InlineWidget);


/**
 * @inheritDoc
 */
launcher.widgets.Notice.prototype.isFocusable = function() {
	return false;
};


/**
 */
launcher.widgets.Notice.prototype.showAdded = function() {
	this.open(true);
	zb.html.text(this._container, 'URL added');
};


/**
 */
launcher.widgets.Notice.prototype.showRemoved = function() {
	this.open(false);
	zb.html.text(this._container, 'URL removed');
};


/**
 * @param {boolean} isAdded
 */
launcher.widgets.Notice.prototype.open = function(isAdded) {
	zb.html.updateClassName(this._container, launcher.widgets.Notice.State.ADDED, isAdded);
	zb.html.updateClassName(this._container, launcher.widgets.Notice.State.REMOVED, !isAdded);
	zb.html.show(this._container);
	this._timeout.restart();
};


/**
 * @type {HTMLDivElement}
 * @private
 */
launcher.widgets.Notice.prototype._container;


/**
 * @type {zb.Timeout}
 * @private
 */
launcher.widgets.Notice.prototype._timeout;


/**
* @enum {string}
*/
launcher.widgets.Notice.State = {
	ADDED: '_add',
	REMOVED: '_remove'
};
