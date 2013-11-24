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
	var self = this;

	self.id = ko.observable();
	self.localUrl = ko.observable();

	self.cityId = ko.observable();
	self.countyId = ko.observable();
	self.stateId = ko.observable();
	self.alternatingSeats = ko.observable();
	self.departmentId = ko.observable();

	self.title = ko.observable();
	self.duties = ko.observable();
	self.qualifications = ko.observable();
	self.createdAt = ko.observable();
	self.isActive = ko.observable();
	self.size = ko.observable();
	self.url = ko.observable();
	self.termLength = ko.observable();
	self.updatedAt = ko.observable();
	self.meetingDates = ko.observable();
	self.meetingPlace = ko.observable();
	self.meetingTime = ko.observable();
	self.members = ko.observableArray();
	self.openings = ko.observableArray();
	self.seats = ko.observableArray();
	self.openSeats = ko.computed(function() {
		if (!isNaN(self.members().length) && !isNaN(self.size())) {
			var diff = self.size() - self.members().length;
			if (diff < 0) {
				return 0;
			} else {
				return self.size() - self.members().length;
			}
		} else if (self.members().length === 0) {
			return self.size();
		} else {
			return null;
		}
	}, this);

	self.addSeat = function (data) {
		if (this.seats)
			this.seats.push(data);
	};
	self.addMember = function (data) {
		if (data && data.isActive)
			this.members.push(data);
	};
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
	return 'http://' + getLocation(window.location).host + '/boards/' + id;
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
	if (data.seats && data.seats === -1)
		vm.size('OPEN');
	else
		vm.size(data.seats);
	vm.url(data.url);
	vm.termLength(data.term_length);
	vm.updatedAt(data.updated_at);
	vm.meetingDates(data.meeting_dates);
	vm.meetingPlace(data.meeting_place);
	vm.meetingTime(data.meeting_time);

	vm.members([]);
	if (data.members)
		vm.members(data.members);

	vm.openings([]);
	if (data.openings)
		vm.openings(data.openings);
}


var createNewBoardMember = function(data) {
	this.memberId = data.id;
	this.createdAt = data.created_at;
	this.updatedAt = data.updated_at;
	this.boardSeatId = data.board_seat_id;
	this.isActive = data.is_active;
	this.installationDate = data.installation_date;
	this.appointmentDate = data.appointment_date;
	this.person = ko.observable();
};
var createNewPerson = function(data) {
	// id, created_at, updated_at, first_name, last_name, is_active
	this.createdAt = data.created_at;
	this.updatedAt = data.updated_at;
	this.firstName = data.first_name;
	this.lastName = data.last_name;
	this.isActive = data.is_active;
	this.fullName = ko.computed(function() {
		return this.firstName + ' ' + this.lastName;
	}, this);
};
var createNewSeat = function(data) {
	// alternate","board_id","created_at","id","is_active","period","qualifications","term_notes","updated_at"
	this.alternate = data.alternate;
	this.boardId = data.board_id;
	this.createdAt = data.created_at;
	this.id = data.id;
	this.isActive = data.is_active;
	this.period = data.period;
	this.qualifications = data.qualifications;
	this.termNotes = data.term_notes;
	this.updatedAt = data.updated_at;
	this.member = ko.observable();
	this.member({});
	if (data.member)
		this.member(data.member);
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
	if (data.seats && data.seats === -1)
		this.size = 'OPEN';
	else
		this.size = data.seats;
	this.url = data.url;
	this.termLength = data.term_length;
	this.updatedAt = data.updated_at;
	this.meetingDates = data.meeting_dates;
	this.meetingPlace = data.meeting_place;
	this.meetingTime = data.meeting_time;
	this.members = [];
	this.openings = [];
};

function updateMemberWithPersonData (data) {
	$.each(vm.members(), function() {
		if (this.memberId === data.id) {
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
		api.getBoardSeatListFromStateBoardById('ne', data.data.id, 0, 1000);
	}
}
function onBoardMemberListRequest(success, message, data) {
	if (success) {
		$.each(data, function() {
			vm.addMember(new createNewBoardMember(this));
			api.getMemberFromStateById('ne', this.id);
		});
	}
}
function onBoardSeatListRequest(success, message, data) {
	if (success) {
		$.each(data, function() {
			vm.addSeat(new createNewSeat(this));
		});
		api.getBoardMemberListFromStateBoardById('ne', id, 0, 1000);
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
api.onBoardSeatListRequest = onBoardSeatListRequest;
api.onMemberRequest = onMemberRequest;

$(function() {
	// if we have a numeric (:id) value at end of path, we're querying a specific element
	if (isNaN(url[url.length - 1]) === true || id.length === 0) {
		vm = new BoardListViewModel();
		ko.applyBindings(vm);
		var apiBoards = api.getBoardsByState('ne', 0, 25);
	} else {
		vm = new BoardViewModel();
		ko.applyBindings(vm);
		api.getBoardFromStateWithId('ne', id);
	}
});


