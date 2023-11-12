/* eslint-disable */

const taskCreateDtoInType = shape({
    listId: id().isRequired(),
    name: string(3, 255).isRequired(),
    addedBy: string(3, 255).isRequired()
});

const taskDeleteDtoInType = shape({
    taskId: id().isRequired()
});

const taskFinishDtoInType = shape({
    taskId: id().isRequired()
});

const taskGetDtoInType = shape({
    taskId: id().isRequired()
});

const taskListDtoInType = shape({
    listId: id().isRequired(),
    pageInfo: shape({
        pageIndex: integer().isRequired(),
        pageSize: integer().isRequired()
    }).isRequired()
});