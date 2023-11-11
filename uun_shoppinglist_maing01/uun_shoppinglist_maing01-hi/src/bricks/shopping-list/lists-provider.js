//@@viewOn:imports
import { createComponent, Utils, Content, useState } from "uu5g05";
import Config from "./config/config.js";
//@@viewOff:imports

let initialShoppingLists = [
  {
    id: Utils.String.generateId(),
    sys: {
      cts: "2023-10-27 11:50:13.532Z",
      mts: "2023-10-27 11:51:42.128Z",
      rev: 0
    },
    ownerIdentity: "3119-2385-1", // UU ID majitele nákupního seznamu
    memberIdentities: ["1111-1111-1", "2222-2222-2"], // UU IDs členů nákupního seznamu
    name: "Nákupní seznam 1",
    color: "red",
    archived: false,
    totalTasks: 3,
    completedTasks: 1
  },
  {
    id: Utils.String.generateId(),
    sys: {
      cts: "2023-10-27 18:50:13.532Z",
      mts: "2023-10-27 18:51:42.128Z",
      rev: 0
    },
    ownerIdentity: "3911-9463-333-0000", // UU ID majitele nákupního seznamu
    memberIdentities: ["1111-1111-1", "2222-2222-2"], // UU IDs členů nákupního seznamu
    name: "Nákupní seznam 2",
    color: "yellow",
    archived: false,
    totalTasks: 4,
    completedTasks: 4
  },
  {
    id: Utils.String.generateId(),
    sys: {
      cts: "2023-10-28 11:50:13.532Z",
      mts: "2023-10-28 11:51:42.128Z",
      rev: 0
    },
    ownerIdentity: "3119-2385-1", // UU ID majitele nákupního seznamu
    memberIdentities: ["1111-1111-1", "2222-2222-2"], // UU IDs členů nákupního seznamu
    name: "Nákupní seznam 3",
    color: "green",
    archived: true,
    totalTasks: 8,
    completedTasks: 5
  }
]

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ListsProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListsProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [shoppingLists, setShoppingLists] = useState(initialShoppingLists);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const value = { shoppingLists };
    return typeof props.children === "function" ? props.children(value) : props.children;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListsProvider };
export default ListsProvider;
//@@viewOff:exports
