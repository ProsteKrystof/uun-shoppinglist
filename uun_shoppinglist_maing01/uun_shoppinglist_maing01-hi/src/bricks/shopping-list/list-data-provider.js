//@@viewOn:imports
import { createComponent, Utils, PropTypes, useDataObject, useSession } from "uu5g05";
import Config from "./config/config.js";
import Calls from "calls";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const ListDataProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListDataProvider",
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
    const { identity } = useSession(); // pro testovani
    const shoppinglistDataObject = useDataObject({
      handlerMap: {
        load: handleLoad,
        update: handleUpdate,
        leave: handleLeave,
        setMembers: handleSetMembers
      }
    });

    function handleLoad() {
      return Calls.Shoppinglist.get({id: props.id});
    };

    function handleUpdate(dtoIn) {
      return Calls.Shoppinglist.update({...dtoIn, id: props.id});
    };

    function handleLeave() {
      return Calls.Shoppinglist.leave({id: props.id});
    };

    function handleSetMembers(dtoIn) {
      return Calls.Shoppinglist.setMembers({...dtoIn, id: props.id});
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    // pro ucely testovani nastavit uuIdentity a uuIdentityName u seznamu na momentalniho uzivatele
    console.log("Testovaci funkce pro nastaveni identity u seznamu zapnuta - nezapomenout vypnout!");
    if (shoppinglistDataObject?.data) {
      shoppinglistDataObject.data.uuIdentity = identity.uuIdentity;
      shoppinglistDataObject.data.uuIdentityName = identity.name;
    }

    return typeof props.children === "function" ? props.children(shoppinglistDataObject) : props.children;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListDataProvider };
export default ListDataProvider;
//@@viewOff:exports
