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
    memberIdentities: array(uuIdentity().isRequired()).isRequired()
});

const shoppinglistArchiveDtoInType = shape({
    id: id().isRequired()
});

const shoppinglistDeleteDtoInType = shape({
    id: id().isRequired()
});

const shoppinglistUpdateDtoInType = shape({
    id: id().isRequired(),
    name: string(3, 255).isRequired(),
    color: oneOf(listColors).isRequired()
});

const shoppinglistGetDtoInType = shape({
    id: id().isRequired()
});

const shoppinglistListDtoInType = shape({
    pageInfo: shape({
        pageIndex: integer().isRequired(),
        pageSize: integer().isRequired()
    }).isRequired()
});

const shoppinglistSetMembersDtoInType = shape({
    id: id().isRequired(),
    memberIdentities: array(uuIdentity().isRequired()).isRequired()
});

const shoppinglistLeaveDtoInType = shape({
    id: id().isRequired()
});