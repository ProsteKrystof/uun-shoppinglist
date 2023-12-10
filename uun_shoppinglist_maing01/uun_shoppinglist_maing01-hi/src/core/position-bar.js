//@@viewOn:imports
import { createVisualComponent, Utils, Content, Lsi, BackgroundProvider } from "uu5g05";
import { Icon } from "uu5g05-elements";
import Plus4U5App from "uu_plus4u5g02-app";
import ThemeToggle from "./theme/theme-toggle.js";
import Config from "./config/config.js";
import importLsi from "../lsi/import-lsi.js";
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

const PositionBar = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "PositionBar",
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
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, PositionBar);

    const actionList = [
      {children: <ThemeToggle />, collapsed: false},
      {
        children: <Lsi import={importLsi} path={["Menu", "about"]} />,
        onClick: () => setRoute("about"),
        collapsed: true,
      },
    ]

    return (
      <Plus4U5App.PositionBar view="short" actionList={actionList} significance="subdued">
        <h2><Icon icon="uugds-checkbox-list" /> ShoppingLists</h2>
      </Plus4U5App.PositionBar>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { PositionBar };
export default PositionBar;
//@@viewOff:exports
