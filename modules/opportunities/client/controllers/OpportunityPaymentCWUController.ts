import angular, {IController} from 'angular';
import {IOpportunityModel} from '../../server/models/OpportunityModel';
import {IOpportunitiesService} from '../services/OpportunitiesService';

export default class OpportunityPaymentCWUController implements IController {
	public static $inject = ['$uibModalInstance', 'opportunity', 'OpportunitiesService'];

	public stripe: any;
	public name: string;
	public email: string;
	public phone: string;
	public paymentAmountDisplay: string;

	constructor(
		private $uibModalInstance: ng.ui.bootstrap.IModalInstanceService,
		public opportunity: IOpportunityModel,
		private OpportunitiesService: IOpportunitiesService
	) {
		this.paymentAmount();
		$uibModalInstance.rendered.then(() => {
			this.generatePaymentForm();
		});

	}

	public paymentAmount() {
		this.paymentAmountDisplay = `${this.opportunity.currency.code}${this.htmlDecode(this.opportunity.currency.symbol)} ${this.opportunity.fee}`;
	}

	public generatePaymentForm() {
		// @ts-ignore
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
					color: '#424770'
				},

				'::placeholder': {
					color: '#9BACC8'
				},

				':focus::placeholder': {
					color: '#CFD7DF'
				}
			},
			invalid: {
				color: '#fff',
				':focus': {
					color: '#FA755A'
				},
				'::placeholder': {
					color: '#FFCCA5'
				}
			}
		};

		const elementClasses = {
			focus: 'focus',
			empty: 'empty',
			invalid: 'invalid'
		};

		const cardNumber = elements.create('cardNumber', {
			style: elementStyles,
			classes: elementClasses
		});

		const cardExpiry = elements.create('cardExpiry', {
			style: elementStyles,
			classes: elementClasses
		});

		const cardCvc = elements.create('cardCvc', {
			style: elementStyles,
			classes: elementClasses
		});

		cardCvc.mount('#cc-card-cvc');

		cardExpiry.mount('#cc-card-expiry');

		cardNumber.mount('#cc-card-number');
		// @ts-ignore
		// window.registerElements([cardNumber, cardExpiry, cardCvc], 'payment-body');

		const form = window.document.querySelector('#payment-form');

		form.addEventListener('submit', (ev) => {
			ev.preventDefault();
			const additionalData = {
				name: this.name,
				email: this.email,
				phone: this.phone
			};
			this.stripe.createToken(cardNumber, additionalData).then((result) => {
				if (result.error) {
					// @ts-ignore
				} else {
					this.opportunity.paymentToken = result;
					const form = document.getElementById('payment-form');
					const hiddenInput = document.createElement('input');
					hiddenInput.setAttribute('type', 'hidden');
					hiddenInput.setAttribute('name', 'stripeToken');
					hiddenInput.setAttribute('value', result.token.id);
					form.appendChild(hiddenInput);
					// Submit the form
					try {
						const success = this.OpportunitiesService.pay(this.opportunity);
						this.$uibModalInstance.close(success);
					} catch (e) {
						// @ts-ignore
					}
				}
			});
		});

	}

	private htmlDecode(htmlToDecode) {
		const e = document.createElement('div');
		e.innerHTML = htmlToDecode;
		return e.childNodes[0].nodeValue;
	}
}

angular.module('opportunities').controller('OpportunityPaymentCWUController', OpportunityPaymentCWUController);
