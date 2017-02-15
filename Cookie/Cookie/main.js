var golds = 99999999;
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

var zombies = {
    nameSinglePrettify : "Zombie",
    nameSingle : "zombie",
    namePrettify : "Zombies",
    name : "zombies",
    number : 0,
    profit : 16,
    efficiency : 1,
    efficiencyMax : 25,
    nextCost : 15000,
    nextEffCost : 50000,
    unlock : false,
    unlockCost:20000,
}

var liches = {
    nameSinglePrettify : "Liche",
    nameSingle : "liche",
    namePrettify : "Liches",
    name : "liches",
    number : 0,
    profit : 32,
    efficiency : 1,
    efficiencyMax : 25,
    nextCost : 150000,
    nextEffCost : 500000,
    unlock : false,
    unlockCost:200000,
}

var monsterTab = [ spiders , skeletons , goblins , zombies , liches ];



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
        zombies : {
            number : zombies.number,
            profit : zombies.profit,
            efficiency : zombies.efficiency,
            efficiencyMax : zombies.efficiencyMax,
            nextCost : zombies.nextCost,
            nextEffCost : zombies.nextEffCost,
            unlock : zombies.unlock,
        },
        liches : {
            number : liches.number,
            profit : liches.profit,
            efficiency : liches.efficiency,
            efficiencyMax : liches.efficiencyMax,
            nextCost : liches.nextCost,
            nextEffCost : liches.nextEffCost,
            unlock : liches.unlock,
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
        monsterTab.forEach(function(element) {
    console.log(element.name);
    console.log(saved);
            if(saved[element.name]) {
                if (typeof saved[element.name].number !== "undefined") element.number = saved[element.name].number;
                if (typeof saved[element.name].nextCost !== "undefined") element.nextCost = saved[element.name].nextCost;
                if (typeof saved[element.name].efficiency !== "undefined") element.efficiency = saved[element.name].efficiency;
                if (typeof saved[element.name].nextEffCost !== "undefined") element.nextEffCost = saved[element.name].nextEffCost;
                if (typeof saved[element.name].unlock !== "undefined") element.unlock = saved[element.name].unlock;
            }
            else
            {
                console.log("new contenu");
            }
        });

        if (typeof saved.golds !== "undefined") golds = saved.golds;

        monsterTab.forEach(function(element) {

            if( element.unlock )
            {
                var elem1 = '<div id= "'+element.nameSingle+'Div">';
                var elem2 = '<button id="btnBuy'+element.namePrettify+'" class="btn btn-primary btn-lg extra-lg" onclick="buyMonster('+element.name+')">Buy '+element.nameSinglePrettify+' </button><br />';
                var elem3 = ''+element.namePrettify+' : <span class="badge" id="'+element.name+'">0</span><br /><br />';
                //var elem4 = ''+element.nameSinglePrettify+' Cost : <span class="badge" id="'+element.name+'Cost">'+element.nextCost+'</span><br /><br />';
                $('#interfaceLeft').append(elem1);
                $('#'+element.nameSingle+'Div').append(elem2,elem3);
            }
            else
            {
                var elem1 = '<div class="invisible" id= "'+element.nameSingle+'Div">';
                var elem2 = '<button id="btnBuy'+element.namePrettify+'" class="btn btn-primary btn-lg extra-lg invisible" onclick="buyMonster('+element.name+')">Buy '+element.nameSinglePrettify+' </button><br />';
                var elem3 = ''+element.namePrettify+' : <span class="badge" id="'+element.name+'">0</span><br /><br />';
               //var elem4 = ''+element.nameSinglePrettify+' Cost : <span class="badge" id="'+element.name+'Cost">'+element.nextCost+'</span><br /><br />';
                $('#interfaceLeft').append(elem1);
                $('#'+element.nameSingle+'Div').append(elem2,elem3);
            }
            var test = '<br /><img src="piece.png" alt="golds" height="20" width="20">  <span id="'+element.name+'Cost">'+element.nextCost+'</span> ';
            $('#btnBuy'+element.namePrettify+'').append(test);


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
                var elem3 = ''+element.namePrettify+' : <span class="badge" id="'+element.name+'">0</span><br /><br />';
                //var elem4 = ''+element.nameSinglePrettify+' Cost : <span class="badge" id="'+element.name+'Cost">'+element.nextCost+'</span><br /><br />';
                $('#interfaceLeft').append(elem1);
                $('#'+element.nameSingle+'Div').append(elem2,elem3);
            }
            else
            {
                var elem1 = '<div class="invisible" id= "'+element.nameSingle+'Div">';
                var elem2 = '<button id="btnBuy'+element.namePrettify+'" class="btn btn-primary btn-lg extra-lg invisible" onclick="buyMonster('+element.name+')">Buy '+element.nameSinglePrettify+' </button><br />';
                var elem3 = ''+element.namePrettify+' : <span class="badge" id="'+element.name+'">0</span><br /><br />';
                //var elem4 = ''+element.nameSinglePrettify+' Cost : <span class="badge" id="'+element.name+'Cost">'+element.nextCost+'</span><br /><br />';
                $('#interfaceLeft').append(elem1);
                $('#'+element.nameSingle+'Div').append(elem2,elem3);


            }
            var test = '<br /><img src="piece.png" alt="golds" height="20" width="20">  <span id="'+element.name+'Cost">'+element.nextCost+'</span>';
            $('#btnBuy'+element.namePrettify+'').append(test);

        });
    }



    monsterTab.forEach(function(element) {

        var elem = '<button class="btn btn-info btn-lg extra-lg espacebottom" id='+element.name+'EffUp onclick=upEff('+element.name+')> Upgrade '+element.namePrettify+' <br/>'+element.nextEffCost+' golds</button> ';
        $('#upgradesTab').append(elem);
        var elem2 = '<button class="btn btn-info btn-lg extra-lg espacebottom" id='+element.name+'Unlock onclick=unlock('+element.name+')> Unlock '+element.namePrettify+' <br/>'+element.unlockCost+' golds  </button>';
        $('#unlockTab').append(elem2);
    });



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
            monster.efficiency=monster.efficiency+0.5;
            monster.nextEffCost=monster.nextEffCost*2;
            document.getElementById(monster.name+"EffUp").innerHTML = "Upgrade "+monster.namePrettify+" <br />"+ prettify(monster.nextEffCost)+" golds";
            document.getElementById("golds").innerHTML = prettify(golds)
        }

    }
}

function downEff(monster)
{

        if(monster.efficiency>1)
        {
            monster.efficiency=monster.efficiency-0.5;
            monster.nextEffCost=monster.nextEffCost/2;
            document.getElementById(monster.name+"EffUp").innerHTML = "Upgrade "+monster.namePrettify+" <br />"+ prettify(monster.nextEffCost)+" golds";
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
    monsterClick((skeletons.number)*skeletons.efficiency);
    monsterClick((goblins.number)*goblins.efficiency*8);



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

        if(golds >= element.unlockCost)
        {
            $('#'+element.name+'Unlock').removeClass("disabled");
        }
        else
            $('#'+element.name+'Unlock').addClass("disabled");


        if(golds >= element.unlockCost)
        {
            $('#'+element.name+'Unlock').removeClass("disabled");
        }
        else
            $('#'+element.name+'Unlock').addClass("disabled");


        if( element.unlock )
        {
            $('#'+element.nameSingle+'Div').removeClass("invisible");
        }
        else
            $('#'+element.nameSingle+'Div').addClass("invisible");


        if(element.unlock)
        {
            $('#'+element.name+'Unlock').addClass("invisible");
            $('#'+element.name+'EffUp').removeClass("invisible");
            $('#btnBuy'+element.namePrettify+'').removeClass("invisible");
        }
        else
        {
            $('#'+element.name+'Unlock').removeClass("invisible");
            $('#'+element.name+'EffUp').addClass("invisible");
            $('#btnBuy'+element.namePrettify+'').addClass("invisible");
        }

    });


    monsterTab.forEach(function(element) {

        document.getElementById('unlockable').innerHTML="";
        if (!element.unlock)
        {
            if(golds >= element.unlockCost) { document.getElementById('unlockable').innerHTML="!"; }
        }
    });


    document.getElementById('titletext').innerHTML= ""+prettify(golds)+" golds - Idle Game";
    setTimeout(engine,1000/FPS);
}
engine();




$(".nav a").on("click", function(){
    $(".nav").find(".active").removeClass("active");
    $(this).parent().addClass("active");
});