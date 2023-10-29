//@@viewOn:imports
import { createVisualComponent, Utils, useState, useLsi } from "uu5g05";
import { Form, FormText, Color, SubmitButton, CancelButton } from "uu5g05-forms";
import { Modal, Button } from "uu5g05-elements";
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
function withControlledInput(Input) {
  return (props) => {
    const {
      value: propsValue,
      onChange,
      onValidationStart,
      onValidationEnd,
      feedback,
      message,
      messageParams,
    } = props;

    const [value, setValue] = useState(propsValue);
    const [errorList, setErrorList] = useState(null);
    const [pending, setPending] = useState();

    return (
      <div>
        <Input
          {...props}
          value={value}
          feedback={errorList?.[0].feedback || feedback}
          message={errorList?.[0].message || message}
          messageParams={errorList?.[0].messageParams || messageParams}
          pending={pending}
          onChange={(e) => {
            typeof onChange === "function" && onChange(e);
            setValue(e.data.value);
          }}
          onValidationStart={(e) => {
            typeof onValidationStart === "function" && onValidationStart(e);
            setPending(true);
          }}
          onValidationEnd={(e) => {
            typeof onValidationEnd === "function" && onValidationEnd(e);
            setErrorList(e.data.errorList.length ? e.data.errorList : null);
            setPending(false);
          }}
        />
      </div>
    );
  };
}
//@@viewOff:helpers

const EditShoppingListModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "EditShoppingListModal",
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
    const lsi = useLsi(importLsi, ["ShoppingList"]);

    async function handleSubmit(event) {
      const values = { ...event.data.value, ...{color: selectedColor} };
      return props.onSubmit(values);
    }

    let selectedColor = props.shoppingList.color;
    function handleColorOnChange(event) {
      selectedColor = event.data.value;
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, EditShoppingListModal);
    const ColorPicker = withControlledInput(Color);

    const formControls = (
      <div className={Css.controls()}>
        <CancelButton onClick={props.onCancel}>{lsi.cancelEdit}</CancelButton>
        {props.isOwner && <SubmitButton>{lsi.edit}</SubmitButton>}
      </div>
    );

    return currentNestingLevel ? (
      <Form.Provider onSubmit={handleSubmit}>
        <Modal header={lsi.edit} footer={formControls} open>
          <Form.View>
            <FormText
              label={lsi.name}
              initialValue={props.shoppingList.name}
              name="name"
              maxLength={255}
              className={Css.input()}
              disabled={!props.isOwner}
              required
            />

            <ColorPicker
              label={lsi.color}
              value={props.shoppingList.color}
              valueType="colorScheme"
              onChange={handleColorOnChange}
              disabled={!props.isOwner}
              required
            />
          </Form.View>
        </Modal>
      </Form.Provider>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { EditShoppingListModal };
export default EditShoppingListModal;
//@@viewOff:exports
