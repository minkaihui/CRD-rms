import { useContextMenu } from '/@/hooks/web/useContextMenu';
import { useMessage } from '/@/hooks/web/useMessage';

const [createContextMenu] = useContextMenu();
const { createMessage } = useMessage();


export function rightButtonEvent(e: MouseEvent) {
    createContextMenu({
        event: e,
        items: [
            {
                label: '查看详情',
                handler: () => {
                    createMessage.success('查看详情');
                },
            },
            {
                label: '移动至文件夹..',
                handler: () => {
                    createMessage.success('移动至文件夹..');
                },
            },
            {
                label: '复制',
                handler: () => {
                    createMessage.success('复制');
                },
            },
            {
                label: '重命名',
                handler: () => {
                    createMessage.success('重命名');
                },
            },
            {
                label: '下载',
                handler: () => {
                    createMessage.success('下载');
                },
            },
            {
                label: '删除',
                handler: () => {
                    createMessage.success('删除');
                },
            },
        ],
    });
}
