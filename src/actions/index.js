
export const ADD = 'add'
export const add = e => (
    {
    type: ADD,
    title: e.target.previousElementSibling.value,
    }
)

export const REMOVE = 'remove'
export const remove = index => ({
    type: REMOVE,
    index: index,
})

export const CHANGEISDONE = 'changeIsDone'
export const changeIsDone = (index) => ({
    type: CHANGEISDONE,
    index: index,
})
