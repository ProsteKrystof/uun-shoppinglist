//@@viewOn:imports
import { createVisualComponent, Utils, Content, PropTypes, Lsi, useLsi, useScreenSize } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import importLsi from "../../lsi/import-lsi.js";
import Config from "./config/config.js";
import { useThemeContext } from "../../core/theme/theme-context.js";
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

const TaskCard = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "TaskCard",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    taskDataObject: PropTypes.object.isRequired,
    finishTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    const lsi = useLsi(importLsi, ["Task"]);
    const [isDark] = useThemeContext();
    const [screenSize] = useScreenSize();

    function handleComplete() {
      props.finishTask(props.taskDataObject);
    }

    function handleRemove() {
      props.deleteTask(props.taskDataObject);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, TaskCard);
    const task = props.taskDataObject.data;

    const isPending = props.taskDataObject.state === "pending";

    const isSmall = screenSize === "xs" || screenSize === "s";

    const addedByText = isSmall ? task.addedBy : lsi.addedBy + ": " + task.addedBy;

    return currentNestingLevel ? (
      <div {...attrs}>
        <Uu5Elements.Box
          className={Config.Css.css({ paddingLeft: 16, paddingBottom: 5, paddingTop: 1, marginBottom: 15 })}
          borderRadius="expressive"
          significance={isDark ? "common" : "distinct"}
        >
          <div style={{display: "flex"}}>
            {isPending && <Uu5Elements.Pending size="xs" style={{marginTop: 15, marginRight: 10}}/>}
            <h2 style={{marginBottom: 5}}>{task.name}</h2>
          </div>
          <div style={{display: "flex"}}>
            <p style={{marginTop: 5}}>{addedByText}</p>
            <div style={{marginLeft: "auto", marginRight: 16}}>
              {/* Finish/Finished button */}
              {task.finished
              ?
                <Uu5Elements.Button
                  significance="highlighted"
                  colorScheme="green"
                  icon="uugds-check"
                >
                  {isSmall ? undefined : lsi.finished}
                </Uu5Elements.Button>
              :
                <Uu5Elements.Button
                  significance="highlighted"
                  colorScheme="blue"
                  icon="uugds-check"
                  onClick={handleComplete}
                  disabled={isPending}
                >
                  {isSmall ? undefined : lsi.finish}
                </Uu5Elements.Button>
              }

              {/* Delete button */}
              <Uu5Elements.Button
                style={{marginLeft: 5}}
                significance="highlighted"
                colorScheme="red"
                icon="mdi-trash-can"
                onClick={handleRemove}
                disabled={isPending}
              />
            </div>
          </div>
        </Uu5Elements.Box>


        <Content nestingLevel={currentNestingLevel}>{children}</Content>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { TaskCard };
export default TaskCard;
//@@viewOff:exports
