//@@viewOn:imports
import { createVisualComponent, Utils, Content, PropTypes, useState, useSession, useLsi } from "uu5g05";
import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";
import importLsi from "../../lsi/import-lsi.js";
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

const ListsOptions = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListsOptions",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    showArchived: PropTypes.bool.isRequired,
    setShowArchived: PropTypes.func.isRequired
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    const lsi = useLsi(importLsi, ["ShoppingList"]);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ListsOptions);

    return currentNestingLevel ? (
      <div {...attrs}>
        <h1><Uu5Elements.Icon icon="uugds-checkbox-list"/> {lsi.yourShoppingLists}</h1>
        <div style={{ display: "flex", marginBottom: 10 }}>
          <Uu5Elements.Button
            significance="highlighted"
            icon="uugds-plus"
            colorScheme="blue"
            onClick={() => console.log("Click")}
          >{lsi.create}</Uu5Elements.Button>

          <Uu5Elements.Toggle
            label={lsi.showArchived}
            size="xl"
            style={{marginLeft: "auto"}}
            value={props.showArchived}
            onChange={(e) => props.setShowArchived(e.data.value)}
          />
        </div>
        <Content nestingLevel={currentNestingLevel}>{children}</Content>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListsOptions };
export default ListsOptions;
//@@viewOff:exports