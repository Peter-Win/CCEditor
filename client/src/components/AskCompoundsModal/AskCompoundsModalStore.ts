import { notification } from "antd";
import { makeAutoObservable } from "mobx";
import { AskCompounds, CompoundItem } from "src/types/AskCompounds";
import { AskSubstId, AskSubstIdFormula } from "src/types/AskSubstId";
import { LoadingStatus } from "src/types/LoadingStatus";
import { debounce, DebounceCounter } from "src/utils/debounce";
import { isCasNumber } from "charchem/utils/isCasNumber";

const searchCounter: DebounceCounter = {};

export class AskCompoundsModalStore {
  constructor() {
    makeAutoObservable(this);
  }

  active: boolean = false;

  setActive(active: boolean) {
    this.active = active;
  }

  onSelect: ((code: string) => void) | null = null;

  activate(onSelect: (code: string) => void) {
    this.setActive(true);
    this.onSelect = onSelect;
  }

  select(code: string) {
    const { onSelect } = this;
    if (onSelect) {
      onSelect(code);
      this.onSelect = null;
    }
    this.setActive(false);
  }

  search: string = "";

  setSearch(newText: string) {
    this.search = newText;
    debounce(searchCounter, 400, () => this.loadCompounds());
  }

  compoundStatus: LoadingStatus = "none";

  setCompoundStatus(status: LoadingStatus) {
    this.compoundStatus = status;
  }

  compounds: CompoundItem[] = [];

  setCompounds(newList: CompoundItem[]) {
    this.compounds = newList;
    this.setFormulas([]);
    this.setCurCompIndex(0);
  }

  curCompIndex = 0;

  setCurCompIndex(i: number) {
    this.curCompIndex = i;
    const info = this.compounds[i];
    if (info) {
      this.loadFormulas(info.id);
    }
  }

  get menuItems(): Array<{
    key: string;
    lang: string;
    name: string;
    id: number;
  }> {
    return this.compounds.map(({ id, lang, name }) => ({
      key: `${id}:${name}:${lang}`,
      id,
      lang,
      name,
    }));
  }

  formulas: AskSubstIdFormula[] = [];

  setFormulas(list: AskSubstIdFormula[]) {
    this.formulas = list;
  }

  async loadCompounds() {
    const { search } = this;
    if (search) {
      try {
        this.setCompoundStatus("load");
        let url = `/api/askCompounds/${search}`;
        if (isCasNumber(search)) {
          url += `?mode=cas`;
        }
        const raw = await fetch(url);
        const res = (await raw.json()) as AskCompounds;
        this.setCompounds(res.list);
        this.setCompoundStatus("ready");
      } catch (e) {
        notification.error({ message: e.message });
      }
    } else {
      this.setCompounds([]);
    }
  }

  formulasStatus: LoadingStatus = "none";

  setFormulasStatus(status: LoadingStatus) {
    this.formulasStatus = status;
  }

  async loadFormulas(id: number) {
    try {
      this.setFormulasStatus("load");
      const raw = await fetch(`/api/askSubstId/${id}`);
      const res = (await raw.json()) as AskSubstId;
      if ("formulas" in res) {
        this.setFormulas(res.formulas);
      } else {
        this.setFormulas([]);
      }
      this.setFormulasStatus("ready");
    } catch (e) {
      this.setFormulasStatus("error");
      notification.error({ message: e.message });
    }
  }
}

export const askCompoundsModalStore = new AskCompoundsModalStore();
