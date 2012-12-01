var Interval = 1000;
var MaxNotifications = 5;
var WaitingForResponse = false;

Date.prototype.CustomDateTimeString = function(){
	var ho = this.getHours();
	if(ho < 10) ho = "0" + ho;

	var mi = this.getMinutes();
	if(mi < 10) mi = "0" + mi;

	var se = this.getSeconds();
	if(se < 10) se = "0" + se;

	var da = this.getDate();
	if(da < 10) da = "0" + da;

	var mo = this.getMonth()+1;
	if(mo < 10) mo = "0" + mo;
	
	var ms = this.getMilliseconds();
	if(ms < 10) {
		ms = "000" + ms;
	} else {
		if(ms < 100) {
			ms = "00" + ms;
		} else {
			if (ms != 1000) ms = "0" + ms;
		}
	}

	return da + "-" + mo + "-" + this.getFullYear() + " " + ho + ":" + mi + ":" + se + ":" + ms;
}

function RemoveLastNotification(){
	if($("#notifications li").length > MaxNotifications){
		$("#notifications li:gt(" + (MaxNotifications-1) + ")").fadeOut(250, function(){
			$(this).remove();
		});
	}
}

function AddNotification(text, success){
	var now = new Date();
	
	if(success == true){
		$("#notifications ul").prepend($('<li class="success"><span><strong>' + now.CustomDateTimeString() + '</strong></span>' + text + '</li>').fadeIn(250, function(){
			RemoveLastNotification();
		}));
	} else {
		$("#notifications ul").prepend($('<li class="error"><span><strong>' + now.CustomDateTimeString() + '</strong></span>' + text + '</li>').fadeIn(250, function(){
			RemoveLastNotification();
		}));
	}
}

function UpdateGpio(num, val){
	var gpio_id = "#gpio_" + num;
	
	if(val == 1){
		if($(gpio_id).hasClass("false")){
		
			$(gpio_id + " div.control").animate({
				width: "75%"
			}, 100, function(){
				$(gpio_id).removeClass("false");
				$(gpio_id).addClass("true");
				$(gpio_id + " div.control").animate({width: "50%"}, 75, function(){
					AddNotification("Zmiana stanu portu <strong>" + $(gpio_id + " div.name").text() + "</strong> na <strong>HIGH</strong>.", true);
				});
			});
		}
	} else {
		if($(gpio_id).hasClass("true")){
		
			$(gpio_id + " div.control").animate({
				width: "75%"
			}, 100, function(){
				$(gpio_id).removeClass("true");
				$(gpio_id).addClass("false");
				$(gpio_id + " div.control").animate({width: "50%"}, 75, function(){
					AddNotification("Zmiana stanu portu <strong>" + $(gpio_id + " div.name").text() + "</strong> na <strong>LOW</strong>.", true);
				});
			});
		}
	}
}

function UpdateValues(gpios, on_finish){
	for(i = 0; i < gpios.length; i++){
		UpdateGpio(gpios[i].num, gpios[i].val);
	}
	
	if(on_finish && typeof(on_finish) === "function"){
		on_finish();
	}
}

function GetData(){
	if(!WaitingForResponse){
		$.getJSON("read_all.kl1",{},
			function(data){
				if(data.error == 0){
					UpdateValues(data.gpio);
					PollServerAfterInterval();
				} else {
					AddNotification(data.error_desc, false);
				}
			});
	} else {
		PollServerAfterInterval();
	}
}

function SetData(n, v){
	$.getJSON("set_out.kl1",{pin: n, val: v},
		function(data){
			if(data.error == 0){
				UpdateValues(data.gpio, function(){
					WaitingForResponse = false;
				});
			} else {
				AddNotification(data.error_desc, false);
			}
		});
}

function PollServerAfterInterval(){
	var animate_to = "90%";
	
	if($(".indicator > span").css("marginLeft") != "0px"){
		animate_to = "0%";
	}

	$(".indicator > span").animate({
		marginLeft: animate_to
	}, Interval, function(){
		GetData();
	});
}

$(document).ready(function(){
	
	// AJAX error handler
	$.ajaxSetup({"error":function(XMLHttpRequest,textStatus,errorThrown){
		AddNotification("Wystąpił błąd w połączeniu z serwerem - spróbuj oświeżyć stronę.", false);
	}});
	
	// start polling only if any of GPIOs is defined
	if($("div.gpio").length > 0){
		AddNotification("Rozpoczęcie pracy.", true);
		PollServerAfterInterval();
	} else {
		AddNotification("Nie zdefiniowano żadnych GPIO w pliku nagłówkowym!", false);
	}
	
	// output value change
	$("#outputs div.gpio").click(function(){
		var temp = $(this).attr("id").split("_");
		
		if(!WaitingForResponse){
			WaitingForResponse = true;
			if($(this).hasClass("false")){
				SetData(temp[1], 1);
			} else {
				SetData(temp[1], 0);
			}
		}
	});

});