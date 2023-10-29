//@@viewOn:imports
import { createVisualComponent, Utils, useLsi } from "uu5g05";
import { Form, FormText, SubmitButton, CancelButton } from "uu5g05-forms";
import { Modal } from "uu5g05-elements";
import Config from "./config/config.js";
import importLsi from "../../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  input: () => Config.Css.css({ marginBottom: 16 }),
  controls: () => Config.Css.css({ display: "flex", gap: 8, justifyContent: "flex-end" }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const AddTaskModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "AddTaskModal",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lsi = useLsi(importLsi, ["Task"]);

    async function handleSubmit(event) {
      const values = { ...event.data.value };
      return props.onSubmit(values);
    }

    function handleValidate(event) {
      const { name } = event.data.value;

      if (!name) {
        return {
          message: "No name",
        };
      }
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, AddTaskModal);

    const formControls = (
      <div className={Css.controls()}>
        <CancelButton onClick={props.onCancel}>{lsi.cancelAdd}</CancelButton>
        <SubmitButton>{lsi.add}</SubmitButton>
      </div>
    );

    return currentNestingLevel ? (
      <Form.Provider onSubmit={handleSubmit}>
        <Modal header={lsi.add} footer={formControls} open>
          <Form.View>
            <FormText
              label={lsi.taskName}
              name="name"
              maxLength={255}
              className={Css.input()}
              required
              autoFocus
            />
          </Form.View>
        </Modal>
      </Form.Provider>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { AddTaskModal };
export default AddTaskModal;
//@@viewOff:exports
