
log(id("moneyAval").findOne().text())
log(id("marketValue").findOne().text())

timestamp=(Date.parse(new Date()))/1000
log(timestamp);
exit();

launchApp("Auto.js");
sleep(5000);
var w = floaty.window(
    <vertical gravity="center">
        <button id="text" style="Widget.AppCompat.Button.Colored" text="退出" />
    </vertical>
);
w.setAdjustEnabled(true);
setInterval(() => { }, 1000);
ui.run(function () {
    w.text.setText("退出");
    w.setPosition(400,000);
    w.text.on("click", function () {
        exit();
        toast("程序退出");
        log("程序退出");
    });

});