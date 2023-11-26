//@@viewOn:imports
import { createVisualComponent, Utils, Content, PropTypes, useState, useLsi } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import MemberItem from "./member-item.js";
import Config from "./config/config.js";
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

const MemberList = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "MemberList",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    members: PropTypes.array,
    setMemberList: PropTypes.func.isRequired,
    isOwner: PropTypes.bool.isRequired
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    const lsi = useLsi(importLsi, ["ShoppingList"]);
    const { addAlert } = Uu5Elements.useAlertBus();
    const [inputIdentity, setInputIdentity] = useState("");

    function handleInputIdentityChange(event) {
      const result = event.target.value.replace(/[^0-9-]/, '');
      setInputIdentity(result.substring(0, 20));
    }

    function handleInputIdentityButtonOnClick() {
      if (inputIdentity == "") return; // prevent adding empty strings
      if (props.memberList.indexOf(inputIdentity) !== -1) { // prevent adding duplicate strings
        addAlert({
          header: lsi.addMemberError,
          message: lsi.memberAlreadyExists,
          priority: "error",
          durationMs: 2000
        })
        return;
      }

      const newList = [...props.memberList];
      newList.push({identity: inputIdentity, name: "Unknown"});

      props.setMemberList(newList);
      setInputIdentity(""); // clear identity input
    }

    function handleMemberDeleteButton(memberIdentity) {
      let newMembers = props.memberList.filter((item) => item.identity !== memberIdentity);
      let newList = [...newMembers];

      props.setMemberList(newList);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, MemberList);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Uu5Elements.Box
          className={Config.Css.css({ padding: 10 })}
          borderRadius="moderate"
        >
          {/* Add member */}
          {props.isOwner && (<Uu5Elements.Grid style={{marginBottom: 10}} templateColumns={{ xs: "repeat(12, 1fr)" }}>
            <Uu5Elements.Grid.Item colSpan={8}>
              {({ style }) => (
                <Uu5Elements.Input
                  className={Config.Css.css({ ...style})}
                  type={"text"}
                  value={inputIdentity}
                  placeholder={lsi.userIdentity}
                  onChange={handleInputIdentityChange}
                />
              )}
            </Uu5Elements.Grid.Item>
            <Uu5Elements.Grid.Item colSpan={4}>
              {({ style }) => (
                <Uu5Elements.Button
                  className={Config.Css.css({ ...style})}
                  significance="highlighted"
                  colorScheme="blue"
                  icon="uugds-plus"
                  onClick={handleInputIdentityButtonOnClick}
                >
                  {lsi.addMember}
                </Uu5Elements.Button>
              )}
            </Uu5Elements.Grid.Item>
          </Uu5Elements.Grid>)}

          {/* Member list */}
          {props.memberList?.map((member) => (
            <MemberItem key={member.identity} member={member} allowRemove={props.isOwner} handleDelete={handleMemberDeleteButton} />
          ))}
        </Uu5Elements.Box>
        <Content nestingLevel={currentNestingLevel}>{children}</Content>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { MemberList };
export default MemberList;
//@@viewOff:exports
