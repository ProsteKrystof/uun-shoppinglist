import UunShoppinglist from "uun_shoppinglist_maing01-hi";
import { testProperties } from "uu5g05-test";

const CONFIG = {
  props: {
    // left: {
    //   values: ["Left as text", <span key="l">Left as JSX</span>, 0],
    // },
  },
  requiredProps: {
    // children: "Children content",
  },
};

describe(`UunShoppinglist.Routes.ShoppingListDetail`, () => {
  testProperties(UunShoppinglist.Routes.ShoppingListDetail, CONFIG);
});
