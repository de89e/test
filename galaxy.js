// // var 所有答案 = textStartsWith("A.").find();
// // var 所有答案_数组 = [];
// // 所有答案.forEach(child => {
// //     所有答案_数组.push(child.text());
// //     log(所有答案_数组);
// // });
// // while(true){
// //     sleep(100);
// //     if(textContains("1/5").findOne(2000)){
// //         log("第一题");
// //         log(所有答案_数组[1]);
// //     }
// //     if(textContains("2/5").findOne(2000)){
// //         log("第2题");
// //         log(所有答案_数组[2]);
// //     }

// // }
// //请求截图
// if (!requestScreenCapture()) {
//     toast("请求截图失败");
//     exit();
// } else {
//     log('申请截图权限成功')
// }
// log(device.width);
// log(device.height-500);
// c_img = images.captureScreen();
// sleep(100);
// var point = images.findColorInRegion(c_img, "#fbe9ea",120,250,device.width-120,device.height-500-250,4);
// log(point);
// if(files.isFile("/sdcard/config.txt")){
//     var c_config=files.read("/sdcard/config.txt");
//     c_config=c_config.split('#');
//     log(c_config[0]);
// }else{
//     files.create("/sdcard/config.txt");
//     files.write("/sdcard/config.txt","答题配置项#100#100#7");
// }
// launchApp('中国银河证券');
//text('解锁交易').findOnce().click();
// text('请输入交易密码').findOnce().click();

// id("sellBtn").findOne().click();
// text('场内基金').findOnce().parent().click();
// text('基金申购').findOnce().parent().click();
// text('基金赎回').findOnce().parent().click();
//请求截图
// var w = floaty.window(
//     <vertical gravity="center">
//         <button id="text" style="Widget.AppCompat.Button.Colored" text="退出" />
//     </vertical>
// );
// w.setAdjustEnabled(true);
// setInterval(() => { }, 1000);
// ui.run(function () {
//     w.text.setText("自动答题");
//     w.setPosition(600, 150);
//     w.text.on("click", function () {
//         exit();
//         toast("程序退出");
//         log("程序退出");
//     });

// });
var responseFlagLocal = "";
//等待得操作
var operateArray = [];
//已操作过得动作 获得得等待的操作可能包含执行过得动作 所以 等待得操作减去已操作过得动作 就避免重复下单
var theOperatedArray = [];

//全局 可用金额 用于判断是否可以 买入 和做 逆回购
var v_balance = "";
var v_stockVal = "";
//上一次保持在线时间戳
var v_lastOnlineTimestamp = 0;

function buyStock(stockCode, buyQuantity, buyPrice) {
    id("buyBtn").text('买入').findOne().click();
    sleep(1000)
    id("stockNameCode").findOne().click();
    sleep(1000)
    setText(stockCode);
    sleep(2000)
    // id("inputEt").className("android.widget.EditText").text("委托数量").findOne().click();

    //选择市场

    if (id('titleTv').text('选择市场').exists()) {
        id("textView").textContains('LOF').findOne().click();
        sleep(1000);
    }
    if (arguments.length == 3) {
        //买入价格
        setText(0, buyPrice);
    }
    //买入数量
    setText(1, buyQuantity);
    sleep(1000);
    id("order").findOne().click();
    sleep(1000);
    id("okBtn").findOne().click();
    sleep(2000);
    id("okBtn").findOne().click();
}

function sellStock(stockCode, sellQuantity, sellPrice) {
    id("sellBtn").text('卖出').findOne().click();
    sleep(1000)
    id("stockNameCode").findOne().click();
    sleep(1000)
    setText(stockCode);
    sleep(2000)
    // id("inputEt").className("android.widget.EditText").text("委托数量").findOne().click();

    //选择市场

    if (id('titleTv').text('选择市场').exists()) {
        id("textView").textContains('LOF').findOne().click();
        sleep(1000);
    }


    if (arguments.length == 3) {
        //买入价格
        setText(0, sellPrice);
    }
    //买入数量
    setText(1, sellQuantity);
    sleep(1000);
    id("order").findOne().click();
    sleep(1000);
    id("okBtn").findOne().click();
    sleep(2000);
    id("okBtn").findOne().click();
}

function subscriptionStock(stockCode, amounts) {
    text('基金申购').findOnce().parent().click();
    sleep(500)
    id("stockCodeName").findOne().click();
    sleep(500)
    //股票代买
    setText(stockCode);
    sleep(500);
    //申购金额
    setText(amounts);
    sleep(500);
    id("order").findOne().click();
    sleep(2000)
    id("acceptedCb").findOne().click();
    sleep(300)
    id("okBtn").findOne().click();
    sleep(2000)
    id("acceptedCb").findOne().click();
    sleep(300)
    id("okBtn").findOne().click();
    sleep(2000)
    id("acceptedCb").findOne().click();
    sleep(300)
    id("okBtn").findOne().click();
    sleep(2000)
    //id("cancelBtn").findOne().click();
    sleep(2000)
    id("okBtn").findOne().click();
    sleep(2000)
    id("okBtn").findOne().click();
}

function redemptionStock(stockCode, redemptionQuantity) {
    text('基金赎回').findOnce().parent().click();
    sleep(500)
    id("stockCodeName").findOne().click();
    sleep(500)
    //股票代码
    setText(stockCode);
    sleep(500);
    //赎回份额
    setText(redemptionQuantity);
    sleep(300);
    id("order").findOne().click();
    sleep(2000);
    id("okBtn").findOne().click();
    sleep(2000);
    id("okBtn").findOne().click();
}
function tradePage() {
    id("textView").className("android.widget.TextView").text("交易").findOnce().parent().parent().click();
}
function homePage() {
    id("textView").className("android.widget.TextView").text("首页").findOnce().parent().parent().click();
}
function marketPage() {
    id("textView").className("android.widget.TextView").text("行情").findOnce().parent().parent().click();
}
function keepStats() {
    backToTradePage()
    // id('zcqjLink').text('资产全景').findOnce().parent().click();
    //tradePage();
    try {

        now_timestamp = (Date.parse(new Date())) / 1000;
        if ((now_timestamp - v_lastOnlineTimestamp) > 60) {
            v_lastOnlineTimestamp = now_timestamp;
            v_balance = id("moneyAval").findOne().text();
            v_balance = v_balance.replace(',', '');
            sleep(100);
            v_stockVal = id("marketValue").findOne().text()
            v_stockVal = v_stockVal.replace(',', '');
            sleep(100);
            id('zcqjLink').text('资产全景').findOnce().click();
        } else {
            log("等待")
            if (id('contentTv').textContains('http').exists()) {
                id("okBtn").findOne().click();
                sleep(1000);
            }
            //marketPage();
            //sleep(1500);
            //tradePage();
        }
    } catch (err) {
        log('发生错误 KEEP STATS ');
    }

    sleep(2000);
    backToTradePage()
}
function backToTradePage() {
    while (1) {
        sleep(1000);
        back();
        if (text('您是否要退出?').findOnce()) {
            id("cancelBtn").findOne().click();
            break;
        }
        if (id('contentTv').textContains('http').exists()) {
            id("okBtn").findOne().click();
            sleep(1000);
            continue;
        }
    }
}
// className("android.widget.ScrollView").findOne().scrollForward()
function exchangeFund() {
    // homePage();
    // sleep(2000);
    tradePage();
    sleep(1000);
    // while(1){
    //     className("android.widget.ScrollView").findOne().scrollBackward();
    //     sleep(1000);
    //     if(id('name').className('android.widget.TextView').text('场内基金').exists()){
    //         className("android.widget.ScrollView").findOne().scrollBackward();
    //         break;
    //     }
    // }
    id('name').className('android.widget.TextView').text('场内基金').findOnce().parent().click();
}
function getOperate() {
    // log("http get");
    try {
        var v_url = "http://192.168.2.2:888/?balance=" + v_balance + "&" + "stock=" + v_stockVal;
        log(v_url);
        var res = http.get(v_url);
        res = res.body.string();
        res = JSON.parse(res);
        if (responseFlagLocal != res.flag) {
            for (item in res.operate) {
                // log(res.operate[item]);
                operateArray.push(res.operate[item]);
            }
            responseFlagLocal = res.flag;
            operateArray = arraySub(operateArray, theOperatedArray)
        }
    } catch (err) {
        log("从服务器获取数据错误！");
    }

}
function arraySub(array1, array2) {
    for (var i = array2.length - 1; i >= 0; i--) {
        theFindItem = array2[i];
        for (var j = array1.length - 1; j >= 0; j--) {
            theItem = array1[j];
            if (theItem == theFindItem) {
                array1.splice(j, 1);
            }
        }
    }
    return array1;
}
// arr=['1','2','2','1','2','3','4'];
// arr2=['1','2'];
// log(arraySub(arr,arr2));
// exit();
while (true) {
    if (operateArray.length > 0) {
        theOperate = operateArray.shift();
        theOperateItemArray = theOperate.split('|');

        if (theOperateItemArray[0] == 'ping' || theOperateItemArray[0] == 'exit') {

        } else {
            theOperatedArray.push(theOperate);
        }
        log("do:" + theOperate);
        switch (theOperateItemArray[0]) {
            case "buyStock":
                if (theOperateItemArray.length == 3) {
                    buyStock(theOperateItemArray[1], theOperateItemArray[2]);
                    backToTradePage();

                }
                if (theOperateItemArray.length == 4) {
                    buyStock(theOperateItemArray[1], theOperateItemArray[2], theOperateItemArray[3]);
                    backToTradePage();
                }
                break;
            case "sellStock":
                if (theOperateItemArray.length == 3) {
                    sellStock(theOperateItemArray[1], theOperateItemArray[2]);
                    backToTradePage();
                }
                if (theOperateItemArray.length == 4) {
                    sellStock(theOperateItemArray[1], theOperateItemArray[2], theOperateItemArray[3]);
                    backToTradePage();
                }
                break;
            case "subscriptionStock":
                exchangeFund();
                sleep(1000);
                subscriptionStock(theOperateItemArray[1], theOperateItemArray[2]);
                backToTradePage();
                break;
            case "redemptionStock":
                exchangeFund();
                sleep(1000);
                redemptionStock(theOperateItemArray[1], theOperateItemArray[2]);
                backToTradePage();
                break;
            case "exit":
                exit();
                break;
            case "ping":
                log("pong");
                log("init");
                //等待得操作
                var operateArray = [];
                //已操作过得动作 获得得等待的操作可能包含执行过得动作 所以 等待得操作减去已操作过得动作 就避免重复下单
                var theOperatedArray = [];
                break;

        }
    } else {
        getOperate();
        keepStats();
    }

}