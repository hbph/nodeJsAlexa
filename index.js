'use strict';
const Alexa = require('ask-sdk-core');
const date = require('date-and-time');

// function invoke during intial skill launch
const LaunchRequestHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
	},
	handle(handlerInput) {
		const speechText = 'Welcome to Simple date and time skill';
		return handlerInput.responseBuilder
			.speak(speechText)
			.reprompt(speechText)
			.withSimpleCard('Launch nodeJS Alexa', speechText)
			.getResponse();
	}
};

// function invoke during Date Intent
const CurrentDateHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
			handlerInput.requestEnvelope.request.intent.name === 'CurrentDateIntent';
	},
	handle(handlerInput) {
    const now = new Date();
    var currentDt = date.format(now, 'ddd MMM DD YYYY');
		const speechText = "Current date is "+currentDt;
		return handlerInput.responseBuilder
			.speak(speechText)
			.withSimpleCard('Current date', speechText)
			.withShouldEndSession(false) // keep the session open
			.getResponse();
	}
};
// function invoke during Time Intent
const CurrentTimeHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
			handlerInput.requestEnvelope.request.intent.name === 'CurrentTimeIntent';
	},
	handle(handlerInput) {
    const now = new Date();
    var currentTime = date.format(now, 'hh:mm A [GMT]Z');
		const speechText = "Current time is "+currentTime;
		return handlerInput.responseBuilder
			.speak(speechText)
			.withSimpleCard('Current time', speechText)
			.withShouldEndSession(false) // keep the session open
			.getResponse();
	}
};
const HelpHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
			handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
	},
	handle(handlerInput) {
		const speechText = 'Simple date and time skill, ask current date and time';
		return handlerInput.responseBuilder
			.speak(speechText)
			.reprompt(speechText)
			.withSimpleCard('Help for Current Date & Time', speechText)
			.getResponse();
	}
};

// function invoke during close the skill session, with thanks note.
const CancelAndStopHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
			(handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent' ||
				handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
	},
	handle(handlerInput) {
		const speechText = 'Thanks for using date and time skill';
		return handlerInput.responseBuilder
			.speak(speechText)
			.withSimpleCard('Thanks', speechText)
			.getResponse();
	}
};
const SessionEndedRequestHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
	},
	handle(handlerInput) {
		// TODO: Resource cleanup
		return handlerInput.responseBuilder.getResponse();
	}
};
const ErrorHandler = {
	canHandle() {
		return true;
	},
	handle(handlerInput, error) {
		console.log(`Error handled: ${error.message}`);
		return handlerInput.responseBuilder
			.speak('Pardon, What did you say?')
			.reprompt('Pardon, What did you say?')
			.getResponse();
	},
};

exports.handler = Alexa.SkillBuilders.custom()
	.addRequestHandlers(
    LaunchRequestHandler,
		CurrentDateHandler,
		CurrentTimeHandler,
		HelpHandler,
		CancelAndStopHandler,
		SessionEndedRequestHandler)
	.lambda();
