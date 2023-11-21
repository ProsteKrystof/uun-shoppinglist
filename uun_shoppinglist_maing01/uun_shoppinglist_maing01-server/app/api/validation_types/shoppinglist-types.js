/* eslint-disable */
const listColors = [
    "light-blue",
    "blue",
    "dark-blue",
    "dark-purple",
    "cyan",
    "dark-green",
    "green",
    "light-green",
    "pink",
    "red",
    "orange",
    "yellow",
    "purple",
    "brown",
    "steel",
    "grey"
];

const shoppinglistCreateDtoInType = shape({
    name: string(3, 255).isRequired(),
    color: oneOf(listColors).isRequired(),
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
    color: oneOf(listColors).isRequired()
});

const shoppinglistGetDtoInType = shape({
    listId: id().isRequired()
});

const shoppinglistListDtoInType = shape({
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