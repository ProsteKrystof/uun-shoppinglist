//@@viewOn:imports
import { createComponent, Utils, useState, useEffect, useDataList, useSession } from "uu5g05";
import Config from "./config/config.js";
import Calls from "calls";
//@@viewOff:imports

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
    const { identity } = useSession(); // pro testovani
    const shoppinglistDataList = useDataList({
      handlerMap: {
        load: handleLoad,
        loadNext: handleLoadNext,
        create: handleCreate
      },
      itemHandlerMap: {
        update: handleUpdate,
        delete: handleDelete,
        archive: handleArchive,
        leave: handleLeave
      },
      pageSize: 100
    });

    function handleLoad(dtoIn) {
      dtoIn.pageInfo.pageIndex = 0;
      return Calls.Shoppinglist.list(dtoIn);
    }

    function handleLoadNext(dtoIn) {
      return Calls.Shoppinglist.list(dtoIn);
    }

    function handleCreate(dtoIn) {
      return Calls.Shoppinglist.create(dtoIn);
    }

    function handleUpdate(dtoIn) {
      return Calls.Shoppinglist.update(dtoIn);
    }

    function handleDelete(dtoIn) {
      return Calls.Shoppinglist.delete(dtoIn);
    }

    function handleArchive(dtoIn) {
      return Calls.Shoppinglist.archive(dtoIn);
    }

    function handleLeave(dtoIn) {
      return Calls.Shoppinglist.leave(dtoIn);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    // pro ucely testovani nastavit uuIdentity a uuIdentityName u prvnich dvou seznamu na momentalniho uzivatele
    console.log("Testovaci funkce pro nastaveni identit u seznamu zapnuta - nezapomenout vypnout!");
    shoppinglistDataList?.data?.forEach((list) => {
      if (list.data.id === "6560a7eab6a10b2c3cd03ea5" || list.data.id === "65639cb73905378b6463aaa7") {
        list.data.uuIdentity = identity.uuIdentity;
        list.data.uuIdentityName = identity.name;
      }
    });

    return typeof props.children === "function" ? props.children(shoppinglistDataList) : props.children;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListsProvider };
export default ListsProvider;
//@@viewOff:exports
