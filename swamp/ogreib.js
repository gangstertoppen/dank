var threadsPerPage = 150;

function displayBoard(targetElem, boardJsonFile) { $.getJSON(boardJsonFile, function(board) {
	var firstfile = (board['page_order'] === "des") ? 0 : board['last_tfile'];
	processTFile(targetElem, board, firstfile, 0);
});}



function processTFile(targetElem, board, tfilenum, threadsCount) {
	if (tfilenum < 0 || tfilenum > board['last_tfile'] || threadsCount > threadsPerPage) {
		return;
	}

	var tfileurl = board['data_dir'] + "/" + board['tfile_preix'] + tfilenum + ".json";

	$.getJSON(tfileurl, function(tfile) {
		var start = (board['order'] === "acc") ? 0 : tfile['threads_in_file'] - 1;
		var end   = (board['order'] === "acc") ? tfile['threads_in_file'] : -1;
		var step  = (board['order'] === "acc") ? 1 : -1;
		for (i = start; i != end && threadsCount < threadsPerPage; i += step) {
			displayPost(targetElem, board, tfile['posts'][i]);
			threadsCount++;
		}

		tfilenum += (board['page_order'] === "des") ? 1 : -1;
		processTFile(targetElem, board, tfilenum, threadsCount);
	});
}



function displayPost(targetElem, board, postData) {
	var str = "<div class='thread' id='p" + postData['no'] + "'>";
	str += "<span class='postnum'>" + postData['no'] + "</span>";
	str += " Name: ";
	str += "<span class='postername"
	if (postData['capcode'] != undefined) { str += " " + postData['capcode']; }
	str += "''>" + postData['name'] + "</span>";
	if (postData['capcode'] != undefined) {
		str += " <img class='capcode' ";
		if (postData['capcode'] == "admin") { str += "title='le red pine tree man' "; }
		if (postData['capcode'] == "honoruser") { str += "title='le cyan pine tree man' "; }
		str += "src='" + board['data_dir'] + "/cap" + postData['capcode'] + ".gif' />";
	}
	str += "<span class='postdate'> " + readableDatetime(postData['time']) +"</span>";
	str += "<div class='postmessage'>" + postData['com'] + "</div>";
	str += "</div>";
	$(targetElem).append(str);
	setQuoteLinks("#p" + postData['no']);
}


function readableDatetime(unixtimestamp) {
	var date = new Date(unixtimestamp * 1000);
    var month	= date.getMonth() + 1;
    var day 	= date.getDate();
    var hour 	= date.getHours();
    var min 	= date.getMinutes();
    var sec 	= date.getSeconds();
    month 	= (month < 10 ? "0" : "") + month;
    day 	= (day 	 < 10 ? "0" : "") + day;
    hour 	= (hour  < 10 ? "0" : "") + hour;
    min 	= (min   < 10 ? "0" : "") + min;
    sec 	= (sec   < 10 ? "0" : "") + sec;
    return date.getFullYear() + "-" + month + "-" + day + " at " +  hour + ":" + min + ":" + sec;
}


function setQuoteLinks(parentElem) {
	$(parentElem + " .quotelink").each(function() {
		$(this).attr("href", "#p" + $(this).html().substring(8));
	});
}