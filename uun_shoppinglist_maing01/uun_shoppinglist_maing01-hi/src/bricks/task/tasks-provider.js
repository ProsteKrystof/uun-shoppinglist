//@@viewOn:imports
import { createComponent, useDataList, PropTypes } from "uu5g05";
import Config from "./config/config.js";
import Calls from "calls";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const TasksProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "TasksProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    id: PropTypes.string.isRequired
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const taskDataList = useDataList({
      handlerMap: {
        load: handleLoad,
        create: handleCreate
      },
      itemHandlerMap: {
        delete: handleDelete,
        finish: handleFinish
      },
      pageSize: 100
    });

    function handleLoad(dtoIn) {
      dtoIn.listId = props.id;
      dtoIn.pageInfo.pageIndex = 0;
      return Calls.Task.list(dtoIn);
    }

    function handleCreate(dtoIn) {
      dtoIn.listId = props.id;
      return Calls.Task.create(dtoIn);
    }

    function handleDelete(dtoIn) {
      return Calls.Task.delete(dtoIn);
    }

    function handleFinish(dtoIn) {
      return Calls.Task.finish(dtoIn);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return typeof props.children === "function" ? props.children(taskDataList) : props.children;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { TasksProvider };
export default TasksProvider;
//@@viewOff:exports
