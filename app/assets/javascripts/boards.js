// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
var vm = null;
var api = new $.LocalBoardsAPI();
var url = window.location.pathname.split('/');
var id = url[url.length - 1];

var BoardListViewModel = function() {
	var self = this;

	self.boards = ko.observableArray();

	self.addBoard = function(data) {
		this.boards.push(data);
	};
};

var BoardViewModel = function() {
	this.id = ko.observable();
	this.localUrl = ko.observable();

	this.cityId = ko.observable();
	this.countyId = ko.observable();
	this.stateId = ko.observable();
	this.alternatingSeats = ko.observable();
	this.departmentId = ko.observable();

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
	this.seats = ko.observableArray();
};

function toTitleCase(str) {
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
	vm.localUrl = buildLocalUrl(data.id);
	vm.cityId(data.city_id);
	vm.countyId(data.county_id);
	vm.stateId(data.state_id);
	vm.alternatingSeats(data.alternating_seats);
	vm.departmentId(data.department_id);
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

	vm.members([]);
	if (data.members)
		vm.members(data.members);

	vm.openings([]);
	if (data.openings)
		vm.openings(data.openings);

	vm.seats([]);
	if (data.seats)
		vm.seats(data.seats);
}


var createNewBoardMember = function(data) {
	this.memberId = data.member_id;
	this.boardId = data.board_id;
	this.createdAt = data.created_at;
	this.updatedAt = data.updated_at;
	this.boardSeatId = data.board_seat_id;
	this.isActive = data.is_active;
	this.installationDate = data.installation_date;
	this.appointmentDate = data.appointment_date;
	this.person = ko.observable(); // will be updated with later API call
};
var createNewPerson = function(data) {
	this.createdAt = data.created_at;
	this.updatedAt = data.updated_at;
	this.firstName = data.first_name;
	this.lastName = data.last_name;
};
var createNewBoard = function(data) {
	this.id = data.id;
	this.localUrl = buildLocalUrl(data.id);

	this.cityId = data.city_id;
	this.countyId = data.county_id;
	this.stateId = data.state_id;
	this.alternatingSeats = data.alternating_seats;
	this.departmentId = data.department_id;
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
	this.members = [];
	this.openings = [];
};

function addMember (data) {
	vm.members.push(new createNewBoardMember(data));
}

function updateMemberWithPersonData (data) {
	$.each(vm.members, function() {
		if (this.id === data.id) {
			this.person(new createNewPerson(data));
		}
	});
}

/*
 * Tie in API callbacks from api.localboards.org
 */
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
function onBoardMemberListRequest(success, message, data) {
	if (success) {
		$.each(data, function() {
			addMember(data);
			//var apiMemberInfo = api.getMemberById(data.member_id);
		});
	}
}
function onMemberRequest(success, message, data) {
	if (success) {
		updateMemberWithPersonData(data);
	}
}

api.onBoardListRequest = onBoardListRequest;
api.onBoardRequest = onBoardRequest;
api.onBoardMemberListRequest = onBoardMemberListRequest;
api.onMemberRequest = onMemberRequest;

// if we have a numeric (:id) value at end of path, we're querying a specific element
if (isNaN(url[url.length - 1]) === true || id.length === 0) {
	vm = new BoardListViewModel();
	ko.applyBindings(vm);
	var apiBoards = api.getBoardsByState('ne', 0, 25);
} else {
	vm = new BoardViewModel();
	ko.applyBindings(vm);
	var apiBoard = api.getBoardFromStateWithId('ne', id);
	//var apiMembers = api.getBoardMembersByBoardId(id);
}

