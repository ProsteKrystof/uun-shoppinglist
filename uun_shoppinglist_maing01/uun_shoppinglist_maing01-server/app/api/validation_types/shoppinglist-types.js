/* eslint-disable */

const shoppinglistCreateDtoInType = shape({
    name: string(3, 255).isRequired(),
    color: string(3, 255).isRequired(),
    members: array(shape({
        identity: uuIdentity().isRequired(),
        name: string(3, 255).isRequired()
    })).isRequired()
});

const shoppinglistArchiveDtoInType = shape({
    listId: id().isRequired()
});

const shoppinglistDeleteDtoInType = shape({
    listId: id().isRequired()
});

const shoppinglistUpdateDtoInType = shape({
    listId: id().isRequired(),
    name: string(3, 255).isRequired(),
    color: string(3, 255).isRequired()
});

const shoppinglistGetDtoInType = shape({
    listId: id().isRequired()
});

const shoppinglistListDtoInType = shape({
    uuIdentity: uuIdentity().isRequired(),
    pageInfo: shape({
        pageIndex: integer().isRequired(),
        pageSize: integer().isRequired()
    }).isRequired()
});

const shoppinglistSetMembersDtoInType = shape({
    listId: id().isRequired(),
    members: array(shape({
        identity: uuIdentity().isRequired(),
        name: string(3, 255).isRequired()
    })).isRequired()
});