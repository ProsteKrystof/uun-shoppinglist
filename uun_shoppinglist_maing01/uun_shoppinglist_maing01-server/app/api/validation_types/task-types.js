/* eslint-disable */

const taskCreateDtoInType = shape({
    listId: id().isRequired(),
    name: string(3, 255).isRequired()
});

const taskDeleteDtoInType = shape({
    id: id().isRequired()
});

const taskFinishDtoInType = shape({
    id: id().isRequired()
});

const taskGetDtoInType = shape({
    id: id().isRequired()
});

const taskListDtoInType = shape({
    listId: id().isRequired(),
    pageInfo: shape({
        pageIndex: integer().isRequired(),
        pageSize: integer().isRequired()
    }).isRequired()
});