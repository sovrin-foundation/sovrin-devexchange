'use strict';

var defaultEnvConfig = require('./default');

var devConfig = {
  db: {
    uri: process.env.MONGOHQ_URL || process.env.MONGODB_URI || 'mongodb://' + (process.env.MONGODB_SERVICE_HOST || process.env.DB_DEVEX_PORT_27017_TCP_ADDR || 'localhost') + ':27017' + '/' + (process.env.MONGODB_DATABASE || 'mean-dev'),
    options: {
      user: process.env.MONGODB_USER || '',
      pass: process.env.MONGODB_PASSWORD || '',
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
	  reconnectInterval: 1000,
	  useNewUrlParser: true,
	  autoIndex: false
    },
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false
  },
  sessionCookie: {
    // session expiration is set by default to 1 year (TODO: this is a temporary fix, and needs to be set to a reasonable value, and we need to implement proper timeout handling)
    maxAge: 365 * 24 * (60 * 60 * 1000),
    // maxAge: 2000,
    // httpOnly flag makes sure the cookie is only accessed
    // through the HTTP protocol and not JS/browser
    httpOnly: true,
    // secure cookie should be turned to true to provide additional
    // layer of security so that the cookie is set only when working
    // in HTTPS mode.
    secure: false
  },
  sessionTimeout: process.env.SESSION_TIMEOUT || 300 * 24,
  sessionTimeoutWarning: process.env.SESSION_WARNING || 300 * 24,
  log: {
    // logging with Morgan - https://github.com/expressjs/morgan
    // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
    //
    // cc:logging: modified apache format including internal user identification
    //
    format: 'tiny',
    fileLogger: {
      directoryPath: process.cwd(),
      fileName: 'app.log',
      maxsize: 10*1024*1024,
      maxFiles: 2,
      json: false
    }
  },
  app: {
    title: defaultEnvConfig.app.title + ' - Development Environment'
  },
  github: {
    clientID: process.env.GITHUB_ID || 'APP_ID',
    clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
    callbackURL: '/api/auth/github/callback',
    personalAccessToken: process.env.GITHUB_ACCESS_TOKEN || 'GITHUB_ACCESS_TOKEN'
  },
  shared: {
    owasp: {
      allowPassphrases: true,
      maxLength: 128,
      minLength: 4,
      minPhraseLength: 4,
      minOptionalTestsToPass: 1
    }
  },
  livereload: true,
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

// If a mailer service provider (such as gmail) is specified, use the provider...
if (process.env.MAILER_SERVICE_PROVIDER) {
	devConfig.mailer = {
		from: process.env.MAILER_FROM || '"BC Developer\'s Exchange" <noreply@bcdevexchange.org>',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER,
			auth: {
				user: process.env.MAILER_EMAIL_ID,
				pass: process.env.MAILER_PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
		}
	}
}
// ...otherwise, use the bcgov SMTP (which will only work when on the gov network)
else {
	devConfig.mailer = {
		from: process.env.MAILER_FROM || '"BC Developer\'s Exchange" <noreply@bcdevexchange.org>',
		options: {
		  host: process.env.MAILER_HOST || 'apps.smtp.gov.bc.ca',
		  port: process.env.MAILER_PORT || 25,
		  secure: false,
		  connectionTimeout: 5000,
		  greetingTimeout: 5000,
		  ignoreTLS: false,
		  tls: {
			rejectUnauthorized: false
		  }
		}
	  }
}

module.exports = devConfig;
