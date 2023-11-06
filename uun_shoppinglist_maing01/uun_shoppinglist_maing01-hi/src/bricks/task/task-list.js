//@@viewOn:imports
import { createVisualComponent, Utils, Content, PropTypes } from "uu5g05";
import Config from "./config/config.js";
import TaskCard from "./task-card.js";
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
    tasks: PropTypes.array.isRequired,
    taskFunctions: PropTypes.shape({
      createTask: PropTypes.func.isRequired,
      completeTask: PropTypes.func.isRequired,
      removeTask: PropTypes.func.isRequired,
    }).isRequired,
    showCompleted: PropTypes.bool.isRequired
  },
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
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, TaskList);

    return currentNestingLevel ? (
      <div {...attrs}>
        {props.tasks?.map((task) => (
          <TaskCard key={task.id} taskInfo={task} taskFunctions={props.taskFunctions} />
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
