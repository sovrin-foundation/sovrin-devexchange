'use strict';

import UserAuthenticationController from '../controllers/users/UserAuthenticationController';
import UserPasswordController from '../controllers/users/UserPasswordController';
import AuthPolicy from '../policies/AuthPolicy';
import { any } from 'async';
import { response } from 'express';

class AuthRouter {
	public static getInstance() {
		return this.instance || (this.instance = new this());
	}

	private static instance: AuthRouter;

	private constructor() {
		AuthPolicy.invokeRolesPolicies();
	}

	public setupRoutes = app => {
		// Setting up the users password api
		app.route('/api/auth/forgot')
			.all(AuthPolicy.isAllowed)
			.post(UserPasswordController.forgot);

		app.route('/api/auth/reset/:token')
			.all(AuthPolicy.isAllowed)
			.get(UserPasswordController.validateResetToken);

		app.route('/api/auth/reset/:token')
			.all(AuthPolicy.isAllowed)
			.post(UserPasswordController.reset);

		// Setting up the users authentication api
		app.route('/api/auth/signup')
			.all(AuthPolicy.isAllowed)
			.post(UserAuthenticationController.signup);

		app.route('/api/auth/signin')
			.all(AuthPolicy.isAllowed)
			.post(UserAuthenticationController.signin);

		app.route('/api/auth/signout')
			.all(AuthPolicy.isAllowed)
			.get(UserAuthenticationController.signout);

		// Setting the github oauth routes
		app.route('/api/auth/github')
			.all(AuthPolicy.isAllowed)
			.get(UserAuthenticationController.oauthCall('github', {}));

		app.route('/api/auth/github/callback')
			.all(AuthPolicy.isAllowed)
			.get(UserAuthenticationController.oauthCallback('github'));

		app.route('/api/auth/saml')
			.all(AuthPolicy.isAllowed)
			.get(UserAuthenticationController.samlCall('saml', {}));

		app.route('/api/auth/saml/consume')
			.all(AuthPolicy.isAllowed)
			.post(UserAuthenticationController.samlResponse);
		app.route('/saml')
			.all(AuthPolicy.isAllowed);
	};
}

export default AuthRouter.getInstance();
