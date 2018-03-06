//url for the warframe api and the requirements for this archive
var url = 'https://ws.warframestat.us/pc';
var http = require('https');
let ordis = require('./ordis');
var finalStr;
var eCycle;
var cCycle;

module.exports = {

	getTime: function(data){

        //http connection
		http.get(url, function(res){
    		var body = '';

        //receiving data
    	res.on('data', function(chunk){
        	body += chunk;
    	});

        //after the end of the stream
    	res.on('end', function(){
        	var response = JSON.parse(body);

            //test if the api says if isDay is true, to get the time more accurate
        	if(response.earthCycle.isDay){
        		eCycle = 'day';
        	}else{
        		eCycle = 'night';
        	}

        	if(response.cetusCycle.isDay){
        		cCycle = 'day';
        	}else{
        		cCycle = 'night';
        	}

            //create the string to return and send it
        	finalStr = 'Earth\' ' + eCycle + ' will end in ' + response.earthCycle.timeLeft + '\n' + 'Cetus\' ' + cCycle + ' will end in ' + response.cetusCycle.timeLeft;

        	data.reply.text(finalStr);

    		});

        //log an error
		}).on('error', function(e){
      		console.log("Got an error: ", e);
		})

	},

    getSortie: function(data){

        http.get(url, function(res){
            var body = '';

        //receiving data
        res.on('data', function(chunk){
            body += chunk;
        });

        res.on('end', function(){
            var response = JSON.parse(body);

            let finalStr = "Time left: " + response.sortie.eta + "\n" + "Defeat " + response.sortie.boss + "'s Forces" + "\n";
            finalStr += "-----" + "\n" + response.sortie.variants[0].node + " Level 50-60" + "\n" + response.sortie.variants[0].missionType + "\n" + response.sortie.variants[0].modifier + "\n";
            finalStr += "-----" + "\n" + response.sortie.variants[1].node + " Level 65-80" + "\n" + response.sortie.variants[1].missionType + "\n" + response.sortie.variants[1].modifier + "\n";
            finalStr += "-----" + "\n" + response.sortie.variants[2].node + " Level 80-100" + "\n" + response.sortie.variants[2].missionType + "\n" + response.sortie.variants[2].modifier;

            data.reply.text(finalStr);

            });

        //log an error
        }).on('error', function(e){
            console.log("Got an error: ", e);
        })

    }

}