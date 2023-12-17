//@@viewOn:imports
import { createVisualComponent, Utils, Content, PropTypes, useState, useScreenSize, useRoute, useLsi } from "uu5g05";
import { useAlertBus } from "uu5g05-elements";
import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";
import EditShoppingListModal from "./edit-shopping-list-modal.js";
import ChartModal from "../../core/chart-modal.js";
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
    const { addAlert } = useAlertBus();
    const [route, setRoute] = useRoute();
    const [screenSize] = useScreenSize();

    // edit shopping list modal
    const [showEditShoppingListModal, setShowEditShoppingListModal] = useState(false);
    // chart modal
    const [showChartModal, setShowChartModal] = useState(false);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ListsOptions);

    function prepareChartData() {
      const chartData = [];

      props.shoppinglistDataList.data.forEach((list) => {
        if (list.data.archived && !props.showArchived) {
          return;
        }

        chartData.push({name: list.data.name, value: list.data.taskAmount})
      });

      return chartData;
    }

    async function handleEditShoppingListSubmit(values) {
      let shoppingList;

      try {
        shoppingList = await props.shoppinglistDataList.handlerMap.create(values);
      } catch (e) {
        console.error(e);
        addAlert({
          header: lsi.createError,
          message: e.message,
          priority: "error",
        })
        return;
      }

      setRoute("shoppingListDetail", { id: shoppingList.id });
    }

    const handleEditShoppingListOpen = () => setShowEditShoppingListModal(true);
    const handleEditShoppingListClose = () => setShowEditShoppingListModal(false);

    const handleChartModalOpen = () => setShowChartModal(true);
    const handleChartModalClose = () => setShowChartModal(false);

    const isSmall = screenSize === "xs" || screenSize === "s";

    return currentNestingLevel ? (
      <div {...attrs}>
        <h1>{lsi.yourShoppingLists}</h1>
        <div style={{ display: "flex", marginBottom: 10 }}>
          <Uu5Elements.Button
            significance="highlighted"
            icon="uugds-plus"
            colorScheme="blue"
            onClick={handleEditShoppingListOpen}
          >{isSmall ? undefined : lsi.createNew}</Uu5Elements.Button>

          <Uu5Elements.Button
            className={Config.Css.css({marginLeft: 10})}
            icon="mdi-chart-donut"
            significance="highlighted"
            onClick={handleChartModalOpen}
          />

          <Uu5Elements.Toggle
            label={isSmall ? lsi.showArchivedSmall : lsi.showArchived}
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

        {showChartModal && (
          <ChartModal
            header={lsi.chartHeader}
            data={prepareChartData()}
            onClose={handleChartModalClose}
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
