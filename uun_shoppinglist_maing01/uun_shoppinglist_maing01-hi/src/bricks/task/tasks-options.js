//@@viewOn:imports
import { createVisualComponent, Utils, Content, PropTypes, useState, useSession, useRoute, Lsi } from "uu5g05";
import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";
import AddTaskModal from "./add-task-modal.js";
import EditShoppingListModal from "../shopping-list/edit-shopping-list-modal.js";
import LeaveDialog from "../shopping-list/leave-dialog.js";
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
  propTypes: {
    shoppingListDataObject: PropTypes.object,
    showCompleted: PropTypes.bool.isRequired,
    setShowCompleted: PropTypes.func.isRequired
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    const { identity } = useSession();
    const [route, setRoute] = useRoute();
    // add task modal
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    // edit shopping list modal
    const [showEditShoppingListModal, setShowEditShoppingListModal] = useState(false);
    // leave shopping list dialog
    const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);

    const shoppingList = props.shoppingListDataObject.data;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, TasksOptions);

    async function handleAddTaskSubmit(values) {
      //props.addTask(values.name, identity.name);
      handleAddTaskClose();
    }

    async function handleEditShoppingListSubmit(values) {
      //props.updateShoppingList(values)
      try {
        await props.shoppingListDataObject.handlerMap.update({ name: values.name, color: values.color });
        await props.shoppingListDataObject.handlerMap.setMembers({memberIdentities: values.memberIdentities});
      } catch (e) {
        console.error(e);
        return;
      }
      handleEditShoppingListClose();
    }

    async function handleLeaveShoppingList() {
      try {
        await props.shoppingListDataObject.handlerMap.leave();
        setRoute("shoppingLists");
      } catch (e) {
        console.error(e);
        return;
      }
    }

    const isOwner = shoppingList.uuIdentity === identity.uuIdentity;

    const handleAddTaskOpen = () => setShowAddTaskModal(true);
    const handleAddTaskClose = () => setShowAddTaskModal(false);

    const handleEditShoppingListOpen = () => setShowEditShoppingListModal(true);
    const handleEditShoppingListClose = () => setShowEditShoppingListModal(false);

    return currentNestingLevel ? (
      <div {...attrs}>
        <h1><Uu5Elements.Icon colorScheme={shoppingList.color} icon="uugds-circle-solid"/> {shoppingList.name}</h1>
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
            onClick={() => setLeaveDialogOpen(true)}
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
            shoppingList={shoppingList}
            isOwner={isOwner}
            onSubmit={handleEditShoppingListSubmit}
            onCancel={handleEditShoppingListClose}
            open
          />
        )}

        <LeaveDialog leaveDialogOpen={leaveDialogOpen} setLeaveDialogOpen={setLeaveDialogOpen} handleLeave={handleLeaveShoppingList} />

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
