//@@viewOn:imports
import { createComponent, Utils, useState, useEffect, useSession } from "uu5g05";
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
    name: "Nákupní seznam na víkend",
    color: "red",
    archived: false,
    totalTasks: 3,
    completedTasks: 1
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
    name: "Tesco nákupy",
    color: "blue",
    archived: true,
    totalTasks: 8,
    completedTasks: 5
  }
]

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
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
    const { identity } = useSession();

    useEffect(() => {
      // pro ucely testovani vytvori novy seznam a nastavi momentalni uuId jako majitele
      createList({
        ownerIdentity: identity.uuIdentity,
        name: "Nákupní seznam na týden",
        color: "yellow",
        memberIdentities: []
      })
    }, []);

    function createList(list) {
      // nahodne nastaveni poctu ukolu a dokoncenych ukolu pro ucely testovani
      const randomTotalTasks = Math.floor(Math.random() * 10);
      const randomCompletedTasks = Math.floor(Math.random() * randomTotalTasks);

      const newList = {
        ...list,
        id: Utils.String.generateId(),
        sys: {
          cts: new Date(),
          mts: new Date(),
          rev: 0
        },
        archived: false,
        totalTasks: randomTotalTasks,
        completedTasks: randomCompletedTasks
      };
      console.log(newList);
      setShoppingLists((prevState) => [...prevState, newList]);
    }

    function archiveList(listId) {
      const newList = shoppingLists.map((list) => {
        if (list.id === listId) {
          list.archived = true;
        }
        return list;
      });
      setShoppingLists(newList);
    }

    function deleteList(listId) {
      const newList = shoppingLists.filter((list) => list.id !== listId);
      setShoppingLists(newList);
    }

    function leaveList(listId) {
      // pro ucely testovani pouze vymaze list
      const newList = shoppingLists.filter((list) => list.id !== listId);
      setShoppingLists(newList);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const value = { shoppingLists, createList, archiveList, deleteList, leaveList };
    return typeof props.children === "function" ? props.children(value) : props.children;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListsProvider };
export default ListsProvider;
//@@viewOff:exports
