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
			}
		}

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
					alert('get counties: ' + notice);
				}
			});
		}

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
					alert('get counties: ' + notice);
				}
			});
		}

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
					alert('get counties: ' + notice);
				}
			});
		}

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
					alert('get counties: ' + notice);
				}
			});
		}

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
					alert('get counties: ' + notice);
				}
			});
		}

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
					alert('get counties: ' + notice);
				}
			});
		}

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
					alert('get counties: ' + notice);
				}
			});
		}

		var init = function( ) {
			plugin.settings = $.extend({}, defaults);
		}

		init();
	}
})(jQuery);