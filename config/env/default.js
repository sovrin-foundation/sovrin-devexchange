'use strict';

var path = require('path');
module.exports = {
	app: {
		title: 'Sovrin Foundation - Developer\'s Exchange',
		description: 'Better ways for government and developers to work together',
		keywords: 'developer, government, codewithus, agile, digitial service',
		googleAnalyticsTrackingID: process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'GOOGLE_ANALYTICS_TRACKING_ID',
		domain: process.env.DOMAIN || 'https://localhost:4000',
		googleRecaptchaSiteID: process.env.RECAPTCHA_SITE_ID
	},
	devexProd: process.env.DEVEX_PROD || false,
	port: process.env.PORT || 4000,
	host: process.env.HOST || '0.0.0.0',
	// DOMAIN config should be set to the fully qualified application accessible
	// URL. For example: https://www.myapp.com (including port if required).
	// Session Cookie settings
	sessionCookie: {
		// session expiration is set by default to 1 year (TODO: this is a temporary fix, and needs to be set to a reasonable value, and we need to implement proper timeout handling)
		maxAge: 24 * (60 * 60 * 1000),
		// maxAge: 2000,
		// httpOnly flag makes sure the cookie is only accessed
		// through the HTTP protocol and not JS/browser
		httpOnly: true,
		// secure cookie should be turned to true to provide additional
		// layer of security so that the cookie is set only when working
		// in HTTPS mode.
		secure: false
	},
	sessionTimeout: process.env.SESSION_TIMEOUT || 300,
	sessionTimeoutWarning: process.env.SESSION_WARNING || 300,
	allowCapabilityEditing: process.env.ALLOW_EDIT_CAPS || false,
	home: process.env.PWD || process.cwd() || '/opt/mean.js',
	terms: {
		cwu1: {
			path: 'public/code-with-us-terms-2019-06-18.pdf',
			name: 'code-with-us-terms.pdf',
			type: 'application/pdf'
		},
		user1: {
			path: 'public/terms-bc-developers-exchange-2018-04-19.pdf',
			name: 'terms-bc-developers-exchange-2018-04-19.pdf',
			type: 'application/pdf'
		},
		rfq1: {
			path: 'public/rfq-sprint-with-us-company-2018-05-15.pdf',
			name: 'rfq-sprint-with-us-company.pdf',
			type: 'application/pdf'
		},
		swu1: {
			path: 'public/sprint-with-us-terms-2018-05-14.pdf',
			name: 'sprint-with-us-terms.pdf',
			type: 'application/pdf'
		},
		serviceagreement: {
			path: 'public/sprint-with-us-service-agreement-2018-11-13.pdf',
			name: 'service-agreement.pdf',
			type: 'application/pdf'
		},
		codechallenge: {
			path: 'public/code-challenge-rules-2018-08-10.pdf',
			name: 'code-challenge.pdf',
			type: 'application/pdf'
		},
		teamscenario: {
			path: 'public/team-scenario-rules-2018-08-10.pdf',
			name: 'team-scenario.pdf',
			type: 'application/pdf'
		}
	},
	//
	// things to do with the notification service
	//
	notification: {
		host: process.env.NOTIFY_BC_SERVICE_HOST || '',
		port: process.env.NOTIFY_BC_SERVICE_PORT || ''
	},
	// sessionSecret should be changed for security measures and concerns
	sessionSecret: process.env.SESSION_SECRET || 'MEAN',
	// sessionKey is the cookie session name
	sessionKey: 'sessionId',
	sessionCollection: 'sessions',
	// Lusca config
	csrf: {
		// csrf: { 'angular': true },
		csrf: false,
		csp: false,
		xframe: 'SAMEORIGIN',
		p3p: 'ABCDEF',
		xssProtection: true
	},
	logo: 'modules/core/client/img/brand/logo.png',
	favicon: 'modules/core/client/img/brand/favicon.png',
	uploads: {
		diskStorage: {
			destination: function (req, file, cb) {
				cb(null, path.resolve('public/uploads/'));
			},
			filename: function (req, file, cb) {
				var datetimestamp = Date.now();
				// console.log ('file.originalname', file.originalname);
				cb(
					null,
					file.fieldname +
					'-' +
					datetimestamp +
					'.' +
					file.originalname.split('.')[file.originalname.split('.').length - 1]
				);
			}
		},
		profileUpload: {
			dest: 'public/uploads/', // Profile upload destination path
			display: 'uploads/',
			// dest: 'modules/users/client/img/profile/uploads/', // Profile upload destination path
			limits: {
				fileSize: 1 * 1024 * 1024 // Max file size in bytes (1 MB)
			}
		},
		fileUpload: {
			dest: path.resolve('public/uploads/'), // File upload destination path
			display: 'uploads/',
			limits: {
				fileSize: 3 * 1024 * 1024 // Max file size in bytes (3 MB)
			}
		}
	},
	shared: {
		owasp: {
			allowPassphrases: true,
			maxLength: 128,
			minLength: 10,
			minPhraseLength: 20,
			minOptionalTestsToPass: 4
		}
	},
	seedDB: {
		seed: process.env.MONGO_SEED === 'true',
		options: {
			logResults: process.env.MONGO_SEED_LOG_RESULTS !== 'false',
			seedUser: {
				username: process.env.MONGO_SEED_USER_USERNAME || 'user',
				provider: 'local',
				email: process.env.MONGO_SEED_USER_EMAIL || 'user@localhost.com',
				firstName: 'User',
				lastName: 'Local',
				displayName: 'User Local',
				roles: ['user']
			},
			seedAdmin: {
				username: process.env.MONGO_SEED_ADMIN_USERNAME || 'admin',
				provider: 'local',
				email: process.env.MONGO_SEED_ADMIN_EMAIL || 'admin@localhost.com',
				firstName: 'Admin',
				lastName: 'Local',
				displayName: 'Admin Local',
				roles: ['user', 'admin']
			},
			seedDev: {
				username: 'dev',
				provider: 'local',
				email: 'dev@localhost.com',
				firstName: 'Test',
				lastName: 'Developer',
				displayName: 'Test Developer',
				roles: ['user']
			},
			seedDev2: {
				username: 'dev2',
				provider: 'local',
				email: 'dev2@localhost.com',
				firstName: 'Test 2',
				lastName: 'Developer 2',
				displayName: 'Test Developer 2',
				roles: ['user']
			},
			seedGov: {
				username: 'gov',
				provider: 'local',
				email: 'gov@localhost.com',
				firstName: 'Test',
				lastName: 'Government',
				displayName: 'Test Government',
				roles: ['user', 'gov']
			}
		}
	}
};
