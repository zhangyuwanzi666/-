// 目标预约网站的地址
const targetUrl = "https://yuyue.njucm.edu.cn/gym/?code=PNVWtAz-lhkGFiwRs2i9NaeuxUYqLLnX9KJ5rRdtWu0&state=1#/pages/select_place?areaId=1&maxCnt=4&token=20230413153334692hs0ri56f75rjlmf";

// 预约时间段，例如 8-10 表示 8:00 - 10:00
const reserveTime = "19-20";

// 延时执行预约，单位为毫秒
const delayTime = 500;

// 在指定时间执行预约
function scheduleReservation(reserveDateTime) {
  const now = new Date();
  const currentDayOfWeek = now.getDay();

  // 如果是周一则不执行预约
  if (currentDayOfWeek === 1) {
    console.log("今天是周一，不执行预约");
    return;
  }

  // 获取今天日期
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // 如果预约时间早于今天，则预约时间改为明天
  if (reserveDateTime < today) {
    reserveDateTime.setDate(reserveDateTime.getDate() + 1);
  }

  // 计算距离预约时间的延迟时间
  const timeout = reserveDateTime.getTime() - now.getTime();

  setTimeout(function() {
    console.log("开始执行预约");

    // 在目标网站中执行预约逻辑
    doReservation();
  }, timeout);
}

// 执行预约逻辑
function doReservation() {
  // 获取所有场地元素
  let courts = document.querySelectorAll(".court");

  // 遍历所有场地，查找可用的场地
  for (let i = 0; i < courts.length; i++) {
    let court = courts[i];
    let court_status = court.querySelector(".status");
    let court_name = court.querySelector(".name").innerText;
    let court_time = court.querySelector(".time").innerText;

    // 判断场地是否空闲，并且时间段是否符合预约要求
    if (court_status.innerText === "空闲" && court_time === reserveTime) {
      console.log(`找到可用场地 ${court_name}`);

      // 点击预约按钮
      let reserve_button = court.querySelector(".reserve");
      reserve_button.click();

      // 处理确认预约弹窗
      setTimeout(function() {
        let confirm_button = document.querySelector(".van-dialog__confirm");
        confirm_button.click();
        console.log(`已成功预约场地 ${court_name}`);
      }, delayTime);

      return;
    }
  }

  console.log("没有找到可用场地");
}


// 每天早上6:57执行预约
function scheduleDailyReservation() {
  const now = new Date();
  const targetDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 57, 0);

  if (now >= targetDateTime) {
    targetDateTime.setDate(targetDateTime.getDate() + 1);
  }

  const timeout = targetDateTime.getTime() - now.getTime();

  setTimeout(function() {
    console.log("开始执行每日预约");

    // 在指定时间执行预约逻辑
    scheduleReservation(targetDateTime);
  }, timeout);
}

// 开始执行每日预约
scheduleDailyReservation();