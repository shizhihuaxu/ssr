import Mock from 'mockjs'

const Random = Mock.Random 
const code = 200 

// 随机生成文章数据
export const itemData = req => {
    let post = {
        title: Random.csentence(4, 15), 
        icon: Random.dataImage('250x250', '文章icon'), 
        author: Random.cname(), 
        date: Random.date() + ' ' + Random.time() 
    }

    return {
        code,
        post
    }
}