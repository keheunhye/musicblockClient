
$(function(){
	if(localUser==null){
		//alert("로그인안되어 있구나? 로그인부터해주겠니? 여기 처리를 어떻게 할까 ㅎ?");
	}
});

$(function() {
	$("#menu").bind("click", function() {
		$(".music-menu.header.total-container").hide();
	});

	$("#exit").bind("click", function() {
		$(".music-menu.header.total-container").show();
	});
});

$(function() {
	$("#menu").bind("click", function() {
		$(".music-menu.header.total-container").hide();
	});

	$("#exit").bind("click", function() {
		$(".music-menu.header.total-container").show();
	});
});

$(function(){
	var leftTab= $("label").eq(0);
	var rightTab=$("label").eq(1);

	leftTab.bind("click",function(){
		console.log("tab1 click");
		$(this).addClass("clickLabel");
		leftTab.find(".fa").css("font-weight","700");
		leftTab.find(".fa").css("color","#0CE");
		rightTab.removeClass("clickLabel");
		rightTab.find(".fa").css("font-weight","200");
		rightTab.find(".fa").css("color","black");
		$("#musicSection").hide();
		$("#blockSection").show();
	});

	rightTab.bind("click",function(){
		console.log("tab2 click");
		$(this).addClass("clickLabel");
		rightTab.find(".fa").css("font-weight","700");
		rightTab.find(".fa").css("color","#0CE");
		leftTab.removeClass("clickLabel");
		leftTab.find(".fa").css("font-weight","200");
		leftTab.find(".fa").css("color","black");
		$("#blockSection").hide();
		$("#musicSection").show();
	});

});


var block = {key:'', title:'', sec:0, notes:'', emotion:[], hash:'', ucode:''}
var blockArray = new Array();

var test1 = 0;
var max1 = 30; 
$(function() {
	RecvFromServer();
	function RecvFromServer() {
		//$(window).scroll(function() {
		var scrollHeight = parseInt($(window).scrollTop()+ $(window).height()); //윈도우는 딱 보이는 화면의 크기
		var documentHeight = parseInt($(document).height()); //도큐먼트는 보이지 않는 곳도 포함한 크기(도큐먼트가 윈도우보다 더 사이즈가 큼) 
		//if (scrollHeight >= documentHeight) { 
		for (test1 = 1; test1 < max1; test1++) {
			$.ajax({
				type : 'GET',
				url : 'http://192.168.0.94:8080/' + 'block/getJsonBlock/'+test1,
				//url : 'http://14.32.66.61:8888/' + 'block/getJsonBlock/'
				dataType : "json",
				data : "",
				async : false,
				success : function(data) {
					console.log("JSONData : "+ JSON.stringify(data)); //stringify은 string type으로 바꿔줌

					if (data['block'] != null) {

						var dynamicEl = "<div class='people'><li><a href=#><img src='images/3.png' /></a><h2>"
							+ data['block'].title
							+ "</h2> <span class='info'><nm>이산돌</nm> <em>"
							+ data['block'].regDate
							+ "</em><hr><div class='comments'></div></span><ul class='toolbar'><ui><p class='likes'><span class='glyphicon glyphicon-heart'></span><span class='nLikes'></span></p></ui><ui><p class='download'><span class='glyphicon glyphicon-download-alt'></span><span class='nDown'>"+data['block'].dCount+"</span></p></ui><ui><p class='player'><span class='glyphicon glyphicon-play'></span><span class='nPlayers'>"+ data['block'].pCount+"</span></p></ui><ui><p class='stop'><span class='glyphicon glyphicon-stop'></span></p></ui></ul></li></div>";

						var leftHeight = parseInt($("#block-left").css("height"));
						var rightHeight = parseInt($("#block-right").css("height"));

						if (leftHeight <= rightHeight) {
							$("#block-left").append(dynamicEl);
							$("#block-left .people").last().data("title", data.block.title);
							$("#block-left .people").last().data("sec", data.block.time);
							$("#block-left .people").last().data("notes", data.block.note);
							$("#block-left .people").last().data("emotion", data.block.blockEmotionList);
							$("#block-left .people").last().data("hash", data.block.blockHashList);
							$("#block-left .people").last().data("ucode", data.block.uCode);

						} else {
							$("#block-right").append(dynamicEl);
							$("#block-right .people").last().data("title", data.block.title);
							$("#block-right .people").last().data("sec", data.block.time);
							$("#block-right .people").last().data("notes", data.block.note);
							$("#block-right .people").last().data("emotion", data.block.blockEmotionList);
							$("#block-right .people").last().data("hash", data.block.blockHashList);
							$("#block-right .people").last().data("ucode", data.block.uCode);
						}//end fo else문

					}//end of datablock문
				},//end of success문
				error : function(status) {
					console.log(status);
				}//end of error문
			})//end of ajax문
		}//end of for문 test
		$(".people").click(function() {
			var Aindex = $(".people").index(this);
			console.log(Aindex);
		}); 

	}//end of recvFun문
});	
	
	//좋아요 클릭시 카운트 증가
	function increaseLikes() {
		var myString = $(this).children('.nLikes').first().html();
		var myInteger = parseInt(myString);
		var myNewInteger = myInteger + 1;
		var nlikesUp = myNewInteger.toString();

		$(this).children('.nLikes').first().html(nlikesUp);
	}
	$('.likes').click(increaseLikes);		

$(document).on('click', ".glyphicon-play", function(){
	var index = $('.glyphicon-play').index(this);
	increasePlayers(index);
	//$('.glyphicon-play:eq(' + index + ')').hide();
	//$('.glyphicon-pause:eq(' + index + ')').show();

});

function increasePlayers(index) {
	var playersString = $('.nPlayers:eq(' + index + ')').html();
	var playersInteger = parseInt(playersString);
	var playersNewInteger = playersInteger + 1;
	var nPlayersUp = playersNewInteger.toString();
	$('.nPlayers:eq(' + index + ')').html(nPlayersUp);
}

function increaseDowns(index) {
	var DownsString = $('.nDown:eq(' + index + ')').html();
	var DownsInteger = parseInt(DownsString);
	var DownsNewInteger = DownsInteger + 1;
	var nDownsUp = DownsNewInteger.toString();
	$('.nDown:eq(' + index + ')').html(nDownsUp);
}

//download
$(document).on('click', ".glyphicon-download-alt", function() {
	var Pindex = $(".glyphicon-download-alt").index(this);

	increaseDowns(Pindex);
	if(localStorage.getItem("blockSeq") == null){
		localStorage.setItem("blockSeq", "0");
	}
	var blockSeq = localStorage.getItem("blockSeq");
	block.key = "blk" + blockSeq;

	block.title = $('.people').eq(Pindex).data("title");
	block.sec = $('.people').eq(Pindex).data("sec");
	block.notes = $('.people').eq(Pindex).data("notes");
	block.emotion = $('.people').eq(Pindex).data("emotion");
	block.hash =  $('.people').eq(Pindex).data("hash");
	block.ucode =$('.people').eq(Pindex).data("ucode");
	console.log("block:"+block);
	
	//block 저장
	localStorage.setItem("blk" + blockSeq, JSON.stringify(block));

	blockSeq++;
	localStorage.setItem("blockSeq", blockSeq);
	var testSeq = blockSeq-1;

});


$('.glyphicon-pause').click(function() {

	var index = $('.glyphicon-pause').index(this);
	$('.glyphicon-pause:eq(' + index + ')').hide();
	$('.glyphicon-play:eq(' + index + ')').show();
});




/*
<ul class='toolbar'>
	<ui><p class='likes'>
			<span class='glyphicon glyphicon-heart'></span>
				<span class='nLikes'></span>
		</p>
	</ui>
	<ui><p class='download'>
			<span class='glyphicon glyphicon-download-alt'></span>
				<span class='nDown'>"+data['block'].dCount+"</span>
		</p>
	</ui>
	<ui><p class='player'>
			<span class='glyphicon glyphicon-play'></span>
				<span class='nPlayers'>"+ data['block'].pCount+"</span>
		</p>
	</ui>
	<ui><p class='stop'>
			<span class='glyphicon glyphicon-stop'></span>
		</p>
	</ui>
</ul>
*/