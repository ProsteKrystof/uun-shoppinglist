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
    return typeof props.children === "function" ? props.children(shoppinglistDataList) : props.children;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListsProvider };
export default ListsProvider;
//@@viewOff:exports
