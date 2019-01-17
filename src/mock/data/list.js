import Mock from 'mockjs'

const Random = Mock.Random 
const code = 200 

// 随机生成文章数据
export const listData = req => {
    // let posts = [] 

    // for (let i = 0; i < 10; i++) {
    //     let post = {
    //         title: Random.csentence(4, 15), 
    //         icon: Random.dataImage('250x250', '文章icon'), 
    //         author: Random.cname(), 
    //         date: Random.date() + ' ' + Random.time() 
    //     }

    //     posts.push(post)
    // }

    // return {
    //     code,
    //     posts
    // }
    return [
            {   
                id: 1,
                title: 'test title',
                author: 'zhangsan',
                create_time: ''
            }
        ]
}