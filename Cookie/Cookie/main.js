var golds = 200;
var spiders =
    {
        nameSingle : "spider",
        nameSinglePrettify : "Spider",
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
    nameSinglePrettify : "Skeleton",
    nameSingle : "skeleton",
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
    nameSinglePrettify : "Goblin",
    nameSingle : "goblin",
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

var monsterTab = [ spiders , skeletons , goblins];



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
        /*monsterTab.forEach(function(element) {
    console.log(element.name);
            if (typeof saved.element.name.number !== "undefined") element.number = saved.element.number;
            if (typeof saved.element.nextCost !== "undefined") element.nextCost = saved.element.nextCost;
            if (typeof saved.element.efficiency !== "undefined") element.efficiency = saved.element.efficiency;
            if (typeof saved.element.nextEffCost !== "undefined") element.nextEffCost = saved.element.nextEffCost;
            if (typeof saved.element.unlock !== "undefined") element.unlock = saved.element.unlock;

        });*/

        if (typeof saved.golds !== "undefined") golds = saved.golds;
        //////////////////////SPIDER

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


        monsterTab.forEach(function(element) {

            if( element.unlock )
            {
                var elem1 = '<div id= "'+element.nameSingle+'Div">';
                var elem2 = '<button id="btnBuy'+element.namePrettify+'" class="btn btn-primary btn-lg extra-lg" onclick="buyMonster('+element.name+')">Buy '+element.nameSinglePrettify+' </button><br />';
                var elem3 = ''+element.namePrettify+' : <span class="badge" id="'+element.name+'">0</span><br />';
                var elem4 = ''+element.nameSinglePrettify+' Cost : <span class="badge" id="'+element.name+'Cost">'+element.nextCost+'</span><br /><br />';
                $('#interfaceLeft').append(elem1);
                $('#'+element.nameSingle+'Div').append(elem2,elem3,elem4);
            }
            else
            {
                var elem1 = '<div class="invisible" id= "'+element.nameSingle+'Div">';
                var elem2 = '<button id="btnBuy'+element.namePrettify+'" class="btn btn-primary btn-lg extra-lg invisible" onclick="buyMonster('+element.name+')">Buy '+element.nameSinglePrettify+' </button><br />';
                var elem3 = ''+element.namePrettify+' : <span class="badge" id="'+element.name+'">0</span><br />';
                var elem4 = ''+element.nameSinglePrettify+' Cost : <span class="badge" id="'+element.name+'Cost">'+element.nextCost+'</span><br /><br />';
                $('#interfaceLeft').append(elem1);
                $('#'+element.nameSingle+'Div').append(elem2,elem3,elem4);
            }

        });


        monsterTab.forEach(function(element) {

            document.getElementById(''+element.name+'').innerHTML = prettify(element.number);
            document.getElementById(''+element.name+'Cost').innerHTML = prettify(element.nextCost);
        });

        if (typeof saved.prestige !== "undefined") prestige = saved.prestige;
        document.getElementById('golds').innerHTML = prettify(golds);



    }
    else
    {
        monsterTab.forEach(function(element) {

            if( element.unlock )
            {
                var elem1 = '<div id= "'+element.nameSingle+'Div">';
                var elem2 = '<button id="btnBuy'+element.namePrettify+'" class="btn btn-primary btn-lg extra-lg" onclick="buyMonster('+element.name+')">Buy '+element.nameSinglePrettify+' </button><br />';
                var elem3 = ''+element.namePrettify+' : <span class="badge" id="'+element.name+'">0</span><br />';
                var elem4 = ''+element.nameSinglePrettify+' Cost : <span class="badge" id="'+element.name+'Cost">'+element.nextCost+'</span><br /><br />';
                $('#interfaceLeft').append(elem1);
                $('#'+element.nameSingle+'Div').append(elem2,elem3,elem4);
            }
            else
            {
                var elem1 = '<div class="invisible" id= "'+element.nameSingle+'Div">';
                var elem2 = '<button id="btnBuy'+element.namePrettify+'" class="btn btn-primary btn-lg extra-lg" onclick="buyMonster('+element.name+')">Buy '+element.nameSinglePrettify+' </button><br />';
                var elem3 = ''+element.namePrettify+' : <span class="badge" id="'+element.name+'">0</span><br />';
                var elem4 = ''+element.nameSinglePrettify+' Cost : <span class="badge" id="'+element.name+'Cost">'+element.nextCost+'</span><br /><br />';
                $('#interfaceLeft').append(elem1);
                $('#'+element.nameSingle+'Div').append(elem2,elem3,elem4);
            }

        });
    }

    monsterTab.forEach(function(element) {

        var elem = '<br /><button class="btn btn-info btn-lg extra-lg espacebottom" id='+element.name+'EffUp onclick=upEff('+element.name+')> Upgrade '+element.namePrettify+' <br/>'+element.nextEffCost+' golds</button> ';
        $('#upgradesTab').append(elem);
        var elem2 = '<button class="btn btn-info btn-lg extra-lg espacebottom" id='+element.name+'Unlock onclick=unlock('+element.name+')> Unlock '+element.namePrettify+' <br/>'+element.unlockCost+' golds  </button>';
        $('#unlockTab').append(elem2);
    });

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




function buyMonster(monster){

    if(golds >= monster.nextCost){                                   //checks that the player can afford the spider
        monster.number = monster.number + 1;                                   //increases number of monster
        golds = golds - monster.nextCost;                          //removes the cookies spent
        console.log(monster);
        document.getElementById(monster.name).innerHTML = monster.number;  //updates the number of monster for the user
        document.getElementById('golds').innerHTML = prettify(golds);  //updates the number of cookies for the user

        var nextCost = Math.floor( monster.nextCost * 1.2);       //works out the cost of the next spider
        document.getElementById(monster.name+'Cost').innerHTML = nextCost;  //updates the spider cost for the user
        monster.nextCost = nextCost;
    };
};




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



    monsterTab.forEach(function(element) {

        if( golds >= element.nextCost)
        {
            $('#btnBuy'+element.namePrettify+'').removeClass("disabled");
        }
        else
            $('#btnBuy'+element.namePrettify+'').addClass("disabled");


        if(golds >= element.nextEffCost)
        {
            $('#'+element.name+'EffUp').removeClass("disabled");
        }
        else
            $('#'+element.name+'EffUp').addClass("disabled");

        if(golds >= goblins.unlockCost)
        {
            $('#'+element.name+'Unlock').removeClass("disabled");
        }
        else
            $('#'+element.name+'Unlock').addClass("disabled");


        if(golds >= goblins.unlockCost)
        {
            $('#'+element.name+'Unlock').removeClass("disabled");
        }
        else
            $('#'+element.name+'Unlock').addClass("disabled");


        if( element.unlock )
        {
            $('#'+element.nameSingle+'Div').removeClass("disabled");
        }
        else
            $('#'+element.nameSingle+'Div').addClass("disabled");


    });



    document.getElementById('unlockable').innerHTML="";
    if (!goblins.unlock)
    {
        if(golds >= goblins.unlockCost) { document.getElementById('unlockable').innerHTML="!"; }
    }
    if (!skeletons.unlock)
    {
        if(golds >= skeletons.unlockCost) { document.getElementById('unlockable').innerHTML="!"; }
    }
    setTimeout(engine,1000/FPS);
}
engine();


$(".nav a").on("click", function(){
    $(".nav").find(".active").removeClass("active");
    $(this).parent().addClass("active");
});