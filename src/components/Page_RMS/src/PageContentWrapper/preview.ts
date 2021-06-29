import { ref, onMounted } from 'vue';
import '/@/utils/viewerjs/viewer.min.js';

function preview(viewflag, viewflagEnum) {
  let viewer;
  const viewNum = ref<string>();
  const image = ref();

  onMounted(() => {
    ViewerMounted();
  });

  function ViewerMounted() {
    image.value = document.getElementById('viewerjs');
    //预览
    image.value.addEventListener(
      'click',
      function () {
        viewer.isShown = true;
        viewer.played = true;
      },
      false
    );
    return blankCtrlLogic(false, image.value);
  }

  //挂载viewer
  function blankCtrlLogic(inline = true, image: HTMLElement) {
    if (viewer) viewer.destroy();
    viewer = new Viewer(image, {
      inline: inline,
      navbar: 0,
      title: true,
      toolbar: 0,
      tooltip: false,
      hide() {
        if (inline) viewflag.preview = viewflagEnum.default;
        console.log('hide', inline);
      },
      hidden() {
        console.log('hidden');
      },
      ready() {
        // 2 methods are available here: "show" and "destroy".
        console.log('ready');
      },
      shown() {
        // 9 methods are available here: "hide", "view", "prev", "next", "play", "stop", "full", "exit" and "destroy".
      },
      viewed() {
        if (inline) viewflag.preview = viewflagEnum.preview;
        viewNum.value = Math.round(viewer.imageData.ratio * 100) + '%';
      },
      zoom() {
        viewNum.value = Math.round(viewer.imageData.ratio * 100) + '%';
      },
    });
    return viewer;
  }

  //双击
  function dblclickDecide(index) {
    blankCtrlLogic(true, image.value);
    viewer.view(index);
  }

  //局部预览事件代理
  function viewlist(event) {
    const target = event.target;
    if (target.className == 'back') {
      viewer.destroy();
      viewflag.preview = viewflagEnum.default;
      return;
    }
    switch (target.name) {
      case 'minus-small':
        viewer.zoom(-0.1);
        break;
      case 'add-small':
        viewer.zoom(0.1);
        break;
      case 'rotate':
        viewer.rotate(90);
        break;
      case 'OriginalSize':
        viewer.zoomTo(1);
        break;
      case 'AdaptiveWidth':
        viewer.toggle();
        break;
      case 'prev':
        viewer.prev();
        break;
      case 'next':
        viewer.next();
        break;
    }
  }

  return {
    image,
    viewer,
    preview: viewflag.preview,
    viewNum,
    blankCtrlLogic,
    dblclickDecide,
    viewlist,
    ViewerMounted,
  };
}

export default preview;
