/*
	QLFund
	2018-10-04 v.0.1
*/

var qlfund = false;
var destUrl = "http://www.assembly.spb.ru/feedback/index/assembly_personal/751?to=635500344";

$( document ).ready(function() {
	var url = window.location.href;
	if (url == "http://qlfund.ru./problem-1.html" || url == "http://qlfund.ru/problem-1.html") {
		qlfund = true;
		$('#form-btn-send-message').click(function() {
			var message = $('pre#message').html();
			var name1 = $('#formName1').val();
			var name2 = $('#formName2').val();
			var email = $('#formEmail').val();

			chrome.storage.sync.set({'message': message}, function() { console.log('Saved: message'); });
			chrome.storage.sync.set({'name1': name1}, function() { console.log('Saved: name1 - ' + name1); });
			chrome.storage.sync.set({'name2': name2}, function() { console.log('Saved: name2 - ' + name2); });
			chrome.storage.sync.set({'email': email}, function() { console.log('Saved: email - ' + email); });
			
			window.location.href = destUrl;
		});
	} else {
		qlfund = false;
	}
});

$( document ).ready(function() {
	var url = window.location.href;
	if (url == destUrl) {
		console.log('Assembly');

		//$('body').unbind('paste');
		chrome.storage.sync.get('message', function(result) {
			$('textarea#message').val(result.message);
			$('textarea#message').focus();
			$('textarea#message').focusout();
			$('textarea#message').attr('style', 'height: 250px;');
			chrome.storage.sync.remove('message', function() {});
		});
		chrome.storage.sync.get('name1', function(result) {
			$('input#first_name').val(result.name1);
			$('input#first_name').focus();
			$('input#first_name').focusout();
			chrome.storage.sync.remove('name1', function() {});
		});
		chrome.storage.sync.get('name2', function(result) {
			$('input#surname').val(result.name2);
			$('input#surname').focus();
			$('input#surname').focusout();
			chrome.storage.sync.remove('name2', function() {});
		});
		chrome.storage.sync.get('email', function(result) {
			$('#email-wrap').find('input').val(result.email);
			$('#email-wrap').find('input').focus();
			$('#email-wrap').find('input').focusout();
			chrome.storage.sync.remove('email', function() {});
		});
		$('#phone').focus();

	}
});
