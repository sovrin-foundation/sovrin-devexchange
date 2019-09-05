import angular, {IController} from "angular";
import {IOpportunitiesService, IOpportunityResource} from "../services/OpportunitiesService";
import {IOpportunityModel} from "../../server/models/OpportunityModel";

export default class OpportunityPaymentCWUController implements IController {
	public static $inject = ['$uibModalInstance', 'opportunity', 'OpportunitiesService'];

	public stripe: any;

	constructor(
		private $uibModalInstance: ng.ui.bootstrap.IModalInstanceService,
		public opportunity: IOpportunityModel,
		private OpportunitiesService: IOpportunitiesService
	) {
		$uibModalInstance.rendered.then(() => {
			this.generatePaymentForm();
		});
	}

	public generatePaymentForm() {
		//@ts-ignore
		this.stripe = window.Stripe('pk_test_w38olW3fCUFkax31qQR3Rypf00HgEgocyf');
		const elements = this.stripe.elements({
			fonts: [{
				cssSrc: 'https://fonts.googleapis.com/css?family=Quicksand'
			}]
		});

		const elementStyles = {
			base: {
				color: '#fff',
				fontWeight: 600,
				fontFamily: 'Quicksand, Open Sans, Segoe UI, sans-serif',
				fontSize: '16px',
				fontSmoothing: 'antialiased',

				':focus': {
					color: '#424770',
				},

				'::placeholder': {
					color: '#9BACC8',
				},

				':focus::placeholder': {
					color: '#CFD7DF',
				},
			},
			invalid: {
				color: '#fff',
				':focus': {
					color: '#FA755A',
				},
				'::placeholder': {
					color: '#FFCCA5',
				},
			},
		};

		const elementClasses = {
			focus: 'focus',
			empty: 'empty',
			invalid: 'invalid',
		};

		const cardNumber = elements.create('cardNumber', {
			style: elementStyles,
			classes: elementClasses,
		});

		const cardExpiry = elements.create('cardExpiry', {
			style: elementStyles,
			classes: elementClasses,
		});

		var cardCvc = elements.create('cardCvc', {
			style: elementStyles,
			classes: elementClasses,
		});

		cardCvc.mount('#cc-card-cvc');

		cardExpiry.mount('#cc-card-expiry');

		cardNumber.mount('#cc-card-number');
		//@ts-ignore
		// window.registerElements([cardNumber, cardExpiry, cardCvc], 'payment-body');

		const form = window.document.getElementById('payment-form');

		form.addEventListener('submit', (ev) => {
			ev.preventDefault();
			console.log("was submitted");
			this.stripe.createToken(cardNumber).then((result) => {
				if (result.error) {
					console.error(result);
				} else {
					this.opportunity.paymentToken = result;
					var form = document.getElementById('payment-form');
					var hiddenInput = document.createElement('input');
					hiddenInput.setAttribute('type', 'hidden');
					hiddenInput.setAttribute('name', 'stripeToken');
					hiddenInput.setAttribute('value', result.token.id);
					form.appendChild(hiddenInput);
					// Submit the form

					console.log(result);
					const success = this.OpportunitiesService.pay(this.opportunity);
				}
			});
		});

	}
}

angular.module('opportunities').controller('OpportunityPaymentCWUController', OpportunityPaymentCWUController);
