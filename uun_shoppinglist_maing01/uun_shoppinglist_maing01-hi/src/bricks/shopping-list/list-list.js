//@@viewOn:imports
import { createVisualComponent, Utils, Content, PropTypes, useLsi } from "uu5g05";
import Config from "./config/config.js";
import ListCard from "./list-card.js";
import { Grid } from "uu5tilesg02-elements";
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

const ListList = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListList",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    lists: PropTypes.array.isRequired,
    showArchived: PropTypes.bool.isRequired,
    archiveList: PropTypes.func.isRequired,
    deleteList: PropTypes.func.isRequired,
    leaveList: PropTypes.func.isRequired
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
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ListList);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Grid
          data={props.lists}
          emptyState={<div>{lsi.noLists}</div>}
        >
          <ListCard archiveList={props.archiveList} deleteList={props.deleteList} leaveList={props.leaveList} />
        </Grid>

        <Content nestingLevel={currentNestingLevel}>{children}</Content>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListList };
export default ListList;
//@@viewOff:exports
