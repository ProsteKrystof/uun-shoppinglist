//@@viewOn:imports
import { createVisualComponent, Utils, Content, PropTypes, Lsi } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import importLsi from "../../lsi/import-lsi.js";
import Config from "./config/config.js";
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

    return currentNestingLevel ? (
      <div {...attrs}>
        <Uu5Elements.Box
          className={Config.Css.css({ paddingLeft: 16, paddingBottom: 5, paddingTop: 1, marginBottom: 15 })}
          borderRadius="expressive"
          significance="distinct"
        >
          <h2 style={{marginBottom: 5}}>{task.name}</h2>
          <div style={{display: "flex"}}>
            <p style={{marginTop: 5}}>{<Lsi import={importLsi} path={["Task", "addedBy"]} />}: {task.addedBy}</p>
            <div style={{marginLeft: "auto", marginRight: 16}}>
              {/* Finish/Finished button */}
              {task.finished
              ?
                <Uu5Elements.Button
                  significance="highlighted"
                  colorScheme="green"
                  icon="uugds-check"
                >
                  <Lsi import={importLsi} path={["Task", "finished"]} />
                </Uu5Elements.Button>
              :
                <Uu5Elements.Button
                  significance="highlighted"
                  colorScheme="blue"
                  icon="uugds-check"
                  onClick={handleComplete}
                >
                  <Lsi import={importLsi} path={["Task", "finish"]} />
                </Uu5Elements.Button>
              }

              {/* Delete button */}
              <Uu5Elements.Button
                style={{marginLeft: 5}}
                significance="highlighted"
                colorScheme="red"
                icon="mdi-trash-can"
                onClick={handleRemove}
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
