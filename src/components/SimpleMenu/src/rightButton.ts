import { useContextMenu } from '/@/hooks/web/useContextMenu';
import { useMessage } from '/@/hooks/web/useMessage';

const [createContextMenu] = useContextMenu();


export function rightButtonEvent(e: MouseEvent,id,open,showName,FolderDeletion) {
  let obj;
  if(showName=='私人文件夹'){
    obj={
      event: e,
      items: [
        {
          label: '编辑文件夹名称',
          handler: () => {
            open(showName,'编辑文件夹名称',id)
          },
        },
        {
          label: '删除',
          handler: () => {
            FolderDeletion(id)
          },
        }
      ],
    }
  }else{
    obj={
      event: e,
      items: [
        {
          label: '编辑文件夹名称',
          handler: () => {
            open(showName,'编辑文件夹名称',id)
          },
        },
        {
          label: '编辑文件夹',
          handler: () => {
            open(showName,'编辑文件夹',id)
          },
        },
        {
          label: '删除',
          handler: () => {
            FolderDeletion(id)
          },
        }
      ],
    }
  }
  createContextMenu(obj);
}
