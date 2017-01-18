
var app = {}

//app.apiKey = "MDpjMTQzNjhiYy1iN2VhLTExZTYtYTc2Yi1lYjhjN2I4ODBlYWQ6YnpRY3haUzdRZ2FNSmI3Qjdtd2g4VG9ac00wajZhQngzcjRI";

//create a method
app.init = function(){
// .init is a method 

	app.getBooze('vodka');
	// creating a event listener on select element
	$('#subject').on('change', function(){

		var drink = $(this).val(); // getting the value of the #subject
		//console.log(subject);
		$('#booze').empty(); // we want to empty the HTML here and fill with new query
		app.getBooze(drink);
		
	}); //winky frowny neckbeard
};

// Making our Object
//getArt method will make the Ajax request to the API

app.getBooze = function(query,page){ //add page as a parameter
		//need to add query to our function above call here 
	$.ajax({
		url: 'https://lcboapi.com/products',
        headers: { 'Authorization': 'Token MDpjMTQzNjhiYy1iN2VhLTExZTYtYTc2Yi1lYjhjN2I4ODBlYWQ6YnpRY3haUzdRZ2FNSmI3Qjdtd2g4VG9ac00wajZhQngzcjRI' },
		//method: 'GET',
		//dataType:'jsonp',
		data: {
			//key: app.apiKey,
			//format:'jsonp',
			page:page, //lcboapi.com/datasets?page=3 - ADD LATER read docs here https://lcboapi.com/docs/v1/datasets
			q: query
		},
		success: function(response){
			console.log(response);
			app.displayDrink(response.result); //this is the argument (place holder parameter) '.result' is giving us the array
			//if success displayArt goes here
		},
		error: function(error){
			console.log('Something went wrong');
			console.log(error);
		}

	});

}

app.displayDrink = function(bottlesArray){
// forEach loop over array

	bottlesArray.forEach(function(drinkPiece){
		console.log(drinkPiece);
		var producer = $('<p>').text(drinkPiece.producer_name);
		var brand =$('<h2>').addClass('artist').text(drinkPiece.name);
		var image =$('<img class="img-responsive">').attr('src', drinkPiece.image_thumb_url);
		var drinkDetails =$('<div class="description-copy">').text(drinkPiece.description);
		// formatting our price, grabbing our make centsToDollars and attaching it to a varible
		var priceFormatted = app.centsToDollars(drinkPiece.price_in_cents);
		// grabbing the formatted price
		var price =$('<div class="price-copy">').text(priceFormatted);
		//appending Variables together into artPieceHtml
		var buyButton =$('<button class="btn btn-primary">Buy Now</button>;');
		
		var artPieceHtml = $('<div class="col-md-3">').addClass('drink-product').append(producer,brand,image,drinkDetails,price,buyButton);
		
		// appending entire div to our webpage
		$('#booze').append(artPieceHtml); 

	});

};

// make centsToDollars a method of our app, we call it outside of our loop so it does not call it in the loop which is bad for performance
app.centsToDollars = function(cents){
	var dollars = cents / 100;
	var dollarsFormatted = dollars.toLocaleString("en-US", {style:"currency", currency:"USD"});
	return dollarsFormatted;
};


$(function(){
	app.init();
	//starting the app!
});




//$(function() {
//
//    $.ajax({
//        url: 'https://lcboapi.com/stores',
//        headers: { 'Authorization': 'Token MDpjMTQzNjhiYy1iN2VhLTExZTYtYTc2Yi1lYjhjN2I4ODBlYWQ6YnpRY3haUzdRZ2FNSmI3Qjdtd2g4VG9ac00wajZhQngzcjRI' },
//        //method: 'GET',
//        //dataType: 'jsonp'
//    }).done(function (response) {
//        console.log(response);
//    });
//
//});
//
//$(function() {

//    $.ajax({
//        url: 'https://lcboapi.com/products?page=2',
//        headers: { 'Authorization': 'Token MDpjMTQzNjhiYy1iN2VhLTExZTYtYTc2Yi1lYjhjN2I4ODBlYWQ6YnpRY3haUzdRZ2FNSmI3Qjdtd2g4VG9ac00wajZhQngzcjRI' },
//        //method: 'GET',
//        //dataType: 'jsonp'
//    }).done(function (response) {
//        console.log(response);
//    });

//});