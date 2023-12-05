const { TestHelper } = require("uu_appg01_server-test");

beforeEach(async () => {
    await TestHelper.setup();
    await TestHelper.initUuSubAppInstance();
    await TestHelper.createUuAppWorkspace();
    await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: "urn:uu:GGPLUS4U" });
});

afterEach(async () => {
    await TestHelper.teardown();
});

const LISTCREATE = {
    name: "List 1",
    color: "red",
    memberIdentities: []
}

describe("Shoppinglist Create uuCmd tests", () => {
    test("HDS", async () => {
        await TestHelper.login("Authorities");
        let dtoIn = LISTCREATE;
        let result = await TestHelper.executePostCommand("shoppinglist/create", dtoIn);

        expect(result.data.name).toEqual(LISTCREATE.name);
        expect(result.data.color).toEqual(LISTCREATE.color);
        expect(result.data.awid).toEqual(TestHelper.awid);
        expect(result.data.uuAppErrorMap).toEqual({});
    });

    test("A1 - missing dtoIn", async () => {
        await TestHelper.login("Authorities");

        expect.assertions(2);
        try {
            await TestHelper.executePostCommand("shoppinglist/create", null);
        } catch (e) {
            expect(e.code).toEqual("uun-shoppinglist-main/shoppinglist/create/invalidDtoIn");
            expect(e.message).toEqual("DtoIn is not valid.");
        }
    });

    test("A2 - dtoIn doesn't contain name", async () => {
        await TestHelper.login("Authorities");

        expect.assertions(2);
        try {
            await TestHelper.executePostCommand("shoppinglist/create", {});
        } catch (e) {
            expect(e.code).toEqual("uun-shoppinglist-main/shoppinglist/create/invalidDtoIn");
            expect(e.message).toEqual("DtoIn is not valid.");
        }
    });
});