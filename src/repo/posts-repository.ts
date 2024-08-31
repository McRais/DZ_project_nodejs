import {PostsType, postsDB, blogsDB} from "../database/DB";

export class postsRepo {

    static getAllPosts(){
        return postsDB
    }

    static getPostById(id:string){
        const post = postsDB.find((post) => post.id === id)
        if (!post){return false}
        return post
    }

    static createNewPost(title:string, shortDescription:string, content:string, blogId: string) {
        //find the name of the blog
        const blog = blogsDB.find((blog) => blog.id === blogId)
        if(!blog){throw new Error("No Blog")}

        const newPost: PostsType = {
            id: Date.now().toString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blog.name
        }
        postsDB.push(newPost)
        return newPost
    }

    static deletePost(id:string) {
        const post = postsDB.find((post) => post.id === id)
        if (!post){return false}
        const index = postsDB.findIndex(post => post.id === id);
        postsDB.splice(index, 1);
        return true
    }

    static updatePost(id: string, title:string, shortDescription:string, content:string, blogId: string) {
        const index = postsDB.findIndex(post => post.id === id);
        //find the name of new blog
        const blog = blogsDB.find((blog) => blog.id === blogId)
        if(!blog){throw new Error("No Blog")}

        postsDB[index].title = title
        postsDB[index].shortDescription = shortDescription
        postsDB[index].content = content
        postsDB[index].blogId = blogId
        postsDB[index].blogName=blog.name

        return postsDB[index]
    }

}

