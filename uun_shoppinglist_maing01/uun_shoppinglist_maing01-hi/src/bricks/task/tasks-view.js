//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState } from "uu5g05";
import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";
import TasksOptions from "./tasks-options.js";
import TaskList from "./task-list.js";
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

const TasksView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "TasksView",
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
    const [showCompleted, setShowCompleted] = useState(false);

    const tasksToShow = showCompleted ? props.shoppingList.tasks : props.shoppingList.tasks.filter((task) => task.completed === false);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, TasksView);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Uu5Elements.Box
          className={Config.Css.css({ padding: 16, margin: 50 })}
          borderRadius="expressive"
        >
          <TasksOptions
            name={props.shoppingList.name}
            color={props.shoppingList.color}
            addTask={props.taskFunctions.createTask}
            showCompleted={showCompleted}
            setShowCompleted={setShowCompleted}
          />
          <TaskList tasks={tasksToShow} taskFunctions={props.taskFunctions} showCompleted={showCompleted} />
        </Uu5Elements.Box>

        <Content nestingLevel={currentNestingLevel}>{children}</Content>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { TasksView };
export default TasksView;
//@@viewOff:exports
