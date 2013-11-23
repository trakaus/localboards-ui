# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

class ViewModel
	constructor: () ->
		@members = ko.observableArray([
			{
				name: "Person A",
				description: "test 1"
			},
			{
				name: "Person B",
				description: "test 123"
			}
		])

$ ->
	ko.applyBindings(new ViewModel())