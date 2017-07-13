    var config = {
    apiKey: "AIzaSyB6p3dOXyEWZDIwMSUOTEej-6cSaPlE8LI",
    authDomain: "awesomeness-a47d9.firebaseapp.com",
    databaseURL: "https://awesomeness-a47d9.firebaseio.com",
    projectId: "awesomeness-a47d9",
    storageBucket: "awesomeness-a47d9.appspot.com",
    messagingSenderId: "154832084236"
    };

    firebase.initializeApp(config);

// Assign the reference to the database to a variable named 'database'
var database = firebase.database(); 

//initialize variables
var p1 = {
	win: 0,
	loss: 0,
	tie: 0
}
var p2 = {
	win: 0,
	loss: 0,
	tie: 0
}
var player1 = "";
var player2 = "";

var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");

connectedRef.on("value",function(snap){
	if (snap.val()){
		var con = connectionsRef.push(true);
		con.onDisconnect().remove();
	}
});

connectionsRef.on("value", function(snap) {
	console.log(snap.numChildren());
})

database.ref("/player1").on("value", function (snapshot) {

	console.log(snapshot.val());
})

database.ref().on("value", function(snapshot){

	player1 = snapshot.val().player1;
		$("#player1-name").html($("<h1>" + snapshot.val().player1 + "</h1>"));
	
	player2 = snapshot.val().player2;	
		$("#player2-name").html($("<h1>" + snapshot.val().player2 + "</h1>"));
	
	console.log(snapshot.val().player1);
	console.log(snapshot.val().player2);


})



$("#submit-name").on("click", function (){

	event.preventDefault();

	player1 = $("#player-name").val().trim();
	$("#player-name").val("");
	$("#player1-name").html($("<h1>" + player1 + "</h1>"));
	database.ref().set({
	player1: player1});

	player2 = $("#player-name").val().trim();
	$("#player-name").val("");
	$("#player2-name").html($("<h1>" + player2 + "</h1>"));
	database.ref().set({
	player2: player2});
	

	console.log(player1);
	console.log(player2);
})
