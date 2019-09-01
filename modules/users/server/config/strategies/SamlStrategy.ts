import { readFileSync } from 'fs';
import passport from 'passport';
import passportSaml from 'passport-saml';
import { UserModel } from '../../models/UserModel';

export default class SamlAuthStrategy {

	public init = () => {
		const passportAny: any = passport;
		const stratAny: any = passportSaml.Strategy;
		const test = __dirname + '/GoogleIDPCertificate-matwolff.com.pem';
		passportAny.use('saml', new stratAny({
				protocol: 'https://',
				entryPoint: 'https://accounts.google.com/o/saml2/idp?idpid=C02a56blm',
				issuer: 'https://0c69292d.ngrok.io/sso',
				path: 'https://0c69292d.ngrok.io/api/saml/consume',
				identifierFormat: 'urn:oasis:names:tc:SAML:2.0:nameid-format:email',
				callbackUrl: 'https://0c69292d.ngrok.io/api/saml/consume'
			},
			(profile, done) => {
				done(null, {
					email: profile.email,
					name: profile.name
				});
				// UserModel.findOne({
				// 	$or: [
				// 		{
				// 			email: profile.email.toLowerCase()
				// 		},
				// 		{
				// 			username: profile.name.toLowerCase()
				// 		}
				// 	]
				// })
				// 	.populate('capabilities', 'code name')
				// 	.populate('capabilitySkills', 'code name')
				// 	.exec((err, user) => {
				// 		if (err) {
				// 			return done(err);
				// 		}
				// 		if (!user) {
				// 			return done(null, false, {
				// 				message: 'Invalid username or password'
				// 			});
				// 		}
				// 		return done(null, user);
				// 	});
			}));
	};
}
