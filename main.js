//ctrl+shift+p 调出命令框
//ctrl+shift+i 开发者工具
//基于控件的操作
// log(text("微信").findOne(5000).click());
// log(className ( "android.widget.ListView").findOne(5000));
// log(className ( "android.widget.ListView").findOne(5000).scrollDown());
// log(className ( "android.widget.ListView").findOne(5000).childCount());

//控件集合

//var 控件对象 = id("com.tencent.mm:id/hg").find();
//var 控件对象 = id("com.tencent.mm:id/ft6").find();
// log(控件对象.size());
// log(控件对象.get(1));
// log(控件对象.get(1).text());
// var t= 控件对象.get(1).text();
// click(t);



// log(控件对象.size());
// 控件对象.forEach(child => {
// log(child.text());
// click(child.text());
// sleep(3000);
// back();
// sleep(2000);
// }) 

//
// threads.start(function(){

//     while(true){
//         if(text('立即开始').findOnce()){
//             text('立即开始').findOnce().click();
//             break;
//         }else{
//             sleep(3000);
//         }
//     }
// })
// // 请求截图
// if(!requestScreenCapture()){
//     toast("请求截图失败");
//     exit();
// }else{
//     log('申请权限成功')
// }

// var img=images.captureScreen();
// sleep(100);
// var yanse=images.pixel(img, 300, 300);
// log(colors.toString(yanse));
//

// app.launch('com.tencent.mm');

//悬浮窗
// var w = floaty.window(
//     <frame gravity="center">
//         <text id="text">悬浮文字</text>
//     </frame>
// );

// setInterval(()=>{}, 1000);

// ui.run(function(){
//     w.text.setText("文本");
//     w.setPosition(500, 500);
// });
// log(textContains('A.').findOne(5000));


// //悬浮窗
// "ui";
// ui.layout(
//     <vertical padding="16">
//         <text textSize="16sp" textColor="black" text="第一延时"/>
//         <input id="sleep1" text="100"/>
//         <text textSize="16sp" textColor="black" text="第2延时"/>
//         <input id="sleep2" text="100"/>
//         <text textSize="16sp" textColor="black" text="相似"/>
        
//         <button id="ok" text="确定"/>
//     </vertical>
// );
var w = floaty.window(
    <vertical gravity="center">
        <button id="text" style="Widget.AppCompat.Button.Colored" text="退出" />
    </vertical>
);
w.setAdjustEnabled(true);
setInterval(() => { }, 1000);
ui.run(function () {
    w.text.setText("自动答题");
    w.setPosition(500, 150);
    w.text.on("click", function () {
        exit();
        toast("程序退出");
        log("程序退出");
    });

});


threads.start(function () {
    while (true) {
        if (text('立即开始').findOnce()) {
            text('立即开始').findOnce().click();
            break;
        } else {
            sleep(800);
        }
        if (text('允许').findOnce()) {
            text('允许').findOnce().click();
            break;
        } else {
            sleep(800);
        }
    }
})
//请求截图
if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
} else {
    log('申请截图权限成功')
    ui.run(function () {
        w.text.setText("申请截图权限成功");
    });
}
var c_img = '';
var b = '';
var x = '';
var y = '';
var r_time = '';
if(files.isFile("/sdcard/config.txt")){
    var c_config=files.read("/sdcard/config.txt");
    c_config=c_config.split('#');
    log(c_config);
}else{
    files.create("/sdcard/config.txt");
    files.write("/sdcard/config.txt","老崔答题配置项#100#100#7");
}
while (true) {
    sleep(200);
    if (textContains('继续答题').findOne(2000)) {
        textContains('继续答题').findOne(2000).click();
        ui.run(function () {
            w.text.setText("点击 继续答题");
            log('点击 继续答题')
        });
        sleep(1000);
        continue;
    }
    if (textContains('选题').findOne(1000)) {
        ui.run(function () {
            w.text.setText("答题中");
            log('答题中')
        });
        r_time = Math.random() * 1 + 1.5;
        sleep(r_time * 1000);
        log("等待" + r_time + '秒');
        if (textContains('A').findOne(2000)) {
            // ui.run(function () {
            //     w.text.setText("发现选项A");
            //     log('发现选项A');
            // });



            // if (!b) {
            //     b = textContains('A').findOne(2000).bounds();
            //     log('选项中心坐标 ' + b.centerX() + ',' + b.centerY());
            // }
            // x = b.centerX() + Math.random() * 400 - 200;
            // y = b.centerY() + 40;
            // log('点击中心坐标 ' + x + ',' + y);


            c_img = images.captureScreen();
            sleep(100);
            var point = images.findColor(c_img, "#74abc6");
            log(point);
            x = point.x + 200;
            y = point.y + 70;
            // if (b.centerX() < 10 || b.centerX() < 10) {
            //     textContains('A').findOne(2000).click()
            // } else {
            click(x, y);
            // }

            //开始截图 查看是否错误
            sleep(c_config[1]);
            c_img = images.captureScreen();
            sleep(c_config[2]);
            //images.save(c_img, '/sdcard/Pictures/test2.jpg');
            var point = images.findColorInRegion(c_img, "#fbe9ea",120,250,device.width-120,device.height-500-250,c_config[3]);
            log(point);
            if (point) {
                log("选项错误 准备选择B");
                click(x, y + 120);
            }
            continue;
        } else {
            ui.run(function () {
                w.text.setText("没有发现选项");
                log('没有发现选项');
            })
            continue;
        }

        if (textContains('A').findOne(2000)) {
            b = textContains('A').findOne(2000).bounds();
            x = b.centerX() + Math.random() * 200 - 100;
            if (b.centerX() < 200) {
                continue;
            }
            y = b.centerY() + Math.random() * 60 - 40;
            log(x);
            log(y);
            press(x, y, Math.random() * 100);
            ui.run(function () {
                w.text.setText("选择A选项");
                log('选择A选项')
            });
            sleep(400);
            c_img = images.captureScreen();
            sleep(200);
            if (images.findColor(c_img, "#E03F4C")) {
                log("选项错误");
                sleep(200);
                if (textContains('B').findOne(2000)) {
                    b = textContains('B').findOne(2000).bounds();
                    x = b.centerX() + Math.random() * 200 - 100;
                    if (b.centerX() < 200) {
                        continue;
                    }
                    y = b.centerY() + Math.random() * 60 - 40;
                    log(x);
                    log(y);
                    press(x, y, Math.random() * 100);
                } else {
                    log(x);
                    log(y);
                    press(x, y + 130, Math.random() * 100);
                }
                c_img = "";
            }
            sleep(1500);
        } else {
            if (textContains('B').findOne(2000)) {
                b = textContains('B').findOne(2000).bounds();
                x = b.centerX() + Math.random() * 200 - 100;
                if (b.centerX() < 200) {
                    continue;
                }
                y = b.centerY() + Math.random() * 60 - 40;
                log(x);
                log(y);
                press(x, y, Math.random() * 100);
                sleep(1500);
            }
        }
        continue;
    } else {
        ui.run(function () {
            w.text.setText("等待答题");
            log('等待答题');
        });
    }

    if (textContains('请选择答题类别').findOne(1000)) {
        ui.run(function () {
            w.text.setText("6秒后 准备开始答题");
            log('6秒后 准备开始答题 ');
        });
        sleep(6000);
        click(w.getX() + 200, w.getY() - 60);
        ui.run(function () {
            w.text.setText("开始答题");
            log('开始答题');
        });
        b = '';
        // sleep(1000);
    }
}
