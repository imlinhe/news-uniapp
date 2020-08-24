'use strict';
const db = uniCloud.database()

exports.main = async (event, context) => {
	const label = await db.collection('label').get()
	
	//返回数据给客户端
	return {
		code: 200,
		message: '数据请求成功',
		data: label.data
	}
};
