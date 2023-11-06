//@@viewOn:imports
import { createVisualComponent, Utils, Content, PropTypes, useState } from "uu5g05";
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
  propTypes: {
    shoppingList: PropTypes.object.isRequired,
    taskFunctions: PropTypes.shape({
      createTask: PropTypes.func.isRequired,
      completeTask: PropTypes.func.isRequired,
      removeTask: PropTypes.func.isRequired,
    }).isRequired,
    updateShoppingList: PropTypes.func.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    const [showCompleted, setShowCompleted] = useState(false);

    const tasksToShow = showCompleted ? props.shoppingList.tasks : props.shoppingList.tasks.filter((task) => task.completed === false);

    // needed for left color bar of task view
    const listColors = {
      "light-blue": "#039BE5",
      "blue": "#1976D2",
      "dark-blue": "#3949AB",
      "dark-purple": "#5E35B1",
      "cyan": "#00ACC1",
      "dark-green": "#00897B",
      "green": "#388E3C",
      "light-green": "#7CB342",
      "pink": "#D81B60",
      "red": "#E53935",
      "orange": "#EF6C00",
      "yellow": "#FDD835",
      "purple": "#8E24AA",
      "brown": "#5D4037",
      "steel": "#586D79",
      "grey": "#616161"
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, TasksView);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Uu5Elements.Box
          className={Config.Css.css({ padding: 0, margin: 50 })}
          borderRadius="expressive"
          style={{ backgroundColor: listColors[props.shoppingList.color] }}
        >
          <Uu5Elements.Box
            className={Config.Css.css({ padding: 16, marginLeft: 5 })}
            borderRadius="expressive"
            significance="subdued"
          >
            <TasksOptions
              shoppingList={props.shoppingList}
              addTask={props.taskFunctions.createTask}
              updateShoppingList={props.updateShoppingList}
              showCompleted={showCompleted}
              setShowCompleted={setShowCompleted}
            />
            <TaskList tasks={tasksToShow} taskFunctions={props.taskFunctions} showCompleted={showCompleted} />
          </Uu5Elements.Box>
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
