import { makeAutoObservable } from "mobx";
import { AppSettings } from "./types/AppSettings";

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

  settings: AppSettings = {};

  updateSetting(value: Partial<AppSettings>) {
    this.settings = { ...this.settings, ...value };
  }

  textViewMode: string = "html";

  setTextViewMode(newValue: string) {
    this.textViewMode = newValue;
  }
}

export const appStore = new AppStore();
