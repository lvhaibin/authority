// 生成 XXX_REQUEST XXX_SUCCESS XXX_FAILURE
export default function(startStr) {
    const ary = ['_REQUEST', '_SUCCESS', '_FAILURE'];
    const result = {};
    if (!startStr) {
        throw new Error('action 参数缺失！');
    }
    if (Array.isArray(startStr)) {
        for (const str of startStr) {
            for (const item of ary) {
                const val = str + item;
                result[val] = null;
            }
        }
    } else {
        for (const item of ary) {
            const val = startStr + item;
            result[val] = null;
        }
    }
    return result;
}