//@@viewOn:imports
import { createVisualComponent, Utils, Content, PropTypes, useSession, useLsi } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import importLsi from "../../lsi/import-lsi.js";
import ProgressTracker from "../task/progress-tracker.js";
import { getSchemeColor } from "../utils.js";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ListCard = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListCard",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    const listDataObject = props.data;
    const { identity } = useSession();
    const lsi = useLsi(importLsi, ["ShoppingList"]);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ListCard);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Uu5Elements.Box
          className={Config.Css.css({ padding: 0, marginBottom: 5, marginRight: 2 })}
          borderRadius="expressive"
          significance="distinct"
          style={{ backgroundColor: getSchemeColor(listDataObject.color) }}
        >
          <Uu5Elements.Box
            className={Config.Css.css({ paddingLeft: 16, paddingBottom: 5, paddingTop: 1, marginLeft: 5, marginRight: -2 })}
            borderRadius="expressive"
            significance="distinct"
          >
            {
              listDataObject.archived ? (
                <h2 style={{marginBottom: 5, color: "grey"}}> <Uu5Elements.Icon icon={"mdi-archive"} /> {listDataObject.name}</h2>
              ) : (
                <h2 style={{marginBottom: 5}}>{listDataObject.name}</h2>
              )
            }

            <div style={{display: "flex"}}>
              {
                listDataObject.ownerIdentity === identity.uuIdentity ? (
                  <p style={{marginTop: 5}}><Uu5Elements.Icon icon={"mdi-account-circle"} /> {lsi.owner}</p>
                ) : (
                  <p style={{marginTop: 5}}><Uu5Elements.Icon icon={"mdi-account"} /> {lsi.member}</p>
                )
              }
              <div style={{marginLeft: "auto", marginRight: 16}}>
                <ProgressTracker completedAmount={listDataObject.completedTasks} totalAmount={listDataObject.totalTasks} />
              </div>
            </div>
          </Uu5Elements.Box>
        </Uu5Elements.Box>

        <Content nestingLevel={currentNestingLevel}>{children}</Content>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListCard };
export default ListCard;
//@@viewOff:exports
