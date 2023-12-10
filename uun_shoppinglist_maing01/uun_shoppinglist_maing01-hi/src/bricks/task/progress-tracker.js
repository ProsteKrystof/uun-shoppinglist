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

const ProgressTracker = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ProgressTracker",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    completedAmount: PropTypes.number,
    totalAmount: PropTypes.number,
    showIcon: PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    completedAmount: 0,
    totalAmount: 0,
    showIcon: true,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ProgressTracker);

    return currentNestingLevel ? (
      <div {...attrs} style={{textAlign: "right"}}>
        {props.completedAmount === props.totalAmount ? <Uu5Elements.Icon icon="mdi-checkbox-marked-circle" /> : <Uu5Elements.Icon icon="mdi-checkbox-marked-circle-outline" />} {props.completedAmount}/{props.totalAmount}
        <Content nestingLevel={currentNestingLevel}>{children}</Content>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ProgressTracker };
export default ProgressTracker;
//@@viewOff:exports
