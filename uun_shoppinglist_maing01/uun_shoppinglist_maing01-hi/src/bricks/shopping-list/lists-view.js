//@@viewOn:imports
import { createVisualComponent, Utils, Content, PropTypes, useState } from "uu5g05";
import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";
import ListsOptions from "./lists-options.js";
import ListList from "./list-list.js";
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

const ListsView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListsView",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    shoppingLists: PropTypes.array.isRequired,
    createList: PropTypes.func.isRequired,
    archiveList: PropTypes.func.isRequired,
    deleteList: PropTypes.func.isRequired,
    leaveList: PropTypes.func.isRequired
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    const [showArchived, setShowArchived] = useState(false);

    console.log(props);

    const listsToShow = showArchived ? props.shoppingLists : props.shoppingLists.filter((list) => list.archived === false);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ListsView);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Uu5Elements.Box
          className={Config.Css.css({ padding: 16, margin: 50 })}
          borderRadius="expressive"
        >
          <ListsOptions
            showArchived={showArchived}
            setShowArchived={setShowArchived}
            createList={props.createList}
          />
          <ListList
            lists={listsToShow}
            showArchived={showArchived}
            archiveList={props.archiveList}
            deleteList={props.deleteList}
            leaveList={props.leaveList}
          />
        </Uu5Elements.Box>

        <Content nestingLevel={currentNestingLevel}>{children}</Content>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListsView };
export default ListsView;
//@@viewOff:exports
