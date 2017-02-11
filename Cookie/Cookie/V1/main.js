var golds = 0;
var spiders =
{
number : 0,
profit : 0.1,
efficiency : 1,
efficiencyMax : 25,
nextCost : 10,
}

var goblins = {
number : 0,
profit : 1,
efficiency : 1,
efficiencyMax : 25,
nextCost : 100,
}

var prestige = 0;
var FPS=60;
function Save()
{
var save = {
    golds: golds,
    spiders : {
             number : spiders.number,
             profit : spiders.profit,
             efficiency : spiders.efficiency,
             efficiencyMax : spiders.efficiencyMax,
             nextCost : spiders.nextCost,
             },
    goblins : {
                          number : goblins.number,
                          profit : goblins.profit,
                          efficiency : goblins.efficiency,
                          efficiencyMax : goblins.efficiencyMax,
                          nextCost : goblins.nextCost,
                          },
    prestige: prestige,
}
localStorage.setItem("save",JSON.stringify(save));
alert("saved");
}

function Delete()
{
localStorage.removeItem("save")
}

function load()
{
var saved = JSON.parse(localStorage.getItem("save"));
if (typeof saved.golds !== "undefined") golds = saved.golds;


if (typeof saved.spiders.number !== "undefined") spiders.number = saved.spiders.number;
if (typeof saved.spiders.nextCost !== "undefined") spiders.nextCost = saved.spiders.nextCost;
if (typeof saved.spiders.efficiency !== "undefined") spiders.efficiency = saved.spiders.efficiency;

if (typeof saved.goblins.number !== "undefined") goblins.number = saved.goblins.number;
if (typeof saved.goblins.nextCost !== "undefined") goblins.nextCost = saved.goblins.nextCost;
if (typeof saved.goblins.efficiency !== "undefined") goblins.efficiency = saved.goblins.efficiency;

if (typeof saved.prestige !== "undefined") prestige = saved.prestige;
document.getElementById('golds').innerHTML = prettify(golds);
document.getElementById('spiders').innerHTML = prettify(spiders.number);
document.getElementById('goblins').innerHTML = prettify(goblins.number);
document.getElementById('spiderCost').innerHTML = prettify(spiders.nextCost);
document.getElementById('goblinCost').innerHTML = prettify(goblins.nextCost);
var elem1 = '<button id=spiderEffUp onclick=upEff(spiders)> lol </button>';
  var elem2 = '<div class="upbar-container"><div class="upbar" id=spiderEffBar></div></div>';
  $('#upgradesTab').append(elem1,elem2);
  var price = spiders.nextCost;
}








function monsterClick(number){
    golds = golds + number;
    document.getElementById("golds").innerHTML = prettify(golds)
};




function buySpider(){
    var spiderCost = Math.floor(10 * Math.pow(1.1,spiders.number));     //works out the cost of this spider
    if(golds >= spiderCost){                                   //checks that the player can afford the spider
        spiders.number = spiders.number + 1;                                   //increases number of spiders
    	golds = golds - spiderCost;                          //removes the cookies spent
        document.getElementById('spiders').innerHTML = spiders.number;  //updates the number of spiders for the user
        document.getElementById('golds').innerHTML = prettify(golds);  //updates the number of cookies for the user
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,spiders.number));       //works out the cost of the next spider
    document.getElementById('spiderCost').innerHTML = nextCost;  //updates the spider cost for the user
    spiders.nextCost = nextCost;
};


function buyGoblin(){
    var goblinCost = Math.floor(100 * Math.pow(1.1,goblins.number));     //works out the cost of this spider
    if(golds >= goblinCost){                                   //checks that the player can afford the spider
        goblins.number= goblins.number + 1;                                   //increases number of spiders
    	golds = golds - goblinCost;                          //removes the cookies spent
        document.getElementById('goblins').innerHTML = goblins.number;  //updates the number of spiders for the user
        document.getElementById('golds').innerHTML = prettify(golds);  //updates the number of cookies for the user
    };
    var nextCost = Math.floor(100 * Math.pow(1.1,goblins.number));       //works out the cost of the next spider
    document.getElementById('goblinCost').innerHTML = nextCost;//updates the spider cost for the user
    goblins.nextCost = nextCost;
};

/*
function upEff(obj){
  var price = window[obj].effPrice;
  if (money >= price && window[obj].efficiency < window[obj].efficiencyMax){
    money -= price;
    window[obj].effPrice *= 1.1;
    window[obj].efficiency += 0.05;

    var perc = window[obj].efficiency/window[obj].efficiencyMax*100;
    $('#'+obj+"EffBar").html("x"+(Math.round(window[obj].efficiency*100))/100);
    $('#'+obj+"EffBar").css({
      width: perc+"%",
    })
  }
}*/

function prettify(input){
    var output = Math.round(input * 1000000)/1000000;
	return output;
}

window.setInterval(function(){

monsterClick(spiders.number/10);
monsterClick(goblins.number);


}, 1000);



function engine(){


    $('#btnBuyGoblin').css({
        backgroundColor: "transparent",
        opacity: .5,
        pointerEvents: "none",
      })
      if ( golds >= goblins.nextCost){
        $("#btnBuyGoblin").css({

          backgroundColor: "buttonface",
          opacity: 1,
          pointerEvents: "visible",
        })
      }




  setTimeout(engine,1000/FPS);
}
engine();