//@@viewOn:imports
import { createVisualComponent, Utils, Content, PropTypes, useState, useScreenSize, useLsi } from "uu5g05";
import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";
import ListsOptions from "./lists-options.js";
import ListList from "./list-list.js";
import { useThemeContext } from "../../core/theme/theme-context.js";
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

const ListsView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListsView",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    shoppinglistDataList: PropTypes.object
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    const [showArchived, setShowArchived] = useState(false);
    const [isDark] = useThemeContext();
    const [screenSize] = useScreenSize();
    const lsi = useLsi(importLsi, ["ShoppingList"]);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ListsView);

    const shoppingLists = props.shoppinglistDataList.data.filter((item) => item !== undefined);
    const listsToShow = showArchived ? shoppingLists : shoppingLists.filter((list) => list.archived === false);

    document.title = lsi.yourShoppingLists + " | ShoppingLists";

    const isSmall = screenSize === "xs" || screenSize === "s";
    const mainBoxCss = isSmall ? { padding: 16, margin: 10} : { padding: 16, margin: 50 };

    return currentNestingLevel ? (
      <div {...attrs}>
        <Uu5Elements.Box
          className={Config.Css.css(mainBoxCss)}
          borderRadius="expressive"
          significance={isDark ? "highlighted" : undefined}
        >
          <ListsOptions
            showArchived={showArchived}
            setShowArchived={setShowArchived}
            shoppinglistDataList={props.shoppinglistDataList}
          />
          <ListList
            lists={listsToShow}
            showArchived={showArchived}
            shoppinglistDataList={props.shoppinglistDataList}
          />
        </Uu5Elements.Box>

        <Content nestingLevel={currentNestingLevel}>{children}</Content>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListsView };
export default ListsView;
//@@viewOff:exports
