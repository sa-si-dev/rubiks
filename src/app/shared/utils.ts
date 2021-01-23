const rotateNotaionsMapping: any = {
  1: {
    'F': 'R',
    'R': 'B',
    'L': 'F',
    'M': 'S',
  },
  2: {
    'F': 'B',
    'R': 'L',
    'L': 'R',
    'M': 'Mi',
  },
  3: {
    'F': 'L',
    'R': 'F',
    'L': 'B',
    'M': 'Si',
  }
};

export class Utils {
  static getMatrixRotateMapping() {
    let rows: any[] = [];

    for (let i = -1; i < 2; i++) {
      let cols = [];
      
      for (let j = -1; j < 2; j++) {
        cols.push(`${i} ${j}`);
      }
      
      rows.push(cols);
    }

    return {
      normal: Utils.flattenArray(rows),
      clockwise: Utils.flattenArray(rows.map((row, i) => rows.map(row => row[i]).reverse())),
      antiClockwise: Utils.flattenArray(rows.map((row, i) => rows.map(row => row[i])).reverse())
    };
  }

  static flattenArray(array: any[]) {
    let result = [];

    for (let i = 0; i < array.length; ++i) {
      let current = array[i];

      if (Array.isArray(current)) {
        for (let j = 0; j < current.length; ++j) {
          result.push(current[j]);
        }
      } else {
        result.push(current);
      }
    }

    return result;
  }

  static inverseNotation(notation: string = '') {
    if (notation) {
      notation = notation.toUpperCase();
      notation = notation.indexOf('I') === -1 ? (notation + 'I') : notation.replace('I', '')
    }

    return notation;
  }

  static getNotationsHtml(notations: string) {
    let html = '';
    let notaitonsArray = notations.split(',');

    notaitonsArray.forEach((d, i) => {
      let eleClass = i === 0 ? 'active' : '';

      d = d.trim();
      html += `<span class="${eleClass}">${d}</span>`;
    });

    return html;
  }

  static setSliderWidth() {
    let $sliderWrapper = document.querySelector('.slider-wrapper');
    let $sliderContainer: any = $sliderWrapper?.querySelector('.slider-container');
    let $slideItems = $sliderWrapper?.querySelectorAll('.slider-item');
    let width = $sliderWrapper?.clientWidth || 0;
    let length = $slideItems ? $slideItems.length : 1;
    let glutter = 80;
    let itemWidth =  width - glutter;

    $slideItems?.forEach((ele: any) => {
      ele.style.width = itemWidth + 'px';
    });

    /* 20 - margin left and right */
    $sliderContainer.style.width = ((itemWidth + 20) * length) + 60 + 'px';
  }

  static getActiveSlider() {
    let $sliderWrapper = document.querySelector('.slider-wrapper');
    let $slideItems = $sliderWrapper?.querySelectorAll('.slider-item');
    let width = $sliderWrapper?.clientWidth || 1;
    let scrollLeft = $sliderWrapper?.scrollLeft || 0;
    let activeIndex = Math.round(scrollLeft / (width - 60));
    let $activeItem: any = $slideItems ? $slideItems[activeIndex] : null;

    if ($activeItem && !$activeItem.classList.contains('active')) {
      $slideItems?.forEach((ele: any) => {
        ele.classList.remove('active');
      });

      $activeItem.classList.add('active');
      return $activeItem;
    }
  }

  static togglePopover(e: any, show: any = null) {
    let ele = e.currentTarget.closest('.popover-container');
    
    if (ele.classList.contains('active')) {
      Utils.hidePopover();
    } else {
      Utils.showPopover(ele);
    }
  }

  static showPopover(ele: any) {
    ele.classList.add('active');
    setTimeout(() => { ele.querySelector('.popover-box').classList.add('show-animation'); }, 1);
  }

  static hidePopover() {
    let ele: any = document.querySelector('.popover-container.active');

    if (ele) {
      ele.querySelector('.popover-box').classList.remove('show-animation');
      setTimeout(() => { ele.classList.remove('active'); }, 400);
    }
  }

  static showModal(id: string) {
    let ele: any = document.getElementById(id);

    ele.classList.add('active');
    setTimeout(() => { ele.querySelector('.modal-container').classList.add('show-animation'); }, 1);
  }

  static hideModal(id: string) {
    let ele: any = document.getElementById(id);
    
    ele.querySelector('.modal-container').classList.remove('show-animation');
    setTimeout(() => { ele.classList.remove('active'); }, 400);
  }

  static initMoreShadow(elems: any) {
    /* if single element is given */
    if (elems.length === undefined) {
      elems = [elems];
    }
    
    elems.forEach((elem: any) => {
      let content = elem.querySelector('.more-shadow-content');
      
      content.removeEventListener('scroll', Utils.onMoreShadowScroll);
      content.addEventListener('scroll', Utils.onMoreShadowScroll);
      
      Utils.onMoreShadowScroll({target: content});
    });
  }

  static freezePage(button: any = null) {
    Utils.addButtonLoader(button);
    document.querySelector('#page-freeze')?.classList.add('active');
  }

  static unfreezePage(button: any = null) {
    Utils.removeButtonLoader(button);
    document.querySelector('#page-freeze')?.classList.remove('active');
  }

  static addButtonLoader(button: any = null) {
    if (button) {
      button.classList.add('processing');
    }
  }

  static removeButtonLoader(button: any = null) {
    if (button) {
      button.classList.remove('processing');
    }
  }
  
  static onMoreShadowScroll(e: any) {
    let elem = e.target;
    let container = elem.closest('.more-shadow-container');
    let viewHeight = elem.clientHeight;
    let contentHeight = elem.scrollHeight;
    let scrollTop = elem.scrollTop;
    
    if (contentHeight > (viewHeight + scrollTop)) {
      container.classList.add('has-bottom-shadow');
    } else {
      container.classList.remove('has-bottom-shadow');
    }
    
    if (scrollTop && contentHeight > viewHeight) {
      container.classList.add('has-top-shadow');
    } else {
      container.classList.remove('has-top-shadow');
    }
  }

  static onAppClick(e: any) {
    let ele = e.target;

    if (!ele.closest('.popover-container')) {
      Utils.hidePopover();
    }

    if (ele.closest('.modal-close-button')) {
      Utils.hideModal(ele.closest('.modal-close-button').closest('.modal-wrapper').getAttribute('id'));
    }
  }

  static playRubiksSound(soundSpeed = 1) {
    if (localStorage.getItem('soundStatus') !== 'disabled') {
      let audioEle: any = document.getElementById('rubiks-audio');
      
      audioEle.pause();
      audioEle.currentTime = 0;
      audioEle.playbackRate = soundSpeed;
      audioEle.play();
    }
  }

  static getTimerText(time: number) {
    let min = time >= 60000 ? Math.floor(time / 60000) : 0;
    let sec = time >= 1000 ? Math.floor(time % 60000 / 1000) : 0;
    let mSec = time % 1000 / 10;

    let prependZero = function(n: number) {
      return n < 10 ? ('0' + n) : n;
    }

    return `${prependZero(min)}:${prependZero(sec)}:${prependZero(mSec)}`;
  }

  static getRandomNotaions(allFaces: boolean = false) {
    let notations = ['F', 'R', 'L', 'U', 'D', 'Fi', 'Ri', 'Li', 'Ui', 'Di'];

    if (allFaces) {
      notations = [...notations, 'B', 'BI'];
    }

    return Utils.shuffleArray([...Utils.shuffleArray(notations), ...Utils.shuffleArray(notations)]);
  }

  static shuffleArray(array: Array<any>): Array<any> {
    return [...array].sort(() => Math.random() - 0.5);
  }

  static rotateNotaions(notations: Array<any>, side: number) {
    let notaionsMapping: any = rotateNotaionsMapping[side];

    if (!notaionsMapping) {
      return notations;
    }

    notations = notations.map(n => {
      let result = n.toUpperCase();
      let inverseNotation = result.indexOf('I') !== -1;

      if (inverseNotation) {
        result = result.replace('I', '');
      }

      if (notaionsMapping[result]) {
        result = notaionsMapping[result];

        if (inverseNotation) {
          result = Utils.inverseNotation(result);
        }
      } else {
        result = n;
      }

      return result;
    });
    
    return notations;
  }
}
