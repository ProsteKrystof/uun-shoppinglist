//@@viewOn:imports
import { createVisualComponent, Utils, Content, useSession } from "uu5g05";
import { RouteController } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import ListDataProvider from "../bricks/shopping-list/list-data-provider.js";
import TasksView from "../bricks/task/tasks-view.js";
import { withRoute } from "uu_plus4u5g02-app";
import ListsProvider from "../bricks/shopping-list/lists-provider.js";
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

let ShoppingListDetail = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingListDetail",
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
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ShoppingListDetail);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Content nestingLevel={currentNestingLevel}>{children}</Content>

        <ListDataProvider id={props.params.id}>
          {(shoppingListDataObject) => (
            <RouteController routeDataObject={shoppingListDataObject}>
              <TasksView shoppingListDataObject={shoppingListDataObject} />
            </RouteController>
          )}
        </ListDataProvider>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

ShoppingListDetail = withRoute(ShoppingListDetail, {authenticated: true});

//@@viewOn:exports
export { ShoppingListDetail };
export default ShoppingListDetail;
//@@viewOff:exports
