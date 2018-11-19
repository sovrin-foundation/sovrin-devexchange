'use strict';

import { Model, model, Schema } from 'mongoose';
import { IAttachmentDocument } from '../interfaces/IAttachmentDocument';
import { IProposalDocument } from '../interfaces/IProposalDocument';
import { ITeamQuestionResponseDocument } from '../interfaces/ITeamQuestionResponseDocument';

export interface IAttachmentModel extends Model<IAttachmentDocument> {}
const AttachmentSchema = new Schema({
	name: { type: String },
	path: { type: String },
	type: { type: String }
});

const QuestionSchema = new Schema({
	question: { type: String },
	response: { type: String },
	rank: { type: Number, default: 0 },
	rejected: { type: Boolean, default: false }
});

const AddendumSchema = new Schema({
	description: { type: String },
	createdBy: { type: 'ObjectId', ref: 'User', default: null },
	created: { type: Date, default: null }
});

export interface ITeamQuestionResponseModel extends Model<ITeamQuestionResponseDocument> {}
const TeamQuestionResponseSchema = new Schema({
	question: { type: String },
	response: { type: String },
	rank: { type: Number, default: 0 },
	rejected: { type: Boolean, default: false },
	score: { type: Number, default: 0 }
});

const PhaseSchema = new Schema({
		isImplementation: { type: Boolean, default: false },
		isInception: { type: Boolean, default: false },
		isPrototype: { type: Boolean, default: false },
		team: {
			type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
			default: []
		},
		capabilities: {
			type: [{ type: Schema.Types.ObjectId, ref: 'Capability' }],
			default: []
		},
		capabilitySkills: {
			type: [{ type: Schema.Types.ObjectId, ref: 'CapabilitySkill' }],
			default: []
		},
		cost: { type: Number, default: 0 }
});

const PhasesSchema = new Schema({
	aggregate: { type: PhaseSchema, default: {} },
	implementation: { type: PhaseSchema, default: {} },
	inception: { type: PhaseSchema, default: {} },
	proto: { type: PhaseSchema, default: {} }
});

export interface IProposalModel extends Model<IProposalDocument> {}
const ProposalSchema = new Schema(
	{
		summary: { type: String },
		detail: { type: String },
		opportunity: {
			type: Schema.Types.ObjectId,
			ref: 'Opportunity',
			required: 'Please select a program',
			index: true
		},
		status: {
			type: String,
			default: 'New',
			enum: ['New', 'Draft', 'Submitted', 'Reviewed', 'Assigned']
		},
		isAssigned: { type: Boolean, default: false },
		isCompany: { type: Boolean, default: false },
		businessName: { type: String, default: '' },
		businessAddress: { type: String, default: '' },
		businessContactName: { type: String, default: '' },
		businessContactEmail: {
			type: String,
			default: '',
			trim: true,
			lowercase: true
		},
		businessContactPhone: { type: String, default: '' },
		created: { type: Date, default: null },
		createdBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
		updated: { type: Date, default: null },
		updatedBy: { type: 'ObjectId', ref: 'User', default: null },
		isAcceptedTerms: { type: Boolean, default: false },
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: 'Please select a user',
			index: true
		},
		org: { type: Schema.Types.ObjectId, ref: 'Org', index: true },
		phases: { type: PhasesSchema, default: {} },
		questions: { type: [QuestionSchema], default: [] },
		attachments: { type: [AttachmentSchema], default: [] },
		interviewComplete: { type: Boolean, default: false },
		scores: {
			skill: { type: Number, default: 0 },
			question: { type: Number, default: 0 },
			codechallenge: { type: Number, default: 0 },
			interview: { type: Number, default: 0 },
			price: { type: Number, default: 0 },
			total: { type: Number, default: 0 }
		},
		ranking: { type: Number, default: 0 },
		screenedIn: { type: Boolean, default: false },
		passedCodeChallenge: { type: Boolean, default: false },
		addendums: { type: [AddendumSchema], default: [] },
		teamQuestionResponses: {
			type: [TeamQuestionResponseSchema],
			default: []
		}
	},
	{ usePushEach: true }
);

export const Proposal: IProposalModel = model<IProposalDocument, IProposalModel>('Proposal', ProposalSchema);
export const Attachment: IAttachmentModel = model<IAttachmentDocument, IAttachmentModel>('Attachment', AttachmentSchema);
export const TeamQuestionResponse: ITeamQuestionResponseModel = model<ITeamQuestionResponseDocument, ITeamQuestionResponseModel>('TeamQuestionResponse', TeamQuestionResponseSchema);

export default Proposal;