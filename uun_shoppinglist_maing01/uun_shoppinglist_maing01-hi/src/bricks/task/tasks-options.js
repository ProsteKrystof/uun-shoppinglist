//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState, useSession, Lsi } from "uu5g05";
import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";
import AddTaskModal from "./add-task-modal.js";
import EditShoppingListModal from "../shopping-list/edit-shopping-list-modal.js";
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
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    const { identity } = useSession();
    // add task modal
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    // edit shopping list modal
    const [showEditShoppingListModal, setShowEditShoppingListModal] = useState(false);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, TasksOptions);

    async function handleAddTaskSubmit(values) {
      props.addTask(values.name, identity.name);
      handleAddTaskClose();
    }

    async function handleEditShoppingListSubmit(values) {
      props.updateShoppingList(values)
      handleEditShoppingListClose();
    }

    const isOwner = props.shoppingList.ownerIdentity === identity.uuIdentity;

    const handleAddTaskOpen = () => setShowAddTaskModal(true);
    const handleAddTaskClose = () => setShowAddTaskModal(false);

    const handleEditShoppingListOpen = () => setShowEditShoppingListModal(true);
    const handleEditShoppingListClose = () => setShowEditShoppingListModal(false);

    return currentNestingLevel ? (
      <div {...attrs}>
        <h1><Uu5Elements.Icon colorScheme={props.shoppingList.color} icon="uugds-circle-solid"/> {props.shoppingList.name}</h1>
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
            onClick={handleEditShoppingListOpen}
          />
          {!isOwner && (<Uu5Elements.Button
            className={Config.Css.css({marginLeft: 10})}
            icon="mdi-exit-to-app"
            significance="highlighted"
            colorScheme="red"
          />)}

          <Uu5Elements.Toggle
            label={<Lsi import={importLsi} path={["Task", "showFinished"]} />}
            size="xl"
            style={{marginLeft: "auto"}}
            value={props.showCompleted}
            onChange={(e) => props.setShowCompleted(e.data.value)}
          />
        </div>

        {showAddTaskModal && (
          <AddTaskModal
            onSubmit={handleAddTaskSubmit}
            onCancel={handleAddTaskClose}
            open
          />
        )}

        {showEditShoppingListModal && (
          <EditShoppingListModal
            shoppingList={props.shoppingList}
            isOwner={isOwner}
            onSubmit={handleEditShoppingListSubmit}
            onCancel={handleEditShoppingListClose}
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
