;(function($) {
	$.LocalBoardsAPI = function( ) {
		var defaults = {
			domain: 'http://api.localboards.org',
			pageIndex: 0,
			pageSize: 25,
			onCountyListRequest: function( success, message, data ) {
				if( plugin.onCountyListRequest ) {
					plugin.onCountyListRequest( success, message, data );
				}
			},
			onCountyRequest: function( success, message, data ) {
				if( plugin.onCountyRequest ) {
					plugin.onCountyRequest( success, message, data );
				}
			},
			onBoardListRequest: function( success, message, data ) {
				if( plugin.onBoardListRequest ) {
					plugin.onBoardListRequest( success, message, data );
				}
			},
			onBoardRequest: function( success, message, data ) {
				if( plugin.onBoardRequest ) {
					plugin.onBoardRequest( success, message, data );
				}
			},
			onBoardMemberListRequest: function( success, message, data ) {
				if( plugin.onBoardMemberListRequest ) {
					plugin.onBoardMemberListRequest( success, message, data );
				}
			},
			onBoardMemberRequest: function( success, message, data ) {
				if( plugin.onBoardMemberRequest ) {
					plugin.onBoardMemberRequest( success, message, data );
				}
			},
			onBoardSeatListRequest: function( success, message, data ) {
				if( plugin.onBoardSeatListRequest ) {
					plugin.onBoardSeatListRequest( success, message, data );
				}
			},
			onBoardSeatRequest: function( success, message, data ) {
				if( plugin.onBoardSeatRequest ) {
					plugin.onBoardSeatRequest( success, message, data );
				}
			},
			onMemberRequest: function( success, message, data ) {
				if( plugin.onMemberRequest ) {
					plugin.onMemberRequest( success, message, data );
				}
			}
		};

		var plugin = this;

		plugin.settings = {};

		plugin.getCounties = function( state, pageIndex, pageSize ) {
			$.ajax({
				type:"GET",
				crossDomain: true,
				accept:"application/json",
				contentType:"application/json",
				url:plugin.settings.domain+"/states/"+state+'/counties?pg='+pageIndex+'&pgSize='+pageSize,
				dataType:"json",
				success:function(data) {
					if(data.success) {
						plugin.settings.onCountyListRequest(true, data.message, data.data);
					} else {
						plugin.settings.onCountyListRequest(false, data.message, null);
					}
				},
				error:function(xhr,status,error) {
					var notice = 'Status['+xhr.status+'] '+xhr.statusText+"\n\n"+
								 'Response: '+xhr.responseText;
					plugin.settings.onCountyListRequest(false, notice, null);
				}
			});
		};

		plugin.getCounty = function( state, county ) {
			$.ajax({
				type:"GET",
				crossDomain: true,
				accept:"application/json",
				contentType:"application/json",
				url:plugin.settings.domain+"/states/"+state+'/counties/'+county,
				dataType:"json",
				success:function(data) {
					if(data.success) {
						plugin.settings.onCountyRequest(true, data.message, data.data);
					} else {
						plugin.settings.onCountyRequest(false, data.message, null);
					}
				},
				error:function(xhr,status,error) {
					var notice = 'Status['+xhr.status+'] '+xhr.statusText+"\n\n"+
								 'Response: '+xhr.responseText;
					plugin.settings.onCountyRequest(false, notice, null);
				}
			});
		};

		plugin.getBoardsByState = function( state, pageIndex, pageSize ) {
			$.ajax({
				type:"GET",
				crossDomain: true,
				accept:"application/json",
				contentType:"application/json",
				url:plugin.settings.domain+"/states/"+state+'/boards?pg='+pageIndex+'&pgSize='+pageSize,
				dataType:"json",
				success:function(data) {
					if(data.success) {
						plugin.settings.onBoardListRequest(true, data.message, data.data);
					} else {
						plugin.settings.onBoardListRequest(false, data.message, null);
					}
				},
				error:function(xhr,status,error) {
					var notice = 'Status['+xhr.status+'] '+xhr.statusText+"\n\n"+
								 'Response: '+xhr.responseText;
					plugin.settings.onBoardListRequest(false, notice, null);
				}
			});
		};

		plugin.getBoardsByCity = function( state, city, pageIndex, pageSize ) {
			$.ajax({
				type:"GET",
				crossDomain: true,
				accept:"application/json",
				contentType:"application/json",
				url:plugin.settings.domain+"/states/"+state+'/cities/'+city+'/boards?pg='+pageIndex+'&pgSize='+pageSize,
				dataType:"json",
				success:function(data) {
					if(data.success) {
						plugin.settings.onBoardListRequest(true, data.message, data.data);
					} else {
						plugin.settings.onBoardListRequest(false, data.message, null);
					}
				},
				error:function(xhr,status,error) {
					var notice = 'Status['+xhr.status+'] '+xhr.statusText+"\n\n"+
								 'Response: '+xhr.responseText;
					plugin.settings.onBoardListRequest(false, notice, null);
				}
			});
		};

		plugin.getBoardsByCounty = function( state, county, pageIndex, pageSize ) {
			$.ajax({
				type:"GET",
				crossDomain: true,
				accept:"application/json",
				contentType:"application/json",
				url:plugin.settings.domain+"/states/"+state+'/counties/'+county+'/boards?pg='+pageIndex+'&pgSize='+pageSize,
				dataType:"json",
				success:function(data) {
					if(data.success) {
						plugin.settings.onBoardListRequest(true, data.message, data.data);
					} else {
						plugin.settings.onBoardListRequest(false, data.message, null);
					}
				},
				error:function(xhr,status,error) {
					var notice = 'Status['+xhr.status+'] '+xhr.statusText+"\n\n"+
								 'Response: '+xhr.responseText;
					plugin.settings.onBoardListRequest(false, notice, null);
				}
			});
		};

		plugin.getBoardFromCountyWithId = function( state, county, id ) {
			$.ajax({
				type:"GET",
				crossDomain: true,
				accept:"application/json",
				contentType:"application/json",
				url:plugin.settings.domain+"/states/"+state+'/counties/'+county+'/boards/'+id,
				dataType:"json",
				success:function(data) {
					if(data.success) {
						plugin.settings.onBoardRequest(true, data.message, data.data);
					} else {
						plugin.settings.onBoardRequest(false, data.message, null);
					}
				},
				error:function(xhr,status,error) {
					var notice = 'Status['+xhr.status+'] '+xhr.statusText+"\n\n"+
								 'Response: '+xhr.responseText;
					plugin.settings.onBoardRequest(false, notice, null);
				}
			});
		};

		plugin.getBoardFromStateWithId = function( state, id ) {
			$.ajax({
				type:"GET",
				crossDomain: true,
				accept:"application/json",
				contentType:"application/json",
				url:plugin.settings.domain+"/states/"+state+'/boards/'+id,
				dataType:"json",
				success:function(data) {
					if(data.success) {
						plugin.settings.onBoardRequest(true, data.message, data);
					} else {
						plugin.settings.onBoardRequest(false, data.message, null);
					}
				},
				error:function(xhr,status,error) {
					var notice = 'Status['+xhr.status+'] '+xhr.statusText+"\n\n"+
								 'Response: '+xhr.responseText;
					plugin.settings.onBoardRequest(false, notice, null);
				}
			});
		};

		plugin.getBoardMemberListFromCityBoardById = function( state, city, id, pageIndex, pageSize ) {
			$.ajax({
				type:"GET",
				crossDomain: true,
				accept:"application/json",
				contentType:"application/json",
				url:plugin.settings.domain+"/states/"+state+'/cities/'+city+'/boards/'+id+'/members?pg='+pageIndex+'&pgSize='+pageSize,
				dataType:"json",
				success:function(data) {
					if(data.success) {
						plugin.settings.onBoardMemberListRequest(true, data.message, data.data);
					} else {
						plugin.settings.onBoardMemberListRequest(false, data.message, null);
					}
				},
				error:function(xhr,status,error) {
					var notice = 'Status['+xhr.status+'] '+xhr.statusText+"\n\n"+
								 'Response: '+xhr.responseText;
					plugin.settings.onBoardMemberListRequest(false, notice, null);
				}
			});
		};

		plugin.getBoardMemberFromCityBoardById = function( state, city, boardId, id ) {
			$.ajax({
				type:"GET",
				crossDomain: true,
				accept:"application/json",
				contentType:"application/json",
				url:plugin.settings.domain+"/states/"+state+'/cities/'+city+'/boards/'+boardId+'/members/'+id,
				dataType:"json",
				success:function(data) {
					if(data.success) {
						plugin.settings.onBoardMemberRequest(true, data.message, data.data);
					} else {
						plugin.settings.onBoardMemberRequest(false, data.message, null);
					}
				},
				error:function(xhr,status,error) {
					var notice = 'Status['+xhr.status+'] '+xhr.statusText+"\n\n"+
								 'Response: '+xhr.responseText;
					plugin.settings.onBoardMemberRequest(false, notice, null);
				}
			});
		};

		plugin.getBoardMemberListFromCountyBoardById = function( state, county, id, pageIndex, pageSize ) {
			$.ajax({
				type:"GET",
				crossDomain: true,
				accept:"application/json",
				contentType:"application/json",
				url:plugin.settings.domain+"/states/"+state+'/counties/'+county+'/boards/'+id+'/members?pg='+pageIndex+'&pgSize='+pageSize,
				dataType:"json",
				success:function(data) {
					if(data.success) {
						plugin.settings.onBoardMemberListRequest(true, data.message, data.data);
					} else {
						plugin.settings.onBoardMemberListRequest(false, data.message, null);
					}
				},
				error:function(xhr,status,error) {
					var notice = 'Status['+xhr.status+'] '+xhr.statusText+"\n\n"+
								 'Response: '+xhr.responseText;
					plugin.settings.onBoardMemberListRequest(false, notice, null);
				}
			});
		};

		plugin.getBoardMemberFromCountyBoardById = function( state, county, boardId, id ) {
			$.ajax({
				type:"GET",
				crossDomain: true,
				accept:"application/json",
				contentType:"application/json",
				url:plugin.settings.domain+"/states/"+state+'/counties/'+county+'/boards/'+boardId+'/members/'+id,
				dataType:"json",
				success:function(data) {
					if(data.success) {
						plugin.settings.onBoardMemberRequest(true, data.message, data.data);
					} else {
						plugin.settings.onBoardMemberRequest(false, data.message, null);
					}
				},
				error:function(xhr,status,error) {
					var notice = 'Status['+xhr.status+'] '+xhr.statusText+"\n\n"+
								 'Response: '+xhr.responseText;
					plugin.settings.onBoardMemberRequest(false, notice, null);
				}
			});
		};

		plugin.getBoardMemberListFromStateBoardById = function( state, id, pageIndex, pageSize ) {
			$.ajax({
				type:"GET",
				crossDomain: true,
				accept:"application/json",
				contentType:"application/json",
				url:plugin.settings.domain+"/states/"+state+'/boards/'+id+'/members?pg='+pageIndex+'&pgSize='+pageSize,
				dataType:"json",
				success:function(data) {
					if(data.success) {
						plugin.settings.onBoardMemberListRequest(true, data.message, data.data);
					} else {
						plugin.settings.onBoardMemberListRequest(false, data.message, null);
					}
				},
				error:function(xhr,status,error) {
					var notice = 'Status['+xhr.status+'] '+xhr.statusText+"\n\n"+
								 'Response: '+xhr.responseText;
					plugin.settings.onBoardMemberListRequest(false, notice, null);
				}
			});
		};

		plugin.getBoardMemberFromStateBoardById = function( state, boardId ) {
			$.ajax({
				type:"GET",
				crossDomain: true,
				accept:"application/json",
				contentType:"application/json",
				url:plugin.settings.domain+"/states/"+state+'/boards/'+boardId+'/members/'+id,
				dataType:"json",
				success:function(data) {
					if(data.success) {
						plugin.settings.onBoardMemberRequest(true, data.message, data.data);
					} else {
						plugin.settings.onBoardMemberRequest(false, data.message, null);
					}
				},
				error:function(xhr,status,error) {
					var notice = 'Status['+xhr.status+'] '+xhr.statusText+"\n\n"+
								 'Response: '+xhr.responseText;
					plugin.settings.onBoardMemberRequest(false, notice, null);
				}
			});
		};

		plugin.getBoardSeatListFromCityBoardById = function( state, city, id, pageIndex, pageSize ) {
			$.ajax({
				type:"GET",
				crossDomain: true,
				accept:"application/json",
				contentType:"application/json",
				url:plugin.settings.domain+"/states/"+state+'/cities/'+city+'/boards/'+id+'/seats?pg='+pageIndex+'&pgSize='+pageSize,
				dataType:"json",
				success:function(data) {
					if(data.success) {
						plugin.settings.onBoardSeatListRequest(true, data.message, data.data);
					} else {
						plugin.settings.onBoardSeatListRequest(false, data.message, null);
					}
				},
				error:function(xhr,status,error) {
					var notice = 'Status['+xhr.status+'] '+xhr.statusText+"\n\n"+
								 'Response: '+xhr.responseText;
					plugin.settings.onBoardSeatListRequest(false, notice, null);
				}
			});
		};

		plugin.getBoardSeatFromCityBoardById = function( state, city, boardId, id ) {
			$.ajax({
				type:"GET",
				crossDomain: true,
				accept:"application/json",
				contentType:"application/json",
				url:plugin.settings.domain+"/states/"+state+'/cities/'+city+'/boards/'+boardId+'/seats/'+id,
				dataType:"json",
				success:function(data) {
					if(data.success) {
						plugin.settings.onBoardSeatRequest(true, data.message, data.data);
					} else {
						plugin.settings.onBoardSeatRequest(false, data.message, null);
					}
				},
				error:function(xhr,status,error) {
					var notice = 'Status['+xhr.status+'] '+xhr.statusText+"\n\n"+
								 'Response: '+xhr.responseText;
					plugin.settings.onBoardSeatRequest(false, notice, null);
				}
			});
		};

		plugin.getBoardSeatListFromCountyBoardById = function( state, county, id, pageIndex, pageSize ) {
			$.ajax({
				type:"GET",
				crossDomain: true,
				accept:"application/json",
				contentType:"application/json",
				url:plugin.settings.domain+"/states/"+state+'/counties/'+county+'/boards/'+id+'/seats?pg='+pageIndex+'&pgSize='+pageSize,
				dataType:"json",
				success:function(data) {
					if(data.success) {
						plugin.settings.onBoardSeatListRequest(true, data.message, data.data);
					} else {
						plugin.settings.onBoardSeatListRequest(false, data.message, null);
					}
				},
				error:function(xhr,status,error) {
					var notice = 'Status['+xhr.status+'] '+xhr.statusText+"\n\n"+
								 'Response: '+xhr.responseText;
					plugin.settings.onBoardSeatListRequest(false, notice, null);
				}
			});
		};

		plugin.getBoardSeatFromCountyBoardById = function( state, county, boardId, id ) {
			$.ajax({
				type:"GET",
				crossDomain: true,
				accept:"application/json",
				contentType:"application/json",
				url:plugin.settings.domain+"/states/"+state+'/counties/'+county+'/boards/'+boardId+'/seats/'+id,
				dataType:"json",
				success:function(data) {
					if(data.success) {
						plugin.settings.onBoardSeatRequest(true, data.message, data.data);
					} else {
						plugin.settings.onBoardSeatRequest(false, data.message, null);
					}
				},
				error:function(xhr,status,error) {
					var notice = 'Status['+xhr.status+'] '+xhr.statusText+"\n\n"+
								 'Response: '+xhr.responseText;
					plugin.settings.onBoardSeatRequest(false, notice, null);
				}
			});
		};

		plugin.getBoardSeatListFromStateBoardById = function( state, id, pageIndex, pageSize ) {
			$.ajax({
				type:"GET",
				crossDomain: true,
				accept:"application/json",
				contentType:"application/json",
				url:plugin.settings.domain+"/states/"+state+'/boards/'+id+'/seats?pg='+pageIndex+'&pgSize='+pageSize,
				dataType:"json",
				success:function(data) {
					if(data.success) {
						plugin.settings.onBoardSeatListRequest(true, data.message, data.data);
					} else {
						plugin.settings.onBoardSeatListRequest(false, data.message, null);
					}
				},
				error:function(xhr,status,error) {
					var notice = 'Status['+xhr.status+'] '+xhr.statusText+"\n\n"+
								 'Response: '+xhr.responseText;
					plugin.settings.onBoardSeatListRequest(false, notice, null);
				}
			});
		};

		plugin.getBoardSeatFromStateBoardById = function( state, boardId ) {
			$.ajax({
				type:"GET",
				crossDomain: true,
				accept:"application/json",
				contentType:"application/json",
				url:plugin.settings.domain+"/states/"+state+'/boards/'+boardId+'/seats/'+id,
				dataType:"json",
				success:function(data) {
					if(data.success) {
						plugin.settings.onBoardSeatRequest(true, data.message, data.data);
					} else {
						plugin.settings.onBoardSeatRequest(false, data.message, null);
					}
				},
				error:function(xhr,status,error) {
					var notice = 'Status['+xhr.status+'] '+xhr.statusText+"\n\n"+
								 'Response: '+xhr.responseText;
					plugin.settings.onBoardSeatRequest(false, notice, null);
				}
			});
		};

		plugin.getMemberFromStateById = function( state, id ) {
			$.ajax({
				type:"GET",
				crossDomain: true,
				accept:"application/json",
				contentType:"application/json",
				url:plugin.settings.domain+"/states/"+state+'/members/'+id,
				dataType:"json",
				success:function(data) {
					if(data.success) {
						plugin.settings.onMemberRequest(true, data.message, data.data);
					} else {
						plugin.settings.onMemberRequest(false, data.message, null);
					}
				},
				error:function(xhr,status,error) {
					var notice = 'Status['+xhr.status+'] '+xhr.statusText+"\n\n"+
								 'Response: '+xhr.responseText;
					plugin.settings.onMemberRequest(false, notice, null);
				}
			});
		};

		var init = function( ) {
			plugin.settings = $.extend({}, defaults);
		};

		init();
	};
})(jQuery);