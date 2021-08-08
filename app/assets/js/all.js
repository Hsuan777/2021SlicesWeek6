$(function () {
  /* 監聽事件 */
  // 在 DOM 結構被完整的讀取跟解析後，執行函式內動作
  document.addEventListener('DOMContentLoaded', () => {
    const swiper = document.querySelector('.swiper');
    // 變更滑鼠游標樣式
    swiper.style.cursor = 'grab';
    // 定義與紀錄目前滑鼠 x y 座標與捲軸拉條至最左側距離
    let pos = { top: 0, left: 0, x: 0, y: 0 };
    const mouseDownHandler = Event => {
      swiper.style.cursor = 'grabbing';
      pos = {
        // 取得元素之 X 軸與最左側與上端距離
        left: swiper.scrollLeft,
        top: swiper.scrollTop,
        // 取得滑鼠目前座標
        x: Event.clientX,
        y: Event.clientY,
      };
      // 當滑鼠按下時，開始監聽滑鼠拖動與放開事件
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    };
    const mouseMoveHandler = Event => {
      // 滑鼠移動距離 = 滑鼠移動時的座標 - 已記錄的滑鼠座標
      let dx = Event.clientX - pos.x;
      let dy = Event.clientY - pos.y;

      // 變更捲軸位置，已記錄的捲軸拉條左邊頂端位置 - 滑鼠移動距離
      // 舉例 : 拉條初始值為 0 ，滑鼠按下往左移動 -50，相對拉條往右移動 +50
      swiper.scrollTop = pos.top - dy;
      swiper.scrollLeft = pos.left - dx;
    };
    const mouseUpHandler = () => {
      swiper.style.cursor = 'grab';
      // 當滑鼠放開時，移除滑鼠移動與放開事件
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
    // 監聽滑鼠按下事件
    swiper.addEventListener('mousedown', mouseDownHandler);
  });
});