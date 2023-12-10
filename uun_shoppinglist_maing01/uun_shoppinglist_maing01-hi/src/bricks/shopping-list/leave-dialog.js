//@@viewOn:imports
import { createVisualComponent, Utils, Content, PropTypes, useLsi } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import { useThemeContext } from "../../core/theme/theme-context.js";
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

const LeaveDialog = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "LeaveDialog",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    leaveDialogOpen: PropTypes.bool.isRequired,
    setLeaveDialogOpen: PropTypes.func.isRequired,
    handleLeave: PropTypes.func.isRequired
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    const lsi = useLsi(importLsi, ["ShoppingList"]);
    const [isDark] = useThemeContext();
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, LeaveDialog);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Uu5Elements.Box significance={isDark ? "highlighted" : "common"}>  
          <Uu5Elements.Dialog
            open={props.leaveDialogOpen}
            onClose={() => props.setLeaveDialogOpen(false)}
            header={lsi.leaveHeader}
            icon={<Uu5Elements.Svg code="uugdssvg-activity-problem" />}
            info={lsi.leaveInfo}
            actionDirection="horizontal"
            actionList={[
              {
                children: lsi.leaveDeny,
                significance: "distinct",
              },
              {
                children: lsi.leave,
                onClick: props.handleLeave,
                colorScheme: "red",
                significance: "highlighted",
              },
            ]}
          />
        </Uu5Elements.Box>

        <Content nestingLevel={currentNestingLevel}>{children}</Content>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { LeaveDialog };
export default LeaveDialog;
//@@viewOff:exports
