//@@viewOn:imports
import { createComponent, Utils, useState, useEffect, useSession } from "uu5g05";
import Config from "./config/config.js";
//@@viewOff:imports

let initialShoppingListData = {
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
  tasks: [
    {
      id: Utils.String.generateId(),
      name: "Rohlíky",
      addedBy: "Petr Novák",
      completed: false
    },
    {
      id: Utils.String.generateId(),
      name: "Chleba",
      addedBy: "Petr Novák",
      completed: false
    },
    {
      id: Utils.String.generateId(),
      name: "Sůl",
      addedBy: "Petr Novák",
      completed: true
    }
  ]
};

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const ListDataProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListDataProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private   
    const [shoppingList, setShoppingList] = useState(initialShoppingListData);
    const { identity } = useSession();

    useEffect(() => {
      // pro ucely testovani nastavi momentalni uuid jako majitele seznamu
      let newList = {...shoppingList};
      newList.ownerIdentity = identity.uuIdentity;
      setShoppingList(newList);
    }, []);
    
    // shopping list
    function updateShoppingList(newInfo) {
      setShoppingList({...shoppingList, ...newInfo});
    };

    // tasks
    const taskFunctions = {
      createTask(taskName, userName) {
        let task = {
          id: Utils.String.generateId(),
          name: taskName,
          addedBy: userName,
          completed: false
        };

        shoppingList.tasks.push(task);
        let newList = {...shoppingList};

        setShoppingList(newList);
      },
      completeTask(task) {
        let newTasks = shoppingList.tasks.map((item) => item.id === task.id ? {...item, completed: true} : item);
        let newList = {...shoppingList};
        newList.tasks = newTasks;
  
        setShoppingList(newList);
      },
      removeTask(task) {
        let newTasks = shoppingList.tasks.filter((item) => item.id !== task.id);
        let newList = {...shoppingList};
        newList.tasks = newTasks;
  
        setShoppingList(newList);
      }
    };
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const value = { shoppingList, taskFunctions, updateShoppingList };
    return typeof props.children === "function" ? props.children(value) : props.children;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListDataProvider };
export default ListDataProvider;
//@@viewOff:exports
