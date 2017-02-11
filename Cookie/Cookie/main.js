var golds = 0;
var spiders =
    {
        namePrettify : "Spiders",
        name : "spiders",
        number : 0,
        profit : 0.1,
        efficiency : 1,
        efficiencyMax : 25,
        nextCost : 15,
        nextEffCost : 50,
        unlock: true,
        unlockCost:0,
    }

var skeletons = {
    namePrettify : "Skeletons",
    name : "skeletons",
    number : 0,
    profit : 1,
    efficiency : 1,
    efficiencyMax : 25,
    nextCost : 100,
    nextEffCost : 500,
    unlock : false,
    unlockCost:200,
}

var goblins = {
    namePrettify : "Goblins",
    name : "goblins",
    number : 0,
    profit : 8,
    efficiency : 1,
    efficiencyMax : 25,
    nextCost : 1000,
    nextEffCost : 5000,
    unlock : false,
    unlockCost:2000,
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
        skeletons : {
            number : skeletons.number,
            profit : skeletons.profit,
            efficiency : skeletons.efficiency,
            efficiencyMax : skeletons.efficiencyMax,
            nextCost : skeletons.nextCost,
            nextEffCost : skeletons.nextEffCost,
            unlock : skeletons.unlock,
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
        //////////////////////SPIDER
        if (typeof saved.golds !== "undefined") golds = saved.golds;
        if (typeof saved.spiders.number !== "undefined") spiders.number = saved.spiders.number;
        if (typeof saved.spiders.nextCost !== "undefined") spiders.nextCost = saved.spiders.nextCost;
        if (typeof saved.spiders.efficiency !== "undefined") spiders.efficiency = saved.spiders.efficiency;
        if (typeof saved.spiders.nextEffCost !== "undefined") spiders.nextEffCost = saved.spiders.nextEffCost;
        if (typeof saved.spiders.unlock !== "undefined") spiders.unlock = saved.spiders.unlock;

        ////////////////**/GOBLIN
        if (typeof saved.goblins.number !== "undefined") goblins.number = saved.goblins.number;
        if (typeof saved.goblins.nextCost !== "undefined") goblins.nextCost = saved.goblins.nextCost;
        if (typeof saved.goblins.efficiency !== "undefined") goblins.efficiency = saved.goblins.efficiency;
        if (typeof saved.goblins.nextEffCost !== "undefined") goblins.nextEffCost = saved.goblins.nextEffCost;
        if (typeof saved.goblins.unlock !== "undefined") goblins.unlock = saved.goblins.unlock;



        ///////////////////////////SKELETON

        if (typeof saved.skeletons.number !== "undefined") skeletons.number = saved.skeletons.number;
        if (typeof saved.skeletons.nextCost !== "undefined") skeletons.nextCost = saved.skeletons.nextCost;
        if (typeof saved.skeletons.efficiency !== "undefined") skeletons.efficiency = saved.skeletons.efficiency;
        if (typeof saved.skeletons.nextEffCost !== "undefined") skeletons.nextEffCost = saved.skeletons.nextEffCost;
        if (typeof saved.skeletons.unlock !== "undefined") skeletons.unlock = saved.skeletons.unlock;
        //////////////////////////////


        document.getElementById('spiders').innerHTML = prettify(spiders.number);
        document.getElementById('spiderCost').innerHTML = prettify(spiders.nextCost);
        ////
        document.getElementById('goblinCost').innerHTML = prettify(goblins.nextCost);
        document.getElementById('goblins').innerHTML = prettify(goblins.number);
        /////
        document.getElementById('skeletons').innerHTML = prettify(skeletons.number);
        document.getElementById('skeletonCost').innerHTML = prettify(skeletons.nextCost);
        ////

        if (typeof saved.prestige !== "undefined") prestige = saved.prestige;
        document.getElementById('golds').innerHTML = prettify(golds);

    }


    ////////////////UPGRADE
    var elem1 = '<button class="btn btn-info btn-lg extra-lg" id=spidersEffUp onclick=upEff(spiders)> Upgrade Spiders <br/>'+spiders.nextEffCost+' golds</button> ';
    var elem2 = '<button class="btn btn-info btn-lg extra-lg" id=skeletonsEffUp onclick=upEff(skeletons)> Upgrade Skeletons  <br/>'+skeletons.nextEffCost+' golds </button>';
    var elem3 = '<button class="btn btn-info btn-lg extra-lg" id=goblinsEffUp onclick=upEff(goblins)> Upgrade Goblins  <br/>'+goblins.nextEffCost+' golds </button>  ';
    ///////
    ////////////////UNLOCK
    var elem10 = '<button class="btn btn-info btn-lg extra-lg"  id=skeletonsUnlock onclick=unlock(skeletons)> Unlock Skeleton <br/>'+skeletons.unlockCost+' golds  </button>';
    var elem20 = '<button class="btn btn-info btn-lg extra-lg" id=goblinsUnlock onclick=unlock(goblins)> Unlock Goblin <br/>'+goblins.unlockCost+' golds  </button> ';

    //////
    //var elem2 = '<div class="upbar-container"> <div class="upbar" id=spiderEffBar></div></div>';
    $('#upgradesTab').append(elem1,elem2,elem3);
    $('#unlockTab').append(elem10,elem20);
    //var price = spiders.nextCost;

    if(goblins.unlock)
    {
        $("#goblinsUnlock").addClass("invisible");
        $("#goblinsEffUp").removeClass("invisible");
    }
    else
    {
        $("#goblinsUnlock").removeClass("invisible");
        $("#goblinsEffUp").addClass("invisible");
    }

    //////////////////////
    if(skeletons.unlock)
    {
        $("#skeletonsUnlock").addClass("invisible");
        $("#skeletonsEffUp").removeClass("invisible");
    }
    else
    {
        $("#skeletonsUnlock").removeClass("invisible");
        $("#skeletonsEffUp").addClass("invisible");
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

        var nextCost = Math.floor( spiders.nextCost * Math.pow(1.1,spiders.number));       //works out the cost of the next spider
        document.getElementById('spiderCost').innerHTML = nextCost;  //updates the spider cost for the user
        spiders.nextCost = nextCost;
        console.log("Position x");
    };
};





function buySkeleton(){
    if(golds >= skeletons.nextCost){                                   //checks that the player can afford the spider
        skeletons.number= skeletons.number + 1;                                   //increases number of spiders
        golds = golds - skeletons.nextCost;                          //removes the cookies spent
        document.getElementById('skeletons').innerHTML = skeletons.number;  //updates the number of spiders for the user
        document.getElementById('golds').innerHTML = prettify(golds);  //updates the number of cookies for the user

        var nextCost = Math.floor(100 * Math.pow(1.1,skeletons.number));       //works out the cost of the next spider
        document.getElementById('skeletonCost').innerHTML = nextCost;//updates the spider cost for the user
        skeletons.nextCost = nextCost;
    };
}

function buyGoblin(){
    if(golds >= goblins.nextCost){                                   //checks that the player can afford the spider
        goblins.number= goblins.number + 1;                                   //increases number of spiders
        golds = golds - goblins.nextCost;                          //removes the cookies spent
        document.getElementById('goblins').innerHTML = goblins.number;  //updates the number of spiders for the user
        document.getElementById('golds').innerHTML = prettify(golds);  //updates the number of cookies for the user

        var nextCost = Math.floor(1000 * Math.pow(1.1,goblins.number));       //works out the cost of the next spider
        document.getElementById('goblinCost').innerHTML = nextCost;//updates the spider cost for the user
        goblins.nextCost = nextCost;
    };
}

function upEff(monster)
{
    if(golds > monster.nextEffCost)
    {
        if(monster.efficiency<monster.efficiencyMax)
        {
            golds = golds - monster.nextEffCost;
            monster.efficiency=monster.efficiency+2;
            monster.nextEffCost=monster.nextEffCost*2;
            document.getElementById(monster.name+"EffUp").innerHTML = "Upgrade "+monster.namePrettify+" <br />"+ prettify(monster.nextEffCost)+" golds";
            document.getElementById("golds").innerHTML = prettify(golds)
        }

    }
}


function unlock(monster){
    if(golds >= monster.unlockCost)
    {
        monster.unlock = true;
        golds = golds - monster.unlockCost;
        console.log(monster.name+"Unlock");
        $('#'+monster.name+'Unlock').addClass("invisible");
        $('#'+monster.name+'EffUp').removeClass("invisible");
        document.getElementById('golds').innerHTML = prettify(golds);
    }
}



/////* UTILITY */

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

    if ( golds >= spiders.nextCost){
        $("#btnBuySpider").removeClass("disabled");
    }else
        $("#btnBuySpider").addClass("disabled");


    if ( golds >= skeletons.nextCost){
        $("#btnBuySkeleton").removeClass("disabled");
    }else
        $("#btnBuySkeleton").addClass("disabled");


    if ( golds >= goblins.nextCost){
        $("#btnBuyGoblin").removeClass("disabled");
    }else
        $("#btnBuyGoblin").addClass("disabled");


    //////////////////////////////**/
    if ( golds >= spiders.nextEffCost){
        $("#spidersEffUp").removeClass("disabled");
    }else
        $("#spidersEffUp").addClass("disabled");

    if ( golds >= goblins.nextEffCost){
        $("#goblinsEffUp").removeClass("disabled");
    }else
        $("#goblinsEffUp").addClass("disabled");

    if ( golds >= skeletons.nextEffCost){
        $("#skeletonsEffUp").removeClass("disabled");
    }else
        $("#skeletonsEffUp").addClass("disabled");

    /**/
    if ( golds >= goblins.unlockCost){
        $("#goblinsUnlock").removeClass("disabled");
    }else
        $("#goblinsUnlock").addClass("disabled");

    if ( golds >= skeletons.unlockCost){
        $("#skeletonsUnlock").removeClass("disabled");
    }else
        $("#skeletonsUnlock").addClass("disabled");


    /**/
    if (goblins.unlock){
        $("#goblinDiv").removeClass("invisible");
    }
    else
        $("#goblinDiv").addClass("invisible");

    if (skeletons.unlock){
        $("#skeletonDiv").removeClass("invisible");
    }else
        $("#skeletonDiv").addClass("invisible");


    document.getElementById('unlockable').innerHTML="";
    if (!goblins.unlock)
    {
        if(golds >= goblins.unlockCost) { document.getElementById('unlockable').innerHTML="!"; }
    }

    setTimeout(engine,1000/FPS);
}
engine();


$(".nav a").on("click", function(){
    $(".nav").find(".active").removeClass("active");
    $(this).parent().addClass("active");
});