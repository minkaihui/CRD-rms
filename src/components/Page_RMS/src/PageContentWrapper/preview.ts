import {ref,onMounted,reactive} from 'vue';
import Viewer from 'viewerjs';

function preview() {
    let viewer;
    const viewflag = ref<boolean>(false);
    const viewNum = ref<string>();
    const image = ref();
    
    onMounted( () => {ViewerMounted()});

    function ViewerMounted(){
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
        return blankCtrlLogic(false,image.value);
    }

    //挂载viewer
    function blankCtrlLogic(inline:boolean = true,image:HTMLElement) {
        if (viewer) viewer.destroy();
        viewer = new Viewer(image, {
            inline: inline,
            navbar: 0,
            title: true,
            toolbar: 0,
            tooltip: false,
            hide() {
                viewflag.value = false;
                console.log('hide');
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
                viewflag.value = true;
                viewNum.value = Math.round(viewer.imageData.ratio * 100) + '%';
            },
            zoom() {
                viewNum.value = Math.round(viewer.imageData.ratio * 100) + '%';
            },
        });
        console.log(viewer,444)
        return viewer
    }

    //双击
    function dblclickDecide(index) {
        blankCtrlLogic(true,image.value);
        viewer.view(index);
    }

    //局部预览事件代理
    function viewlist(event) {
        let target = event.target;
        if (target.className == 'back') {
            viewer.destroy();
            viewflag.value = false;
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

    return{
        image,
        viewer,
        viewflag,
        viewNum,
        blankCtrlLogic,
        dblclickDecide,
        viewlist,
        ViewerMounted
    }
}

export default preview;