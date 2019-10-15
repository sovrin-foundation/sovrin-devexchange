module.exports = {
	apps: [{
		name: 'Devex',
		script: './server-dist/server.js',
		cwd: '/devex/app/',

		// Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
		args: 'one two',
		instances: 3,
		autorestart: true,
		watch: false,
		max_memory_restart: '2G',
		env_development: {
			NODE_ENV: 'development',
			MONGODB_DEBUG: true,
			CAPABILITY_EDIT_ENABLED: true,
			error_file: '/devex/logs/err.log',
			out_file: '/devex/logs/out.log',
			// nodemailer parameters
			MAILER_SERVICE_PROVIDER: 'gmail',
			MAILER_FROM: 'your.address@email.com',
			MAILER_EMAIL_ID: 'email.id',
			MAILER_PASSWORD: 'password',

			// database seeding - these should normally be set to true for dev
			MONGO_SEED: true,
			MONGO_SEED_LOG_RESULTS: true,

// URI for the host of the application
			DOMAIN: 'http://localhost:4000',

// whether the app should be running in production mode - this affects whether development accounts are created
// and how the admin password is set
			DEVEX_PROD: false,

// github client_id and client_secret =======
			GITHUB_ID: 'abc123',
			GITHUB_SECRET: 'supersecret',

// access to github API
			GITHUB_ACCESS_TOKEN: 'abcfdefghijklmo12345',

// nexmo id and secret for sms 2FA (approval digitiziation)
			NEXMO_API_KEY: 'abc123abc',
			NEXMO_API_SECRET: 'abc123abc123',
			NEXMO_FROM_NUMBER: '12505555555',

// default credentials for local dev accounts - won’t be used in production
			DEV_ADMIN_PWD: 'JH3XN:EV-W6=qWm,',
			DEV_USER_PWD: ':E9_`jMG%-^np4',
			DEV_DEV_PWD: '9EygZf34NzM5X^vs',
			DEV_DEV2_PWD: '(Pp}f]f6T8q,UzyA',
			DEV_GOV_PWD: '{uL`b~4wv*NMT3H',
			ALLOW_EDIT_CAPS: true
		},
		env_production: {
			NODE_ENV: 'production'
		}
	}],

	deploy: {
		production: {
			user: 'node',
			host: '212.83.163.1',
			ref: 'origin/master',
			repo: 'git@github.com:repo.git',
			path: '/var/www/production',
			'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
		}
	}
};
