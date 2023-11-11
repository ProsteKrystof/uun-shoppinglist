//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, useState, useLsi, useRef } from "uu5g05";
import { Form, FormText, Color, Label, SubmitButton, CancelButton } from "uu5g05-forms";
import { Modal } from "uu5g05-elements";
import MemberList from "./member-list.js";
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
  propTypes: {
    shoppingList: PropTypes.object,
    isOwner: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private    
    const lsi = useLsi(importLsi, ["ShoppingList"]);

    const editMode = props.shoppingList !== undefined;

    let selectedColor = useRef(editMode ? props.shoppingList.color : "light-blue");
    const [memberList, setMemberList] = useState(editMode ? props.shoppingList.memberIdentities : []);


    async function handleSubmit(event) {
      const values = { ...event.data.value, ...{color: selectedColor.current}, ...{memberIdentities: memberList} };
      return props.onSubmit(values);
    }

    function handleColorOnChange(event) {
      selectedColor.current = event.data.value;
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, EditShoppingListModal);
    const ColorPicker = withControlledInput(Color);

    const formControls = (
      <div className={Css.controls()}>
        <CancelButton onClick={props.onCancel}>{lsi.cancel}</CancelButton>
        {props.isOwner && <SubmitButton>{editMode ? lsi.edit : lsi.create}</SubmitButton>}
      </div>
    );

    return currentNestingLevel ? (
      <Form.Provider onSubmit={(handleSubmit)}>
        <Modal header={editMode ? lsi.edit : lsi.create} footer={formControls} open>
          <Form.View>
            <FormText
              label={lsi.name}
              placeholder={lsi.name}
              initialValue={editMode ? props.shoppingList.name : ""}
              name="name"
              maxLength={255}
              className={Css.input()}
              disabled={!props.isOwner}
              required
            />

            <ColorPicker
              label={lsi.color}
              value={selectedColor.current}
              valueType="colorScheme"
              onChange={handleColorOnChange}
              disabled={!props.isOwner}
              required
            />
            <br/>
            <Label>{lsi.members}</Label>
            <MemberList memberList={memberList} setMemberList={setMemberList} isOwner={props.isOwner}/>
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
