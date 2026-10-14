let gold = 30;
let incomeMultiplier = 1;
let crisisTurn = 0;
let gemPenalty = 0;
let gemBonus = 0;       //宝石加成
let factoryBonus = 0;   //工厂加成
let incomeBonus = 0;    //全部收益加成
let gameOver = false;
let turn = 1;

let maxTurn = 10;

let bag = [];


// 商品数据库

let items = [

    {
        name:"💎 宝石",
        price:10,
        income:3
    },

    {
        name:"🏭 工厂",
        price:20,
        income:6
    },

    {
        name:"🍀 幸运草",
        price:15,
        income:4
    },

    {
        name:"⚔️ 武器",
        price:25,
        income:8
    }

];


// 当前商店商品

let shopItems = [];



// 随机生成商店

function createShop(){

    shopItems=[];


    while(shopItems.length < 3){

        let random =
        Math.floor(Math.random()*items.length);


        shopItems.push(items[random]);

    }


    showShop();

}



// 显示商店

function showShop(){

    let shop =
    document.getElementById("shop");


    shop.innerHTML="";


    for(let i=0;i<shopItems.length;i++){


        let button =
        document.createElement("button");


        button.innerHTML =
        `
        <div class="itemName">
        ${shopItems[i].name}
        </div>

        <div>
        价格：${shopItems[i].price}
        </div>

        <div>
        收益：${shopItems[i].income}
        </div>
        `;


        button.onclick=function(){

            buy(i);

        };


        shop.appendChild(button);

        shop.appendChild(document.createElement("br"));

    }

}


//购买

function buy(index){


    let item =
    shopItems[index];


    if(gold >= item.price){


        gold -= item.price;

        bag.push(item);
        showBag();


        document.getElementById("gold").innerHTML =
        gold;


        document.getElementById("message").innerHTML =
        "购买了 "+item.name;


    }else{


        document.getElementById("message").innerHTML =
        "金币不足";


    }

}



// 下一回合

function nextTurn(){
    if(gameOver){
        return;
    }
    let income = 0;

    if(crisisTurn > 0){

        crisisTurn--;

        if(crisisTurn == 0){

            incomeMultiplier = 1;

            document.getElementById("message").innerHTML =
            "📈 经济恢复，市场回暖";

        }

    }

    for(let i=0;i<bag.length;i++){

        income += bag[i].income;

    }


    gold += income;


    turn++;


    document.getElementById("gold").innerHTML =
    gold;


    document.getElementById("turn").innerHTML =
    turn;


    document.getElementById("message").innerHTML =
    "本回合获得金币："+income;



    if(turn > maxTurn){

        endGame();

        return;

    }
    randomEvent();

    createShop();

}

let events = [

{
    name:"💎 宝石热潮",
    description:"宝石收益+5",

    effect:function(){

        gemBonus += 5;

    }
},


{
    name:"🏭 工业革命",
    description:"工厂收益+5",

    effect:function(){

        factoryBonus += 5;

    }
},


{
    name:"👥 人口增长",
    description:"所有资产收益+1",

    effect:function(){

        incomeBonus += 1;

    }
},


{
    name:"🎉 商品繁荣",
    description:"立即获得10金币",

    effect:function(){

        gold += 10;

    }
}

];

function showBag(){

    let bagDiv =
    document.getElementById("bag");

    bagDiv.innerHTML="";


    for(let i=0;i<bag.length;i++){

        bagDiv.innerHTML +=
        bag[i].name + "<br>";

    }

}
function randomEvent(){

    let chance = Math.random();


    //30%概率触发

    if(chance < 0.3){


        let index =
        Math.floor(Math.random()*randomEvents.length);


        let event =
        randomEvents[index];


        event.effect();


        document.getElementById("message").innerHTML =
        "⚠️事件："+event.name+
        "<br>"+
        event.description;

    }

}

let randomEvents = [

{
    name:"📉 经济危机",
    description:"本回合所有资产收益减半",

    effect:function(){

        incomeMultiplier = 0.5;
        crisisTurn = 1;
    }
},


{
    name:"💰 市场繁荣",
    description:"获得10金币",

    effect:function(){

        gold += 10;

    }
},


{
    name:"🏭 设备维护",
    description:"工厂维护费用5金币",

    effect:function(){

        gold -= 5;

    }
},


{
    name:"💎 宝石市场崩盘",
    description:"宝石收益降低",

    effect:function(){

        gemPenalty = -3;

    }
}

];


function showEventChoices(){

    let choiceDiv =
    document.getElementById("eventChoice");


    choiceDiv.innerHTML="";


    let choices=[];


    while(choices.length<3){

        let random =
        Math.floor(Math.random()*events.length);


        if(!choices.includes(events[random])){

            choices.push(events[random]);

        }

    }


    for(let i=0;i<choices.length;i++){


        let button =
        document.createElement("button");


        button.innerHTML =
        `
        <div class="eventName">
        ${choices[i].name}
        </div>
        
        <div class="eventDesc">
        ${choices[i].description}
        </div>
        `;


        button.onclick=function(){

            chooseEvent(choices[i]);

        };


        choiceDiv.appendChild(button);

        choiceDiv.appendChild(
            document.createElement("br")
        );

    }

}

function chooseEvent(event){


    event.effect();


    document.getElementById("message").innerHTML =
    "你选择了："+event.name;


    document.getElementById("eventChoice").innerHTML =
    "";

}

function endGame(){

    gameOver = true;


    if(gold >= 130){

        document.getElementById("message").innerHTML =
        "🐉 追龙成功！<br>我砍，我再砍！<br>最终财富："+gold;


    }else{


        document.getElementById("message").innerHTML =
        "💀 失败！<br>要不我再...?<br>最终财富："+gold;


    }


    document.getElementById("shop").innerHTML="";


    document.getElementById("nextButton").style.display="none";


}
// 初始化
showEventChoices();

createShop();