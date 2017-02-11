var golds = 0;
var spiders =
    {
        name : "spiders",
        number : 0,
        profit : 0.1,
        efficiency : 1,
        efficiencyMax : 25,
        nextCost : 10,
        nextEffCost : 50,
        unlock: true,
        unlockCost:0,
    }

var goblins = {
    name : "goblins",
    number : 0,
    profit : 1,
    efficiency : 1,
    efficiencyMax : 25,
    nextCost : 100,
    nextEffCost : 500,
    unlock : false,
    unlockCost:50,
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
            nextEffCost : spiders.nextEffCost,
            unlock : spiders.unlock,
        },
        goblins : {
            number : goblins.number,
            profit : goblins.profit,
            efficiency : goblins.efficiency,
            efficiencyMax : goblins.efficiencyMax,
            nextCost : goblins.nextCost,
            nextEffCost : goblins.nextEffCost,
            unlock : goblins.unlock,
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
    if(saved)
    {
        if (typeof saved.golds !== "undefined") golds = saved.golds;
        if (typeof saved.spiders.number !== "undefined") spiders.number = saved.spiders.number;
        if (typeof saved.spiders.nextCost !== "undefined") spiders.nextCost = saved.spiders.nextCost;
        if (typeof saved.spiders.efficiency !== "undefined") spiders.efficiency = saved.spiders.efficiency;
        if (typeof saved.spiders.nextEffCost !== "undefined") spiders.nextEffCost = saved.spiders.nextEffCost;
        if (typeof saved.spiders.unlock !== "undefined") spiders.unlock = saved.spiders.unlock;

        if (typeof saved.goblins.number !== "undefined") goblins.number = saved.goblins.number;
        if (typeof saved.goblins.nextCost !== "undefined") goblins.nextCost = saved.goblins.nextCost;
        if (typeof saved.goblins.efficiency !== "undefined") goblins.efficiency = saved.goblins.efficiency;
        if (typeof saved.goblins.nextEffCost !== "undefined") goblins.nextEffCost = saved.goblins.nextEffCost;
        if (typeof saved.goblins.unlock !== "undefined") goblins.unlock = saved.goblins.unlock;

        if (typeof saved.prestige !== "undefined") prestige = saved.prestige;
        document.getElementById('golds').innerHTML = prettify(golds);
        document.getElementById('spiders').innerHTML = prettify(spiders.number);
        document.getElementById('goblins').innerHTML = prettify(goblins.number);
        document.getElementById('spiderCost').innerHTML = prettify(spiders.nextCost);
        document.getElementById('goblinCost').innerHTML = prettify(goblins.nextCost);
    }
    var elem1 = '<button class="btn btn-info btn-lg" id=spidersEffUp onclick=upEff(spiders)> Upgrade Spider <br/>'+spiders.nextEffCost+' golds</button> <br /><br />';
    var elem2 = '<button class="btn btn-info btn-lg" id=goblinsEffUp onclick=upEff(goblins)> Upgrade Goblin  <br/>'+goblins.nextEffCost+' golds </button> <br />';
    var elem3 = '<button class="btn btn-info btn-lg" id=goblinsUnlock onclick=unlock(goblins)> Unlock ??? <br/>'+goblins.unlockCost+' golds  </button> <br />';
    //var elem2 = '<div class="upbar-container"> <div class="upbar" id=spiderEffBar></div></div>';
    $('#upgradesTab').append(elem1,elem2);
    $('#unlockTab').append(elem3);
    //var price = spiders.nextCost;
    if(goblins.unlock) $("#goblinsUnlock").addClass("invisible");else{$("#goblinsUnlock").removeClass("invisible");}

}


function upEff(monster)
{
    if(golds > monster.nextEffCost)
    {
        if(monster.efficiency<monster.efficiencyMax)
        {
            golds = golds - monster.nextEffCost;
            monster.efficiency=monster.efficiency*2;
            monster.nextEffCost=monster.nextEffCost*2;
            document.getElementById("spidersEffUp").innerHTML = "Upgrade "+monster.name+" <br />"+ prettify(monster.nextEffCost);
            document.getElementById("golds").innerHTML = prettify(golds)
        }

    }
}





function monsterClick(number){
    golds = golds + number;
    document.getElementById("golds").innerHTML = prettify(golds)

};




function buySpider(){

    if(golds >= spiders.nextCost){                                   //checks that the player can afford the spider
        spiders.number = spiders.number + 1;                                   //increases number of spiders
        golds = golds - spiders.nextCost;                          //removes the cookies spent
        document.getElementById('spiders').innerHTML = spiders.number;  //updates the number of spiders for the user
        document.getElementById('golds').innerHTML = prettify(golds);  //updates the number of cookies for the user
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,spiders.number));       //works out the cost of the next spider
    document.getElementById('spiderCost').innerHTML = nextCost;  //updates the spider cost for the user
    spiders.nextCost = nextCost;


};


function buyGoblin(){
    if(golds >= goblins.nextCost){                                   //checks that the player can afford the spider
        goblins.number= goblins.number + 1;                                   //increases number of spiders
        golds = golds - goblins.nextCost;                          //removes the cookies spent
        document.getElementById('goblins').innerHTML = goblins.number;  //updates the number of spiders for the user
        document.getElementById('golds').innerHTML = prettify(golds);  //updates the number of cookies for the user
    };
    var nextCost = Math.floor(100 * Math.pow(1.1,goblins.number));       //works out the cost of the next spider
    document.getElementById('goblinCost').innerHTML = nextCost;//updates the spider cost for the user
    goblins.nextCost = nextCost;
};
function unlock(monster){
    if(golds >= monster.unlockCost)
    {
        monster.unlock = true;
        golds = golds - monster.unlockCost;
        $('#'+monster.name+'Unlock').addClass("invisible");
    }
}

function prettify(input){
    var output = input;
    if( output < 99)
    {
        output = Math.round(input * 1000000)/1000000;
    }
    else
    {
        output = Math.round(input);
    }
    return output;
}

window.setInterval(function(){

    monsterClick((spiders.number/10)*spiders.efficiency);
    monsterClick((goblins.number)*goblins.efficiency);


}, 1000);


window.setInterval(function(){

    Save();

}, 60000);


function engine(){

    $("#btnBuyGoblin").addClass("disabled");
    if ( golds >= goblins.nextCost){
        $("#btnBuyGoblin").removeClass("disabled");
    }
    $("#btnBuySpider").addClass("disabled");
    if ( golds >= spiders.nextCost){
        $("#btnBuySpider").removeClass("disabled");
    }

    $("#spidersEffUp").addClass("disabled");
    if ( golds >= spiders.nextEffCost){
        $("#spidersEffUp").removeClass("disabled");
    }
    $("#goblinsEffUp").addClass("disabled");
    if ( golds >= goblins.nextEffCost){
        $("#goblinsEffUp").removeClass("disabled");
    }

    $("#goblinsUnlock").addClass("disabled");
    if ( golds >= goblins.unlockCost){
        $("#goblinsUnlock").removeClass("disabled");
    }

    $("#goblinDiv").addClass("invisible");
    if (goblins.unlock){
        $("#goblinDiv").removeClass("invisible");
    }





    setTimeout(engine,1000/FPS);
}
engine();