//@@viewOn:imports
import { createVisualComponent, Utils, Content, PropTypes, useSession, useState, useRoute, useLsi } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import importLsi from "../../lsi/import-lsi.js";
import ProgressTracker from "../task/progress-tracker.js";
import LeaveDialog from "./leave-dialog.js";
import { getSchemeColor } from "../utils.js";
import Config from "./config/config.js";
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

const ListCard = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListCard",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    archiveList: PropTypes.func.isRequired,
    deleteList: PropTypes.func.isRequired
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    const listDataObject = props.data;
    const { identity } = useSession();
    const [route, setRoute] = useRoute();
    const lsi = useLsi(importLsi, ["ShoppingList"]);

    const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
    const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    function handleArchive() {
      props.archiveList(listDataObject);
    }

    function handleDelete() {
      props.deleteList(listDataObject);
    }

    function handleLeave() {
      props.leaveList(listDataObject);
    }

    function handleArchiveButton(event) {
      event.stopPropagation();
      setArchiveDialogOpen(true);
    }

    function handleDeleteButton(event) {
      event.stopPropagation();
      setDeleteDialogOpen(true);
    }

    function handleLeaveButton(event) {
      event.stopPropagation();
      setLeaveDialogOpen(true);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ListCard);
    const list = listDataObject.data;

    const isOwner = list.uuIdentity === identity.uuIdentity;
    const canBeArchived = isOwner && !list.archived;
    const canBeDeleted = isOwner && list.archived;

    return currentNestingLevel ? (
      <div {...attrs}>
        <Uu5Elements.Box
          className={Config.Css.css({ padding: 0, marginBottom: 5, marginRight: 2 })}
          borderRadius="expressive"
          significance="distinct"
          style={{ backgroundColor: getSchemeColor(list.color) }}
          onClick={() => setRoute("shoppingListDetail", { id: list.id })}
        >
          <Uu5Elements.Box
            className={Config.Css.css({ paddingLeft: 16, paddingBottom: 5, paddingTop: 1, marginLeft: 5, marginRight: -2 })}
            borderRadius="expressive"
            significance="distinct"
          >
            <div style={{display: "flex"}}>
              {
                list.archived ? (
                  <h2 style={{marginBottom: 5, color: "grey"}}> <Uu5Elements.Icon icon={"mdi-archive"} /> {list.name}</h2>
                ) : (
                  <h2 style={{marginBottom: 5}}>{list.name}</h2>
                )
              }
              <div style={{marginLeft: "auto", marginRight: 16, marginTop: 16}}>
                <ProgressTracker completedAmount={list.finishedTaskAmount} totalAmount={list.taskAmount} />
              </div>
            </div>

            <div style={{display: "flex"}}>
              {
                isOwner ? (
                  <p style={{marginTop: 5}}><Uu5Elements.Icon icon={"mdi-account-circle"} /> {lsi.owner}</p>
                ) : (
                  <p style={{marginTop: 5}}><Uu5Elements.Icon icon={"mdi-account"} /> {lsi.member}</p>
                )
              }
              <div style={{marginLeft: "auto", marginRight: 16}}>
                {canBeArchived && <Uu5Elements.Button
                  style={{marginBottom: 5}}
                  significance="highlighted"
                  colorScheme="red"
                  icon="mdi-archive"
                  onClick={handleArchiveButton}
                />}

                {canBeDeleted && <Uu5Elements.Button
                  style={{marginBottom: 5}}
                  significance="highlighted"
                  colorScheme="red"
                  icon="mdi-trash-can"
                  onClick={handleDeleteButton}
                />}

                {!isOwner && <Uu5Elements.Button
                  style={{marginBottom: 5}}
                  significance="highlighted"
                  colorScheme="red"
                  icon="mdi-exit-to-app"
                  onClick={handleLeaveButton}
                />}
              </div>
            </div>
          </Uu5Elements.Box>
        </Uu5Elements.Box>

        {/* Archive shopping list dialog */}
        <Uu5Elements.Dialog
          open={archiveDialogOpen}
          onClose={() => setArchiveDialogOpen(false)}
          header={lsi.archiveHeader}
          icon={<Uu5Elements.Svg code="uugdssvg-svg-folder" />}
          info={lsi.archiveInfo}
          actionDirection="horizontal"
          actionList={[
            {
              children: lsi.archiveDeny,
              significance: "distinct",
            },
            {
              children: lsi.archive,
              onClick: handleArchive,
              colorScheme: "red",
              significance: "highlighted",
            },
          ]}
        />

        {/* Delete shopping list dialog */}
        <Uu5Elements.Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          header={lsi.deleteHeader}
          icon={<Uu5Elements.Svg code="uugdssvg-svg-delete" />}
          info={lsi.deleteInfo}
          actionDirection="horizontal"
          actionList={[
            {
              children: lsi.deleteDeny,
              significance: "distinct",
            },
            {
              children: lsi.delete,
              onClick: handleDelete,
              colorScheme: "red",
              significance: "highlighted",
            },
          ]}
        />

        {/* Leave shopping list dialog */}
        <LeaveDialog leaveDialogOpen={leaveDialogOpen} setLeaveDialogOpen={setLeaveDialogOpen} handleLeave={handleLeave} />

        <Content nestingLevel={currentNestingLevel}>{children}</Content>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListCard };
export default ListCard;
//@@viewOff:exports
