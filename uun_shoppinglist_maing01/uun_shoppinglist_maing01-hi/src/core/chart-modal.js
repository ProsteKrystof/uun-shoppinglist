//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, useLsi } from "uu5g05";
import { Modal, Button } from "uu5g05-elements";
import { PieChart } from "uu5chartsg01";
import Config from "./config/config.js";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
const testData = [
  {name: "Chleba", value: 5},
  {name: "Rolhir", value: 2}
]
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
  controls: () => Config.Css.css({ display: "flex", gap: 8, justifyContent: "flex-end" })
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ChartModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ChartModal",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    header: PropTypes.string,
    data: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    header: "Chart"
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lsi = useLsi(importLsi, ["ChartModal"]);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ChartModal);

    const footerButtons = (
      <div className={Css.controls()}>
        <Button onClick={props.onClose}>{lsi.close}</Button>
      </div>
    );

    return currentNestingLevel ? (
      <div {...attrs}>
        <Modal header={props.header} footer={footerButtons} open>
          <PieChart
            data={[props.data]}
            serieList={[
              {
                valueKey: "value",
                labelKey: "name",
                label: [{ position: "inside", type: "percentage" }, { position: "outside", type: "label" }]
              }
            ]}
          />
        </Modal>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ChartModal };
export default ChartModal;
//@@viewOff:exports
