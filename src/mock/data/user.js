import Mock from 'mockjs'

const Random = Mock.Random 
const code = 200 

// 随机生成文章数据
export default const userData = req => {
    let posts = [] 

    for (let i = 0; i < 10; i++) {
        let post = {
            name: Random.cname(), 
            addr: Mock.mock('@county(true)'), 
            
        }

        posts.push(post)
    }

    return {
        code,
        posts
    }
}