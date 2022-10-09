import * as React from "react";
import { observer } from "mobx-react-lite";
import { Empty, Input, InputRef, Menu, Modal, Spin } from "antd";
import { compile } from "charchem/compiler/compile";
import { AskCompoundsModalStore } from "./AskCompoundsModalStore";
import styles from "./AskCompoundsModal.module.less";
import { FlagIcon } from "../FlagIcon";
import { FormulaDefaultView } from "../FormulaDefaultView";
import { ViewFormulaUni } from "../ViewFormulaUni";

interface PropsAskCompoundsModal {
  store: AskCompoundsModalStore;
}

export const AskCompoundsModal: React.FC<PropsAskCompoundsModal> = observer(
  ({ store }: PropsAskCompoundsModal) => {
    const {
      active,
      search,
      compoundStatus,
      curCompIndex,
      formulasStatus,
      formulas,
      menuItems,
    } = store;
    const ref = React.useRef<InputRef>(null);
    React.useEffect(() => {
      setTimeout(() => {
        if (active && ref.current) ref.current.focus();
      }, 200);
    }, [active]);
    return (
      <Modal
        bodyStyle={{ height: "90vh" }}
        centered
        footer={null}
        onCancel={() => store.setActive(false)}
        title="Search for compound formulas"
        visible={active}
        width="80vw"
      >
        <div className={styles.askCompoundsModal}>
          <div className={styles.search}>
            <Input.Search
              ref={ref}
              value={search}
              onChange={(e) => store.setSearch(e.currentTarget.value)}
              loading={compoundStatus === "load"}
              allowClear
              placeholder="Name or CAS. Examples: Water or 7732-18-5"
            />
          </div>
          <div className={styles.compounds}>
            <div className={styles.compoundsList}>
              {menuItems.length === 0 && <Empty />}
              {menuItems.length > 0 &&
                menuItems.map(({ key, id, lang, name }, i) => (
                  <a
                    href="#"
                    key={key}
                    className={i === curCompIndex ? styles.curComp : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      store.setCurCompIndex(i);
                    }}
                  >
                    <FlagIcon
                      localeName={lang}
                      size={24}
                      className={styles.flag}
                    />
                    {name}
                  </a>
                ))}
            </div>
          </div>
          <div className={styles.formulas}>
            <Spin size="large" spinning={formulasStatus === "load"}>
              {formulas.map(({ id, formula }) => (
                <div
                  key={id}
                  className={styles.formulaBox}
                  onClick={() => store.select(formula)}
                >
                  <ViewFormulaUni expr={compile(formula)} />
                </div>
              ))}
            </Spin>
          </div>
        </div>
      </Modal>
    );
  }
);
