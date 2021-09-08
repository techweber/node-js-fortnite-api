var express = require("express");
var app = new express();
var app_port = 3000;

app.listen(app_port, function(){
	console.log("Server is running at port : " + app_port );
});

app.get('/',function(req,res){
	res.send("WELCOME TO FORTNITE APIs DATA APP");
});

app.get('/brmap',function(req,res){
	const fetch = require("node-fetch");
	fetch("https://fortnite-api.com/v1/map")
		.then( res => res.json() )
		.then( json => showBRMAP(json, res));
});

app.get('/news',function(req,res){
	const fetch = require("node-fetch");
	fetch("https://fortnite-api.com/v2/news")
		.then( res => res.json() )
		.then( json => showNEWS(json, res));
});

function showBRMAP(data, res){

	data = data.data;

	var htmlBody = `
					<html><body><h2>BR MAP Data Fortnite </h2>
					<br/>
					<p>BLANK</p>
					<img src="${data.images.blank}" />
					<br/>
					<p>POIS</p>
					<img src="${data.images.pois}" />
					<br/>
				`;

	count = 1;

	for(var rec in data.pois){

		htmlBody += `<br/>
					<hr/>
					<p> ID: ${data.pois[rec].id} </p>
					<p> Name: ${data.pois[rec].name} </p>
					<p> Location: ${data.pois[rec].location.x}, ${data.pois[rec].location.y}, ${data.pois[rec].location.z} </p>
					`;
		count++;
		if(count > 5){
			break;
		}
	}

	htmlBody += `</body></html>`;
	res.send(htmlBody);
}


function showNEWS(data, res){

	data = data.data;

	var htmlBody = `
					<html><body><h2>Fortnite NEWS </h2>
					<br/>
				`;

	var count = 1;
	for(var record in data.br.motds){

		htmlBody += `<br/>
					<hr/>
					<p> Title: ${data.br.motds[record].title} </p>
					<p> Tab Title: ${data.br.motds[record].tabTitle} </p>
					<p> Body : ${data.br.motds[record].body} </p>
					<p> Image : <img src="${data.br.motds[record].image}" /> </p>
					<p> Title Image : ${data.br.motds[record].titleImage} </p>
					`;

		count++;
		if(count > 10){
			break;
		}

	}

	htmlBody += `</body></html>`;
	res.send(htmlBody);
}
