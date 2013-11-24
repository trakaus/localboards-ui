// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var url = window.location.pathname.split( '/' );
// if we have a numeric (:id) value at end of path, we're querying a specific element
var api = new $.LocalBoardsAPI();
var ViewModel = function() {
	var self = this;

	self.boards = ko.observableArray();
	self.board = ko.observable();
	self.board.members = ko.observableArray();

	self.addBoard = function(data) {
		this.boards.push(data);
	};

};
var vm = new ViewModel();
ko.applyBindings(vm);

var createNewBoard = function(data) {
	this.id = data.id;
	this.title = data.title;
	this.duties = data.duties;
	this.qualifications = data.qualifications;
	this.createdAt = data.created_at;
	this.isActive = data.is_active;
	this.size = data.seats;
	this.url = data.url;
	this.termLength = data.term_length;
	this.updatedAt = data.updatedAt;
	this.meetingDates = data.meeting_dates;
	this.meetingPlace = data.meeting_place;
	this.meetingTime = data.meeting_time;
	this.openSeats = 1000;
	//if (data.members)
		this.members = ko.observableArray(data.members);
};

var setBoard = function(board) {
	vm.board = new createNewBoard(board);
};

function onBoardsListRequest(success, message, data) {
	if (success) {
		vm.addBoard(new createNewBoard(data));
		alert(message);
	}
}
function onBoardRequest(success, message, data) {
	if (success) {
		vm.board = new createNewBoard(data);
		alert(message);
	}
}

api.onBoardsListRequest = onBoardsListRequest;
api.onBoardRequest = onBoardRequest;


if (isNaN(url[url.length - 1]) === true) {
		var apiBoards = api.getBoardsByState('ne', 0, 25);

		// ADD MOCK DATA
		// TODO: REMOVE
		vm.addBoard(
				{
					title: "Board A",
					duties: "test 1",
					size: 5,
					openSeats: 1
				});
		vm.addBoard(
				{
					title: "Board B",
					duties: "test 123",
					size: 7,
					openSeats: 0
				});

} else {
	var id = url[url.length - 1];
	var apiBoard = api.getBoardFromStateWithId('ne', id);
	setBoard({
		title: "Board A",
		duties: "Review and approves applications for Air Conditioning/Air Distribution licensing and continuing education of Master and Journeyman Installers. Certifies examination scores, addresses complaints/misuses against license holders.",
		size: 5,
		openSeats: 0,
		meetingDates: "First Tuesday of each month",
		meetingPlace: "Planning Department Central Conference Room, 11th Floor",
		meetingTime: "2013-11-24T13:30:00Z",
		members: [{name: "John Doe"}]
	});
}

