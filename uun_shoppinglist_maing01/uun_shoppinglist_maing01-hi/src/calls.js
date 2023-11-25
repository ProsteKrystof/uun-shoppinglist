import { Environment } from "uu5g05";
import Plus4U5 from "uu_plus4u5g02";

// NOTE During frontend development it's possible to redirect uuApp command calls elsewhere, e.g. to production/staging
// backend, by configuring it in *-hi/env/development.json:
//   "uu5Environment": {
//     "callsBaseUri": "https://uuapp-dev.plus4u.net/vnd-app/awid"
//   }

const Calls = {
  async call(method, url, dtoIn, clientOptions) {
    const response = await Plus4U5.Utils.AppClient[method](url, dtoIn, clientOptions);
    return response.data;
  },

  // // example for mock calls
  // loadDemoContent(dtoIn) {
  //   const commandUri = Calls.getCommandUri("loadDemoContent");
  //   return Calls.call("get", commandUri, dtoIn);
  // },

  loadIdentityProfiles() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/initUve");
    return Calls.call("get", commandUri);
  },

  initWorkspace(dtoInData) {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/init");
    return Calls.call("post", commandUri, dtoInData);
  },

  getWorkspace() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/get");
    return Calls.call("get", commandUri);
  },

  async initAndGetWorkspace(dtoInData) {
    await Calls.initWorkspace(dtoInData);
    return await Calls.getWorkspace();
  },

  Shoppinglist: {
    list(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppinglist/list");
      return Calls.call("get", commandUri, dtoIn);
    },

    get(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppinglist/get");
      return Calls.call("get", commandUri, dtoIn);
    },

    create(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppinglist/create");
      return Calls.call("post", commandUri, dtoIn);
    },

    update(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppinglist/update");
      return Calls.call("post", commandUri, dtoIn);
    },

    delete(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppinglist/delete");
      return Calls.call("post", commandUri, dtoIn);
    },

    archive(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppinglist/archive");
      return Calls.call("post", commandUri, dtoIn);
    },

    setMembers(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppinglist/setMembers");
      return Calls.call("post", commandUri, dtoIn);
    }
  },

  Task: {
    list(dtoIn) {
      const commandUri = Calls.getCommandUri("task/list");
      return Calls.call("get", commandUri, dtoIn);
    },

    get(dtoIn) {
      const commandUri = Calls.getCommandUri("task/get");
      return Calls.call("get", commandUri, dtoIn);
    },

    create(dtoIn) {
      const commandUri = Calls.getCommandUri("task/create");
      return Calls.call("post", commandUri, dtoIn);
    },

    delete(dtoIn) {
      const commandUri = Calls.getCommandUri("task/delete");
      return Calls.call("post", commandUri, dtoIn);
    },

    finish(dtoIn) {
      const commandUri = Calls.getCommandUri("task/finish");
      return Calls.call("post", commandUri, dtoIn);
    }
  },

  getCommandUri(useCase, baseUri = Environment.appBaseUri) {
    return (!baseUri.endsWith("/") ? baseUri + "/" : baseUri) + (useCase.startsWith("/") ? useCase.slice(1) : useCase);
  },
};

export default Calls;
