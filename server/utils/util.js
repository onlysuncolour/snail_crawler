const Util = {
    getItemAndIndexFromArray(item, itemKey, array, arrayKey=itemKey, only=false) {
        let targetItem = array.filter(i => i[arrayKey] == item[itemKey])
        if (targetItem.length <= 1) {
            return {
                item: targetItem[0],
                index: array.indexOf(targetItem[0])
            }
        } else {
            if (only) {
                const result = targetItem.shift();
                targetItem.forEach(i => {
                    let index = array.indexOf(i)
                    array.splice(index, 1)
                })
                return result;
            }
            return targetItem.map(i => ({
                item: i,
                index: array.indexOf(i)
            }))
        }
    },
    replaceItemForArray(item, key, array) {
        let targetItem = array.filter(i => i[key] && i[key] == item[key])
        if (targetItem.length >= 1) {
            const replaceItem = targetItem.shift();
            array[array.indexOf(replaceItem)] = item
            targetItem.forEach(i => {
                let index = array.indexOf(i)
                array.splice(index, 1)
            })
        } else {
            array.push(item)
        }
    }
}

module.exports = Util
