var apis = 'YOUR_RIOT_API_KEY_HERE';
var apiKey = '?api_key=' + apis;
var region = 'na1';

var summonerNameINPUT = '';
var summonerNameGET = "";
var summonerLevel;
var summonerID;
var summonerRank;
var summonerDiv;
var summonerSoloLP;

var requested = false;
var urlSummoner = 'https://' + region + '.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + summonerNameINPUT + apiKey;
var urlRank = 'https://' + region + '.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + summonerNameINPUT + apiKey;
const searchInput = document.getElementById("search-input");


const getSummoner = async () => {
	var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    var targetUrl = urlSummoner;

    var requested = false;

    //GETS Summoner Name, Level and ID.
	fetch(proxyUrl + targetUrl).then(blob => blob.json()).then(data => {
	    summonerNameGET = data.name;
	    summonerLevel = data.summonerLevel;
	    summonerID = data.id;
	    requested = true;

	    urlRank = 'https://' + region + '.api.riotgames.com/lol/league/v4/entries/by-summoner/' + summonerID + apiKey;
	    var targetUrl2 = urlRank;

	    document.getElementById("profile-icon-icon").src='http://ddragon.leagueoflegends.com/cdn/9.9.1/img/profileicon/' + data.profileIconId + '.png';

	     //GETS Summoner Rank, Division, LP
	 	fetch(proxyUrl + targetUrl2).then(blob2 => blob2.json()).then(data2 => {

		 	summonerRank = data2[0].tier;
		 	summonerDiv = data2[0].rank;
		 	summonerSoloLP = data2[0].leaguePoints;
		    requested = true;

		    switch(summonerRank) {
		    	case "IRON" :  document.getElementById("profile-rank-icon").src='img/iron.png'; break;
		    	case "BRONZE" :  document.getElementById("profile-rank-icon").src='img/bronze.png'; break;
		    	case "SILVER" :  document.getElementById("profile-rank-icon").src='img/silver.png'; break;
		    	case "GOLD" :  document.getElementById("profile-rank-icon").src='img/gold.png'; break;
		    	case "PLATINUM" :  document.getElementById("profile-rank-icon").src='img/platinum.png'; break;
		    	case "DIAMOND" :  document.getElementById("profile-rank-icon").src='img/diamond.png'; break;
		    	case "MASTER" :  document.getElementById("profile-rank-icon").src='img/master.png'; break;
		    	case "GRANDMASTER" :  document.getElementById("profile-rank-icon").src='img/grandmaster.png'; break;
		    	case "CHALLENGER" :  document.getElementById("profile-rank-icon").src='img/challenger.png'; break;
		    	case "UNRANKED" :  document.getElementById("profile-rank-icon").src='img/unranked.png'; break;
		    	default : document.getElementById("profile-rank-icon").src='img/unranked.png'; break;
		    }

		    console.log(data2);
		   	updateInfo();

		  })
	  	.catch(e => {
		   	console.log("Bad request from Rank");
		   	summonerRank = "- UNRANKED";
		   	summonerDiv = "-";
		   	document.getElementById("profile-rank-icon").src='img/unranked.png';
		   	summonerSoloLP = 0;
		   	updateInfo();
		   	requested = false;
		    return e;
	 	});
	    console.table(data);
	    console.log(region);
	  })
  	.catch(e => {
  		summonerNameGET = "Not found";
  		summonerLevel = 0;
 		updateInfo();
 		alert("ERROR!" + e);
	   	console.log("Bad request from Summoner");
	   	requested = false;
	    return e;
 	});

};

const updateInfo = () => {

	const boardSumName = document.getElementById('summoner-name');
	const boardSumLevel = document.getElementById('summoner-level');
	const boardSumRank = document.getElementById("summoner-rank");

	boardSumName.innerHTML = summonerNameGET;
	boardSumLevel.innerHTML = "Lvl " + summonerLevel;
	boardSumRank.innerHTML = summonerRank + ' ' + summonerDiv + ' ' + summonerSoloLP + ' LP';


};

let setURLS = () => {
	urlSummoner = 'https://' + region + '.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + summonerNameINPUT + apiKey;
};

searchInput.addEventListener('keydown', (e) => {
	if(e.keyCode == 13) {
		summonerNameINPUT = searchInput.value;
		searchInput.value = "";
		region = document.getElementById("region-value").value;
		setURLS();
		getSummoner();
	}
});