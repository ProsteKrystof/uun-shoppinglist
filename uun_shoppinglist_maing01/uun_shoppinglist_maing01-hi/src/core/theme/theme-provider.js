//@@viewOn:imports
import { createComponent, useState } from "uu5g05";
import ThemeContext from "./theme-context.js";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const ThemeProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ThemeProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [isDark, setIsDark] = useState(false);

    function toggleIsDark() {
      setIsDark(!isDark);
    }

    const value = [
      isDark,
      toggleIsDark,
    ];
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <ThemeContext.Provider value={value}>
        {typeof props.children === "function" ? props.children(value) : props.children}
      </ThemeContext.Provider>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export default ThemeProvider;
//@@viewOff:exports
