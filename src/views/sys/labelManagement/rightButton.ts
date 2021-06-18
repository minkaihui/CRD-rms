import { useContextMenu } from '/@/hooks/web/useContextMenu';
import { useMessage } from '/@/hooks/web/useMessage';

const [createContextMenu] = useContextMenu();
const { createMessage } = useMessage();

export function rightButton_left(e: MouseEvent) {
    createContextMenu({
        event: e,
        items: [
            {
                label: '搜索包含标签的项目',
                textStyle:{
                    'border-bottom':'1px solid rgba(0,0,0,0.06)'
                },
                handler: () => {
                    createMessage.success('搜索包含标签的项目');
                },
            },
            {
                label: '重命名',
                handler: () => {
                    createMessage.success('重命名');
                },
            },
            {
                label: '删除',
                textStyle:{
                    'color':'#f95a2c'
                },
                handler: () => {
                    createMessage.success('删除');
                },
            },
        ],
    });
}

export function rightButton_right(e: MouseEvent) {
    createContextMenu({
        event: e,
        items: [
            {
                label: '搜索包含标签的项目',
                textStyle:{
                    'border-bottom':'1px solid rgba(0,0,0,0.06)'
                },
                handler: () => {
                    createMessage.success('搜索包含标签的项目');
                },
            },
            {
                label: '设为常用标签',
                handler: () => {
                    createMessage.success('设为常用标签');
                },
            },
            {
                label: '取消常用标签',
                textStyle:{
                    'color':'#d9dbe1'
                },
                handler: () => {
                    createMessage.success('取消常用标签');
                },
            },
            {
                label: '重命名',
                textStyle:{
                    'border-bottom':'1px solid rgba(0,0,0,0.06)'
                },
                handler: () => {
                    createMessage.success('重命名');
                },
            },
            {
                label: '添加至群组...',
                righticon:'ant-design:right-outlined',
                handler: () => {
                    createMessage.success('添加至群组...');
                },
            },
            {
                label: '从标签群组移除',
                textStyle:{
                    'border-bottom':'1px solid rgba(0,0,0,0.06)'
                },
                handler: () => {
                    createMessage.success('从标签群组移除');
                },
            },{
                label: '删除标签',
                handler: () => {
                    createMessage.success('删除标签');
                },
            },
        ],
    });
}
