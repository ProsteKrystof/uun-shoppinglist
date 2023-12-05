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

const LIST2 = {
    name: "List 2",
    color: "red",
    memberIdentities: []
}

const LIST3 = {
    name: "List 3",
    color: "red",
    memberIdentities: []
}

describe("Shoppinglist List uuCmd tests", () => {
    test("HDS", async () => {
        await TestHelper.login("Authorities");
        await TestHelper.executePostCommand("shoppinglist/create", LIST1);
        await TestHelper.executePostCommand("shoppinglist/create", LIST2);
        await TestHelper.executePostCommand("shoppinglist/create", LIST3);

        let dtoIn = {
            pageInfo: {
                pageIndex: 0,
                pageSize: 100
            }
        };
        let result = await TestHelper.executeGetCommand("shoppinglist/list", dtoIn);

        expect(result.data.pageInfo.total).toEqual(3);
        expect(result.data.pageInfo.pageIndex).toEqual(0);
        expect(result.data.pageInfo.pageSize).toEqual(100);
    });

    test("A1 - missing dtoIn", async () => {
        await TestHelper.login("Authorities");

        expect.assertions(2);
        try {
            await TestHelper.executeGetCommand("shoppinglist/list", null);
        } catch (e) {
            expect(e.code).toEqual("uun-shoppinglist-main/shoppinglist/list/invalidDtoIn");
            expect(e.message).toEqual("DtoIn is not valid.");
        }
    });

    test("A2 - dtoIn.pageInfo is not valid", async () => {
        await TestHelper.login("Authorities");

        expect.assertions(2);
        try {
            let dtoIn = {
                pageInfo: {
                    pageIndex: 0
                }
            };
            await TestHelper.executeGetCommand("shoppinglist/list", dtoIn);
        } catch (e) {
            expect(e.code).toEqual("uun-shoppinglist-main/shoppinglist/list/invalidDtoIn");
            expect(e.message).toEqual("DtoIn is not valid.");
        }
    });
});