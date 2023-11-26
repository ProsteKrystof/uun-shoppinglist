//@@viewOn:imports
import { createVisualComponent, Utils, Content, PropTypes, useState, useSession, useRoute, useLsi } from "uu5g05";
import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";
import EditShoppingListModal from "./edit-shopping-list-modal.js";
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

const ListsOptions = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListsOptions",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    showArchived: PropTypes.bool.isRequired,
    setShowArchived: PropTypes.func.isRequired,
    shoppinglistDataList: PropTypes.object
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    const lsi = useLsi(importLsi, ["ShoppingList"]);
    const [route, setRoute] = useRoute();
    const { identity } = useSession();

    // edit shopping list modal
    const [showEditShoppingListModal, setShowEditShoppingListModal] = useState(false);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ListsOptions);

    async function handleEditShoppingListSubmit(values) {
      let shoppingList;

      try {
        shoppingList = await props.shoppinglistDataList.handlerMap.create(values);
      } catch (e) {
        console.error(e);
        return;
      }

      /*props.shoppinglistDataList.handlerMap.load();
      handleEditShoppingListClose();*/

      setRoute("shoppingListDetail", { id: shoppingList.id });
    }

    const handleEditShoppingListOpen = () => setShowEditShoppingListModal(true);
    const handleEditShoppingListClose = () => setShowEditShoppingListModal(false);

    return currentNestingLevel ? (
      <div {...attrs}>
        <h1><Uu5Elements.Icon icon="uugds-checkbox-list"/> {lsi.yourShoppingLists}</h1>
        <div style={{ display: "flex", marginBottom: 10 }}>
          <Uu5Elements.Button
            significance="highlighted"
            icon="uugds-plus"
            colorScheme="blue"
            onClick={handleEditShoppingListOpen}
          >{lsi.createNew}</Uu5Elements.Button>

          <Uu5Elements.Toggle
            label={lsi.showArchived}
            size="xl"
            style={{marginLeft: "auto"}}
            value={props.showArchived}
            onChange={(e) => props.setShowArchived(e.data.value)}
          />
        </div>

        {showEditShoppingListModal && (
          <EditShoppingListModal
            isOwner={true}
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
export { ListsOptions };
export default ListsOptions;
//@@viewOff:exports
