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

describe("Shoppinglist Delete uuCmd tests", () => {
    test("HDS", async () => {
        await TestHelper.login("Authorities");
        let list = await TestHelper.executePostCommand("shoppinglist/create", LIST1);
        let dtoIn = {
            id: list.id
        };
        await TestHelper.executePostCommand("shoppinglist/archive", dtoIn);

        let result = await TestHelper.executePostCommand("shoppinglist/delete", dtoIn);

        expect(result.data.uuAppErrorMap).toEqual({});
    });

    test("A1 - missing dtoIn", async () => {
        await TestHelper.login("Authorities");

        expect.assertions(2);
        try {
            await TestHelper.executePostCommand("shoppinglist/delete", null);
        } catch (e) {
            expect(e.code).toEqual("uun-shoppinglist-main/shoppinglist/delete/invalidDtoIn");
            expect(e.message).toEqual("DtoIn is not valid.");
        }
    });

    test("A2 - dtoIn doesn't contain id", async () => {
        await TestHelper.login("Authorities");

        expect.assertions(2);
        try {
            await TestHelper.executePostCommand("shoppinglist/delete", {});
        } catch (e) {
            expect(e.code).toEqual("uun-shoppinglist-main/shoppinglist/delete/invalidDtoIn");
            expect(e.message).toEqual("DtoIn is not valid.");
        }
    });

    test("A3 - shopping list doesn't exist", async () => {
        await TestHelper.login("Authorities");

        expect.assertions(2);
        try {
            await TestHelper.executePostCommand("shoppinglist/delete", { id: "5e3c5f6f7b4e1d1dd4b4e1d1" });
        } catch (e) {
            expect(e.code).toEqual("uun-shoppinglist-main/shoppinglist/delete/shoppinglistDoesNotExist");
            expect(e.message).toEqual("Shoppinglist does not exist.");
        }
    });

    test("A4 - shopping list is not archived", async () => {
        await TestHelper.login("Authorities");
        let list = await TestHelper.executePostCommand("shoppinglist/create", LIST1);
        let dtoIn = {
            id: list.id
        };

        expect.assertions(2);
        try {
            await TestHelper.executePostCommand("shoppinglist/delete", dtoIn);
        } catch (e) {
            expect(e.code).toEqual("uun-shoppinglist-main/shoppinglist/delete/shoppinglistIsNotArchived");
            expect(e.message).toEqual("Shoppinglist is not archived.");
        }
    });

    test("A5 - user is not authorized", async () => {
        // pouziti RIMO uctu pro vytvoreni listu z jine uuIdentity
        await TestHelper.login("AuthoritiesRIMO");
        let list = await TestHelper.executePostCommand("shoppinglist/create", LIST1);
        let dtoIn = {
            id: list.id
        };

        await TestHelper.login("Authorities");
        expect.assertions(2);
        try {
            await TestHelper.executePostCommand("shoppinglist/delete", dtoIn);
        } catch (e) {
            expect(e.code).toEqual("uun-shoppinglist-main/shoppinglist/delete/userNotAuthorized");
            expect(e.message).toEqual("User is not authorized.");
        }
    });
});