//@@viewOn:imports
import { createVisualComponent, Utils, Content, PropTypes } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
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

const MemberItem = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "MemberItem",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    member: PropTypes.object.isRequired,
    handleDelete: PropTypes.func.isRequired,
    allowRemove: PropTypes.bool.isRequired
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, MemberItem);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Uu5Elements.Box
          className={Config.Css.css({ paddingLeft: 5, paddingBottom: 5, paddingTop: 5, marginBottom: 5 })}
          borderRadius="expressive"
          significance="distinct"
          style={{display: "flex"}}
        >
          <Uu5Elements.InfoItem
            imageSrc="https://cdn.plus4u.net/uu-plus4u5g01/4.0.0/assets/img/anonymous.png"
            title={props.member.name === "Unknown" ? props.member.identity : props.member.name}
          />

          {props.allowRemove && (<Uu5Elements.Button
            style={{marginLeft: "auto", marginRight: 5}}
            colorScheme="red"
            icon="mdi-exit-to-app"
            onClick={() => props.handleDelete(props.member.identity)}
          />)}
        </Uu5Elements.Box>

        <Content nestingLevel={currentNestingLevel}>{children}</Content>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { MemberItem };
export default MemberItem;
//@@viewOff:exports
