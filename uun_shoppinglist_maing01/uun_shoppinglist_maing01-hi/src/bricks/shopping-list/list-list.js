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
    shoppinglistDataList: PropTypes.object
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    const lsi = useLsi(importLsi, ["ShoppingList"]);

    async function handleArchive(shoppinglistDataObject) {
      try {
        await shoppinglistDataObject.handlerMap.archive();
      } catch (e) {
        console.error(e);
        return;
      }

      props.shoppinglistDataList.handlerMap.load();
    }

    async function handleDelete(shoppinglistDataObject) {
      try {
        await shoppinglistDataObject.handlerMap.delete();
      } catch (e) {
        console.error(e);
        return;
      }
    }

    async function handleLeave(shoppinglistDataObject) {
      try {
        await shoppinglistDataObject.handlerMap.leave();
      } catch (e) {
        console.error(e);
        return;
      }

      props.shoppinglistDataList.handlerMap.load();
    }

    async function handleLoadNext({ indexFrom }) {
      try {
        await props.shoppinglistDataList.handlerMap.loadNext({
          pageInfo: {
            pageIndex: Math.floor(indexFrom / props.shoppinglistDataList.pageSize)
          }
        });
      } catch (e) {
        console.error(e);
        return;
      }
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ListList);

    const shoppingLists = props.shoppinglistDataList.data.filter((item) => item !== undefined);
    const listsToShow = props.showArchived ? shoppingLists : shoppingLists.filter((list) => list.data.archived === false);
    console.log(listsToShow);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Grid
          data={listsToShow}
          onLoad={handleLoadNext}
          emptyState={<div>{lsi.noLists}</div>}
        >
          <ListCard archiveList={handleArchive} deleteList={handleDelete} leaveList={handleLeave} />
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
