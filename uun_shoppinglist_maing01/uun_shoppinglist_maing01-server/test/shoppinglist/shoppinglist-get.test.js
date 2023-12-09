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

describe("Shoppinglist Get uuCmd tests", () => {
    test("HDS", async () => {
        await TestHelper.login("Authorities");
        let list = await TestHelper.executePostCommand("shoppinglist/create", LIST1);
        let dtoIn = {
            id: list.id
        };
        let result = await TestHelper.executeGetCommand("shoppinglist/get", dtoIn);

        expect(result.data.name).toEqual(LIST1.name);
        expect(result.data.color).toEqual(LIST1.color);
        expect(result.data.awid).toEqual(TestHelper.awid);
        expect(result.data.uuAppErrorMap).toEqual({});
    });

    test("A1 - missing dtoIn", async () => {
        await TestHelper.login("Authorities");

        expect.assertions(2);
        try {
            await TestHelper.executeGetCommand("shoppinglist/get", null);
        } catch (e) {
            expect(e.code).toEqual("uun-shoppinglist-main/shoppinglist/get/invalidDtoIn");
            expect(e.message).toEqual("DtoIn is not valid.");
        }
    });

    test("A2 - dtoIn doesn't contain id", async () => {
        await TestHelper.login("Authorities");

        expect.assertions(2);
        try {
            await TestHelper.executeGetCommand("shoppinglist/get", {});
        } catch (e) {
            expect(e.code).toEqual("uun-shoppinglist-main/shoppinglist/get/invalidDtoIn");
            expect(e.message).toEqual("DtoIn is not valid.");
        }
    });

    test("A3 - shopping list doesn't exist", async () => {
        await TestHelper.login("Authorities");

        expect.assertions(2);
        try {
            await TestHelper.executeGetCommand("shoppinglist/get", { id: "5ebf19e0e5a7a10b307e5f7a" });
        } catch (e) {
            expect(e.code).toEqual("uun-shoppinglist-main/shoppinglist/get/shoppinglistDoesNotExist");
            expect(e.message).toEqual("Shoppinglist does not exist.");
        }
    });

    test("A4 - user is not authorized", async () => {
        // pouziti RIMO uctu pro vytvoreni listu z jine uuIdentity
        await TestHelper.login("AuthoritiesRIMO");
        let list = await TestHelper.executePostCommand("shoppinglist/create", LIST1);
        let dtoIn = {
            id: list.id
        };

        await TestHelper.login("Authorities");
        expect.assertions(2);
        try {
            await TestHelper.executeGetCommand("shoppinglist/get", dtoIn);
        } catch (e) {
            expect(e.code).toEqual("uun-shoppinglist-main/shoppinglist/get/userNotAuthorized");
            expect(e.message).toEqual("User is not authorized.");
        }
    });
});