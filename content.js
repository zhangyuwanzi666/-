// 当页面加载完成后执行
window.onload = function() {
  // 获取当前时间
  let now = new Date();
  let currentHour = now.getHours();
  let currentMinute = now.getMinutes();
  
  // 获取时间段对应的按钮
  let targetTimes = ["19:00-20:00"];
  let targetIndex = targetTimes.findIndex(function(time) {
    let [startHour, startMinute, endHour, endMinute] = time.split(/[:-]/);
    return (currentHour > startHour || (currentHour == startHour && currentMinute >= startMinute)) &&
           (currentHour < endHour || (currentHour == endHour && currentMinute < endMinute));
  });
  let targetButton = document.querySelector(`a[onclick="onYuyue('3', '${targetIndex+1}');"]`);

  // 如果存在对应的按钮，则点击
  if (targetButton) {
    targetButton.click();
  }
}
