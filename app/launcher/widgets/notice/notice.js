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
	this.open(launcher.widgets.Notice.State.ADDED);
	zb.html.text(this._container, 'URL added');
};


/**
 */
launcher.widgets.Notice.prototype.showChanged = function() {
	this.open(launcher.widgets.Notice.State.CHANGED);
	zb.html.text(this._container, 'URL edited');
};


/**
 */
launcher.widgets.Notice.prototype.showRemoved = function() {
	this.open(launcher.widgets.Notice.State.REMOVED);
	zb.html.text(this._container, 'URL removed');
};


/**
 * @param {launcher.widgets.Notice.State} state
 */
launcher.widgets.Notice.prototype.open = function(state) {
	var allClasses = Object.keys(launcher.widgets.Notice.State)
		.map(function(key) {
			return launcher.widgets.Notice.State[key];
		});

	allClasses.forEach(function(cssClass) {
		zb.html.updateClassName(this._container, cssClass, cssClass === state);
	}, this);

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
	REMOVED: '_remove',
	CHANGED: '_change'
};
