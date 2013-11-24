// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
var vm = null;
var api = new $.LocalBoardsAPI();

var BoardListViewModel = function() {
	var self = this;

	self.boards = ko.observableArray();
	self.board = ko.observable();
	self.board.members = ko.observableArray();
	self.board.openings = ko.observableArray();

	self.addBoard = function(data) {
		this.boards.push(data);
	};
};

var BoardViewModel = function() {
	this.id = ko.observable();
	this.localUrl = ko.observable();
	this.title = ko.observable();
	this.duties = ko.observable();
	this.qualifications = ko.observable();
	this.createdAt = ko.observable();
	this.isActive = ko.observable();
	this.size = ko.observable();
	this.url = ko.observable();
	this.termLength = ko.observable();
	this.updatedAt = ko.observable();
	this.meetingDates = ko.observable();
	this.meetingPlace = ko.observable();
	this.meetingTime = ko.observable();
	this.openSeats = ko.observable();
	this.members = ko.observableArray();
	this.openings = ko.observableArray();
};

function toTitleCase(str)
{
	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

var getLocation = function(href) {
    var l = document.createElement("a");
    l.href = href;
    return l;
};

function buildLocalUrl (id) {
	return 'http://' + getLocation(window.location).hostname + '/boards/' + id;
}

function writeData (data) {
	vm.id(data.id);
	this.localUrl = buildLocalUrl(data.id);
	vm.title(toTitleCase(data.title));
	vm.duties(data.duties);
	vm.qualifications(data.qualifications);
	vm.createdAt(data.created_at);
	vm.isActive(data.is_active);
	vm.size(data.seats);
	vm.url(data.url);
	vm.termLength(data.term_length);
	vm.updatedAt(data.updated_at);
	vm.meetingDates(data.meeting_dates);
	vm.meetingPlace(data.meeting_place);
	vm.meetingTime(data.meeting_time);
	vm.openSeats(0);
	//vm.members(data.members);
	vm.members([{name: "John Doe"}, {name: "Jane Doe"}]);
	vm.openings(data.openings);
}

var createNewBoard = function(data) {
	this.id = data.id;
	this.localUrl = buildLocalUrl(data.id);
	this.title = toTitleCase(data.title);
	this.duties = data.duties;
	this.qualifications = data.qualifications;
	this.createdAt = data.created_at;
	this.isActive = data.is_active;
	this.size = data.seats;
	this.url = data.url;
	this.termLength = data.term_length;
	this.updatedAt = data.updated_at;
	this.meetingDates = data.meeting_dates;
	this.meetingPlace = data.meeting_place;
	this.meetingTime = data.meeting_time;
	this.openSeats = 0;
	this.members = data.members;
	this.openings = data.openings;
};

function onBoardListRequest(success, message, data) {
	if (success) {
		$.each(data, function() {
			vm.addBoard(new createNewBoard(this));
		});
	}
}
function onBoardRequest(success, message, data) {
	if (success) {
		writeData(data.data);
	}
}

api.onBoardListRequest = onBoardListRequest;
api.onBoardRequest = onBoardRequest;

var url = window.location.pathname.split( '/' );
// if we have a numeric (:id) value at end of path, we're querying a specific element
if (isNaN(url[url.length - 1]) === true) {
	vm = new BoardListViewModel();
	ko.applyBindings(vm);
	var apiBoards = api.getBoardsByState('ne', 0, 25);
} else {
	vm = new BoardViewModel();
	ko.applyBindings(vm);

	var id = url[url.length - 1];
	var apiBoard = api.getBoardFromStateWithId('ne', id);
	/*
	vm = writeData(vm, {
		id: id,
		title: "Board A",
		duties: "Review and approves applications for Air Conditioning/Air Distribution licensing and continuing education of Master and Journeyman Installers. Certifies examination scores, addresses complaints/misuses against license holders.",
		qualifications: '',
		created_at: '',
		is_active: '',
		url: '',
		term_length: '',
		updated_at: '',
		seats: 5,
		meeting_dates: "First Tuesday of each month",
		meeting_place: "Planning Department Central Conference Room, 11th Floor",
		meeting_time: "2013-11-24T13:30:00Z",
		members: [{name: "John Doe"}],
		openings: [{date: "2013-11-24", position: "Grunt"}, {date: "2013-11-24", position: "Peon"}]
	});
*/
}

