'use strict';

const bodyParser = require('body-parser'),
	compression = require('compression'),
	cors = require('cors'),
	express = require('express'),
	validator = require('express-validator'),
	helmet = require('helmet'),
	http = require('http'),
	path = require('path'),
	status = require('http-status-codes'),

	app = express(),
	server = http.Server(app);


app.set('trust proxy', 1);

app.use(bodyParser.json());
app.use(validator()); // validator must be right after bodyParser
app.use(compression());
app.use(cors({
	origin: '*'
}));
app.use(helmet({
	contentSecurityPolicy: {
		directives: {
			defaultSrc: ['"none"'],
			childSrc: ['"none"'],
			connectSrc: ['"none"'],
			fontSrc: ['"none"'],
			frameSrc: ['"none"'],
			imgSrc: ['"none"'],
			mediaSrc: ['"none"'],
			objectSrc: ['"none"'],
			scriptSrc: ['"none"'],
			styleSrc: ['"none"'],
			formAction: ['"none"'],
			frameAncestors: ['"none"'],
			pluginTypes: ['"none"'],
			sandbox: false,
			reportUri: '/report/csp'
		},
		browserSniff: true,
		disableAndroid: true,
		setAllHeaders: true
	},
	dnsPrefetchControl: {
		allow: false
	},
	expectCt: {
		enforce: true,
		maxAge: 10886400,
		reportUri: '/report/ct'
	},
	frameguard: {
		action: 'deny'
	},
	hidePoweredBy: {
		setTo: 'PHP 6.6.6'
	},
	// hpkp: {
	// 	maxAge: 10886400,
	// 	sha256s: [],
	// 	reportUri: '/report/hpkp'
	// },
	hsts: {
		maxAge: 10886400,
		includeSubDomains: true,
		preload: true
	},
	ieNoOpen: true,
	noCache: true,
	noSniff: true,
	referrerPolicy: {
		policy: 'no-referrer'
	},
	xssFilter: {
		setOnOldIE: true
	}
}));

app.use('/', require(path.join(__dirname, 'routes')));

app.use((req, res, next) => {
	next({
		status: status.NOT_FOUND,
		errors: [{
			message: 'Podany adres nie istnieje.'
		}]
	});
});

if ('development' === app.get('env'))
	app.use((err, req, res, next) => {
		res.status(err.status || 500);
		res.json({
			data: err,
			errors: err.errors
		});
	});
else
	app.use((err, req, res, next) => {
		res.status(err.status || 500);
		res.json({
			errors: err.errors
		});
	});

server.listen(3000);
