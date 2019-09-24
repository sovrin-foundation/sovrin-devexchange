'use strict';

// Import certain style elements here so that webpack picks them up
import '@fortawesome/fontawesome-free/js/all';
import {StateOrName, StateParams, StateService} from '@uirouter/core';
import angular, {IController, ILocationService, IRootScopeService, IWindowService} from 'angular';
import '../../../../public/sass/theme.scss';
import {IAuthenticationService} from '../../../users/client/services/AuthenticationService';
import {IUserService} from '../../../users/client/services/UsersService';
import '../css/bl_checkbox.css';
import '../css/core.css';

class HomeController implements IController {
	public static $inject = ['AuthenticationService', 'UsersService', '$state', '$rootScope', '$window', '$location'];
	public isUser: boolean;

	constructor(
		private AuthenticationService: IAuthenticationService,
		private UsersService: IUserService,
		private $state: StateService,
		private $rootScope: IRootScopeService,
		private $window: IWindowService,
		private $location: ILocationService) {

		if (this.$location.search().email) {
			const email = this.$location.search().email;
			this.$location.search({});
			this.assignUser(email);
		}

		if (sessionStorage.prevState) {
			const prevState = sessionStorage.prevState as StateOrName;
			const prevParams = JSON.parse(sessionStorage.prevParams) as StateParams;
			delete sessionStorage.prevState;
			delete sessionStorage.prevParams;
			this.$state.go(prevState, prevParams);
		}
		this.isUser = !!this.AuthenticationService.user;
	}

	private async assignUser(email: string) {
		try {
			this.UsersService.samlSignin({'email': email});
			this.$rootScope.$broadcast('userSignedIn');
			this.$rootScope.$emit('userSignedIn');
			this.$state.go('home');
		} catch (e) {
			// TODO: handle error
		}
	}
}

angular.module('core').controller('HomeController', HomeController);
