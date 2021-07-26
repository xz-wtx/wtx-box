export default (app) => {
  //自定义组件
  app.directive('intInput', {
    updated(el) {
      let ele = el.tagName === 'INPUT' ? el : el.querySelector('input');
      ele.addEventListener('input', () => {
        let temp = ele.value;
        ele.value=temp.replace(/^0|[^\d]/g, '');
      }, {passive: true})
    }
  });
  app.directive('floatInput', {
    updated(el) {
      let ele = el.tagName === 'INPUT' ? el : el.querySelector('input');

      ele.addEventListener('input', () => {
        let temp = ele.value;

        if (!/^[1-9]\d*([.]?\d*)?$/.test(temp)) {
          temp = temp.replace(/(.){1}$/, '');
        }
        temp = temp.replace(/[.](\d{2})\d*/g, '.$1');
        ele.value = temp;

      }, {passive: true})
    }
  })
}
