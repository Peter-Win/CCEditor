import { makeAutoObservable } from "mobx";

const keyCurPage = "curPage";

export class AppStore {
  curPage: string = "std";

  setCurPage(newCurPage: string) {
    this.curPage = newCurPage;
    localStorage.setItem(keyCurPage, newCurPage);
  }

  constructor() {
    const iCurPage = localStorage.getItem(keyCurPage);
    if (iCurPage) this.curPage = iCurPage;
    makeAutoObservable(this);
  }
}

export const appStore = new AppStore();
