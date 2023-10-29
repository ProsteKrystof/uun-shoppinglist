//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState, Lsi } from "uu5g05";
import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";
import AddTaskModal from "./add-task-modal.js";
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
    // add task modal
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
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

    async function handleAddTaskSubmit(values) {
      props.addTask(values.name, "1234-1234-1");
      handleAddTaskClose();
    }

    const handleAddTaskOpen = () => setShowAddTaskModal(true);
    const handleAddTaskClose = () => setShowAddTaskModal(false);

    return currentNestingLevel ? (
      <div {...attrs}>
        <h1><Uu5Elements.Icon style={{color:props.color}} icon="uugds-circle-solid"/> {props.name}</h1>
        <div style={{ display: "flex", marginBottom: 10 }}>
          <Uu5Elements.Button
            significance="highlighted"
            icon="uugds-plus"
            colorScheme="blue"
            onClick={handleAddTaskOpen}
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

        {showAddTaskModal && (
          <AddTaskModal
            onSubmit={handleAddTaskSubmit}
            onCancel={handleAddTaskClose}
            open
          />
        )}

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
