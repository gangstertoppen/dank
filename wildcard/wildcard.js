function expandForm() {
	$('#expandbutton').css('display', 'none');
	$('form').css('display', 'block');
}


function validateTitle() {
	var str = $('input#title').val();
	if (str.length > 0 && str.length <= 16) {
		$('input#title').css('border-color', '#202020');
		$('input#title').css('background-color', '#FFFFFF');
		return true;
	} else {
		$('input#title').css('border-color', '#FF0000');
		$('input#title').css('background-color', '#FFF0F0');
		return false;
	}
}


function validateColor() {
	var str = $('#textColor').val();
	str = validateHex(str);
	$('#textColor').val(str);
	if (/^#[0-9A-F]{6}$/i.test(str)) {
		$('#textColor').css('border-color', '#202020');
		$('#textColor').css('background-color', '#FFFFFF');
		$('form').css('color', str);
		return true;
	} else {
		$('#textColor').css('border-color', '#FF0000');
		$('#textColor').css('background-color', '#FFF0F0');
		return false;
	}
}

function validateBgColor() {
	var str = $('#bgColor').val();
	str = validateHex(str);
	$('#bgColor').val(str);
	if (/^#[0-9A-F]{6}$/i.test(str)) {
		$('#bgColor').css('border-color', '#202020');
		$('#bgColor').css('background-color', '#FFFFFF');
		$('form').css('background-color', str);
		return true;
	} else {
		$('#bgColor').css('border-color', '#FF0000');
		$('#bgColor').css('background-color', '#FFF0F0');
		return false;
	}
}

function validateLinkColor() {
	var str = $('#linkColor').val();
	str = validateHex(str);
	$('#linkColor').val(str);
	if (/^#[0-9A-F]{6}$/i.test(str)) {
		$('#linkColor').css('border-color', '#202020');
		$('#linkColor').css('background-color', '#FFFFFF');
		$('#linkc').css('color', str);
		return true;
	} else {
		$('#linkColor').css('border-color', '#FF0000');
		$('#linkColor').css('background-color', '#FFF0F0');
		return false;
	}
}


function validateYoutubeAddr() {
	var str = $('input#youtube').val();
	if (str.length > 0 && str.length <= 16) {
		$('input#youtube').css('border-color', '#202020');
		$('input#youtube').css('background-color', '#FFFFFF');
		return true;
	} else {
		$('input#youtube').css('border-color', '#FF0000');
		$('input#youtube').css('background-color', '#FFF0F0');
		return false;
	}
}


function validateForm() {
	var validCount = 0;
	if (validateTitle()) 		{ validCount++; }
	if (validateColor()) 		{ validCount++; }
	if (validateBgColor()) 		{ validCount++; }
	if (validateLinkColor()) 	{ validCount++; }
	if (validateYoutubeAddr()) 	{ validCount++; }
	if (validCount == 5) {
		$('input#submit').removeAttr('disabled');
	} else {
		$('input#submit').attr('disabled', '');
	}
}


function validateHex(hex) {
	if (hex.charAt(0) != '#') {
		hex = '#'.concat(hex);
	}
	if (hex > 7) { 
		hex = hex.substr(0, 7);
	}
	return hex;
}


function submitForm() {
	$('#errormsg').html("<br/>Processing...<br/>");
	$('#errormsg').css('display', 'block');
	var formData = { TITLE: $('input#title').val(),
					 FGCOLOR: $('input#textColor').val(),
					 BGCOLOR: $('input#bgColor').val(),
					 LINKCOLOR: $('input#linkColor').val(),
					 YOUTUBE: $('input#youtube').val(),
					 MESSAGE: $('textarea#message').val()};
	$.post("post.php", formData, function(result) {
		$('#errormsg').html("<br/>" + result + "<br/><br/>");
	}, "text");
}


/* /history page: */
function populateHistoryList(targetElem) { $.getJSON("../his.json", function(history) {
	for(var i = 0; i < history.length; i++) {
		$(targetElem).append("<li><a class='entry' target='_blank' href='/wildcard/?entry=" +
			history[i]['time'].toString() + "&nosubmitbutton=1'>" + history[i]['title'] + 
			"</a> (submitted in " + readableDatetime(history[i]['time']) + ")</li>");
	}
});}


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

