//@@viewOn:imports
import { createVisualComponent, Lsi, useRoute } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5App from "uu_plus4u5g02-app";

import ThemeToggle from "./theme/theme-toggle.js";
import { useThemeContext } from "./theme/theme-context.js";

import Config from "./config/config.js";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const RouteBar = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RouteBar",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [, setRoute] = useRoute();
    const [isDark] = useThemeContext();

    const appActionList = [
      {children: <ThemeToggle />, collapsed: false}
    ];
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    const routeBarStyle = isDark ? {backgroundColor: "#000000", color: "#bfbfbf", borderColor: "#212121"} : undefined;
    const headerStyle = isDark ? {color: "#bfbfbf"} : undefined;

    //@@viewOn:render
    return (
        <Plus4U5App.RouteBar appActionList={appActionList} {...props} style={routeBarStyle}>
          <Uu5Elements.Icon icon="uugds-checkbox-list" onClick={() => setRoute("shoppingLists")}/>
          <Plus4U5App.RouteHeader title={"‎ ShoppingLists"} style={headerStyle} />
        </Plus4U5App.RouteBar>
      );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RouteBar };
export default RouteBar;
//@@viewOff:exports
