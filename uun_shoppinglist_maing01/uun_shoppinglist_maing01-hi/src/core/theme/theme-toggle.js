//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import { Toggle } from "uu5g05-elements";
import Config from "../../bricks/config/config.js";

import { useThemeContext } from "./theme-context.js";
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

const ThemeToggle = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ThemeToggle",
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
    const [isDark, toggleIsDark] = useThemeContext();
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ThemeToggle);

    return currentNestingLevel ? (
      <Toggle
        iconOn="uugdsstencil-weather-sun"
        iconOff="uugdsstencil-weather-moon"
        value={!isDark}
        onChange={toggleIsDark}
      />
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ThemeToggle };
export default ThemeToggle;
//@@viewOff:exports
