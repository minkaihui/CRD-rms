import { defineStore } from 'pinia';
import { store } from '/@/store';
export const useUserFolders = defineStore({
  id: 'app-folder',
  state:() => ({
    openModal: true,
    openKey:'1',
    openEdit:''
  }),
  getters: {
    getOpenModal() :boolean{
      return this.openModal;
    },
    getOpenKey() :string{
      let value=parseInt(this.openKey)+1;
      return value.toString();
    },
    getOpenEdit() :string{
      return this.openEdit;
    },
  },
  actions: {
    setOpenModal(Modal){
      this.openModal = Modal
    },
    setOpenKey(Key){
      this.openKey = Key
    },
    setOpenEdit(Edit){
      this.openEdit = Edit
    },
  }
});


// Need to be used outside the setup
export function useUserFolder() {
  return useUserFolders(store);
}
