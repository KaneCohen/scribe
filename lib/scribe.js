define('scribe', ['module'], function(module) {
	var config = module.config();
	var logLevel = 0;
	var logName = null;

	function parseLogLevel(value) {
		var level = parseInt(value, 10);
		if (! isNaN(level)) {
			logLevel = level;
		} else {
			logLevel = level ? 3 : 0;
		}
		return logLevel;
	}

	function setLogConfig(scribe, config) {
		if (config.logLevel) {
			var logLevel = scribe.logLevel = parseLogLevel(config.logLevel);
			scribe.log = scribe.warn = scribe.error = function() {};
			if (logLevel > 0) {
				scribe.error = echoWithPrefix(scribe, 'Error');
			}
			if (logLevel > 1) {
				scribe.warn = echoWithPrefix(scribe, 'Warning');
			}
			if (logLevel > 2) {
				scribe.log = echo;
			}
		}
		if (config.logName) {
			scribe.logName = config.logName;
		}
	}

	function echoWithPrefix(scribe, prefix) {
		return function() {
			var args = Array.prototype.slice.call(arguments);
			args.unshift(prefix);
			echo.apply(scribe, args);
		};
	}

	function echo() {
		var err = false;
		var args = Array.prototype.slice.call(arguments);
		for (var i = 0; i < args.length; i++) {
			if (args[i] instanceof Error) {
				args[i] = '(' + args[i].name + ')' + args[i].message;
				err = true;
			}
		}
		if (this.logName) {
			args.unshift(this.logName + ':');
		}
		err ? console.error.apply(console, args) : console.log.apply(console, args);
	}

	var Scribe = {

		_logFunction: echo,

		setLogLevel: function(level) {
			setLogLevel(this, level);
		},

		setLogName: function(name) {
			setLogName(this, name);
		},

		setLogFunction: function(fn) {
			if (fn.constructor !== Function) {
				this.warn('No log function provided. Using regular logging.');
			} else {
				this._logFunction = fn;
			}
		}

	};

	setLogConfig(Scribe, config);

	return Scribe;
});
