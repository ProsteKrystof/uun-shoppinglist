//@@viewOn:imports
import { createVisualComponent, Utils, Content, Lsi } from "uu5g05";
import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";
import { useState } from "uu5g05";
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

const TasksOptions = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "TasksOptions",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    name: "Shopping List"
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, TasksOptions);

    function Toggle(props) {
      const [value, setValue] = useState(props.value ?? false);

      return (
        <Uu5Elements.Toggle
          value={value}
          onChange={(e) => setValue(e.data.value)}
          {...props}
        />
      );
    }

    return currentNestingLevel ? (
      <div {...attrs}>
        <h1><Uu5Elements.Icon style={{color:"#107042"}} icon="uugds-circle-solid"/> {props.name}</h1>
        <div style={{ display: "flex", marginBottom: 10 }}>
          <Uu5Elements.Button
            significance="highlighted"
            icon="uugds-plus"
            colorScheme="blue"
          ><Lsi import={importLsi} path={["Task", "add"]} /></Uu5Elements.Button>
          <Uu5Elements.Button
            className={Config.Css.css({marginLeft: 10})}
            icon="uugds-settings"
            significance="highlighted"
          />
          <Uu5Elements.Button
            className={Config.Css.css({marginLeft: 10})}
            icon="mdi-exit-to-app"
            significance="highlighted"
            colorScheme="red"
          />

          <Toggle
            label={<Lsi import={importLsi} path={["Task", "showFinished"]} />}
            size="xl"
            style={{marginLeft: "auto"}}
          />
        </div>
        <Content nestingLevel={currentNestingLevel}>{children}</Content>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { TasksOptions };
export default TasksOptions;
//@@viewOff:exports
