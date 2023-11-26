//@@viewOn:imports
import { createVisualComponent, Utils, Content, PropTypes, useLsi } from "uu5g05";
import { useAlertBus } from "uu5g05-elements";
import Config from "./config/config.js";
import TaskCard from "./task-card.js";
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

const TaskList = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "TaskList",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    taskDataList: PropTypes.object.isRequired,
    showCompleted: PropTypes.bool.isRequired
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    const lsi = useLsi(importLsi, ["Task"]);
    const { addAlert } = useAlertBus();

    async function handleFinish(taskDataObject) {
      try {
        await taskDataObject.handlerMap.finish();
      } catch (e) {
        console.error(e);
        addAlert({
          header: lsi.finishError,
          message: e.message,
          priority: "error",
        });
        return;
      }
    }

    async function handleDelete(taskDataObject) {
      try {
        await taskDataObject.handlerMap.delete();
      } catch (e) {
        console.error(e);
        addAlert({
          header: lsi.deleteError,
          message: e.message,
          priority: "error",
        });
        return;
      }
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, TaskList);

    console.log("taskDataList in list", props.taskDataList);
    let tasksToShow = [];
    if (props.taskDataList.state === "ready") {
      const tasks = props.taskDataList.data.filter((item) => item !== undefined);
      tasksToShow = props.showCompleted ? tasks : tasks.filter((task) => task.data.finished === false);
    }

    return currentNestingLevel ? (
      <div {...attrs}>
        {tasksToShow.map((task) => (
          <TaskCard key={task.id} taskDataObject={task} finishTask={handleFinish} deleteTask={handleDelete} />
        ))}

        <Content nestingLevel={currentNestingLevel}>{children}</Content>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { TaskList };
export default TaskList;
//@@viewOff:exports
