$(document).ready(function(){  
  
  var usernames = ["freecodecamp", "storbeck", "terakilobyte", "brunofin", "habathcx","RobotCaleb", "esl_sc2" , "thomasballinger","noobs2ninjas","beohoff", "skeleton_2spooky4me", "cretetion", "ogamingsc2"];
  var url = "";
  var urlStreams = "https://api.twitch.tv/kraken/streams/";
  
  for(var i=0; i<usernames.length; i++){
    url = urlStreams + usernames[i];    
    getStreamInfo(url, usernames[i]);    
  } // /For Loop
  
  $("#all").on('click', function(){
    thisObj = $(this);
    buttonSelect(thisObj);    
    $(".offline").fadeIn();
    $(".online").fadeIn();    
  }); // /click all button
  
  $("#online").on('click', function(){
    thisObj = $(this);
    buttonSelect(thisObj);
    $(".offline").fadeOut();
    $(".online").fadeIn();    
  }); // /click online button
  
  $("#offline").on('click', function(){
    thisObj = $(this);
    buttonSelect(thisObj);
    $(".online").fadeOut("fast");
    $(".offline").fadeIn("slow");    
  }); // /click offline button
  
  $("#search").keyup(function(){    
    var inputValue = $(this).val();
    console.log(inputValue);    
    $(".streamer").each(function(){
      var uid = $(this).attr("id").toLowerCase();      
      console.log(uid);      
      (uid.indexOf(inputValue) != -1) ? $(this).show() : $(this).hide();      
    }); // /each    
  }); // /keyup function
  
 
}); // /document ready

function getStreamInfo(url, username){  
  $.getJSON(url, function(data){
    
    if(data.stream !== null){
      $(".streamerContent").prepend('<a href="' + data.stream.channel.url + '" target="blank"><div class="streamer online" id="' + data.stream.channel.display_name + '"><div class="row"><div class="col-sm-2 col-xs-4"><div class="streamerLogo" id="logoOnline"><img src="' + data.stream.channel.logo + '" class="img-circle img-responsive" id="logo"></div></div><div class="col-sm-3 col-xs-7"><div class="streamerName">' + data.stream.channel.display_name + '</div></div><div class="col-sm-7 col-xs-8"><div class="streamerInfo">' + data.stream.channel.game + " - " + data.stream.channel.status + '</div></div></div></div></a>');
      }else{      
      getOfflineStreamInfo(username);
    }    
  }); // /AJAX Call  
} // /getStreamInfo function

function getOfflineStreamInfo(username){
  var urlChannels = "https://api.twitch.tv/kraken/channels/" + username;
  var urlLogo = ""
  
  $.getJSON(urlChannels, function(data){    
    if(data.logo == null){
      urlLogo = "https://www.dropbox.com/s/tqn3lzs5xqj8fsy/small%20question%20mark.png?raw=1";
    }else{
      urlLogo = data.logo;
    }
    
    $(".streamerContent").append('<a href="' + data.url + '" target="blank"><div class="streamer offline" id="' + data.display_name + '"><div class="row"><div class="col-sm-2 col-xs-4"><div class="streamerLogo"><img src="' + urlLogo + '" class="img-circle img-responsive" id="logo"></div></div><div class="col-sm-3 col-xs-7"><div class="streamerName">' + data.display_name + '</div></div><div class="col-sm-7 col-xs-8"><div class="streamerInfo">Offline</div></div></div></div></a>');    
  }); // /AJAX Call  
}; // /getOfflineStreamInfo

function buttonSelect(thisObj){  
 if (thisObj.attr("class").split(" ").indexOf("selected") == -1){
   $(".selected").removeClass("selected");
   thisObj.addClass("selected");   
 }
}; // /buttonSelect