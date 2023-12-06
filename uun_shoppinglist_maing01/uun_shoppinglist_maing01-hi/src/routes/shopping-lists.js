//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import { RouteController } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import ListsProvider from "../bricks/shopping-list/lists-provider.js";
import ListsView from "../bricks/shopping-list/lists-view.js";
import RouteBar from "../core/route-bar.js";
import PositionBar from "../core/position-bar.js";
import { withRoute } from "uu_plus4u5g02-app";
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

let ShoppingLists = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingLists",
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
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ShoppingLists);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Content nestingLevel={currentNestingLevel}>{children}</Content>
        <PositionBar />

        <ListsProvider>
          {(shoppinglistDataList) => (
            <RouteController routeDataObject={shoppinglistDataList}>
              <ListsView shoppinglistDataList={shoppinglistDataList} />
            </RouteController>
          )}
        </ListsProvider>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

ShoppingLists = withRoute(ShoppingLists, { authenticated: true });

//@@viewOn:exports
export { ShoppingLists };
export default ShoppingLists;
//@@viewOff:exports
