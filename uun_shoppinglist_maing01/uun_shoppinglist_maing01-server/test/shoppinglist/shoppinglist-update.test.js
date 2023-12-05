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

const LIST1 = {
    name: "List 1",
    color: "red",
    memberIdentities: []
}

describe("Shoppinglist Update uuCmd tests", () => {
    test("HDS", async () => {
        await TestHelper.login("Authorities");
        let list = await TestHelper.executePostCommand("shoppinglist/create", LIST1);
        let dtoIn = {
            id: list.id,
            name: "List 2",
            color: "blue"
        };

        let result = await TestHelper.executePostCommand("shoppinglist/update", dtoIn);

        expect(result.data.name).toEqual(dtoIn.name);
        expect(result.data.color).toEqual(dtoIn.color);
        expect(result.data.uuAppErrorMap).toEqual({});
    });

    test("A1 - missing dtoIn", async () => {
        await TestHelper.login("Authorities");

        expect.assertions(2);
        try {
            await TestHelper.executePostCommand("shoppinglist/update", null);
        } catch (e) {
            expect(e.code).toEqual("uun-shoppinglist-main/shoppinglist/update/invalidDtoIn");
            expect(e.message).toEqual("DtoIn is not valid.");
        }
    });

    test("A2 - dtoIn doesn't contain id", async () => {
        await TestHelper.login("Authorities");

        expect.assertions(2);
        try {
            await TestHelper.executePostCommand("shoppinglist/update", {});
        } catch (e) {
            expect(e.code).toEqual("uun-shoppinglist-main/shoppinglist/update/invalidDtoIn");
            expect(e.message).toEqual("DtoIn is not valid.");
        }
    });

    test("A3 - shopping list doesn't exist", async () => {
        await TestHelper.login("Authorities");

        expect.assertions(2);
        try {
            await TestHelper.executePostCommand("shoppinglist/update", { id: "5e2d3e9f0a3d3b1d681d2e5f", name: "List 2", color: "blue" });
        } catch (e) {
            expect(e.code).toEqual("uun-shoppinglist-main/shoppinglist/update/shoppinglistDoesNotExist");
            expect(e.message).toEqual("Shoppinglist does not exist.");
        }
    });

    test("A4 - shopping list is archived", async () => {
        await TestHelper.login("Authorities");
        let list = await TestHelper.executePostCommand("shoppinglist/create", LIST1);
        let dtoIn = {
            id: list.id,
            name: "List 2",
            color: "blue"
        };
        await TestHelper.executePostCommand("shoppinglist/archive", {id: dtoIn.id});

        expect.assertions(2);
        try {
            await TestHelper.executePostCommand("shoppinglist/update", dtoIn);
        } catch (e) {
            expect(e.code).toEqual("uun-shoppinglist-main/shoppinglist/update/shoppinglistIsArchived");
            expect(e.message).toEqual("Shoppinglist is archived.");
        }
    });
});