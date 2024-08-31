import {blogsDB, BlogsType, postsDB} from "../database/DB";

export class blogsRepo {

    static getAllBlogs(){
        return blogsDB
    }

    static getBlogById(id:string){
        const blog = blogsDB.find((blog) => blog.id === id)
        if (!blog){return false}
        return blog
    }

    static createNewBlog(name:string, description:string, websiteUrl:string) {
        const newBlog: BlogsType = {
            id: Date.now().toString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl
        }
        blogsDB.push(newBlog)
        return newBlog
    }

    static deleteBlog(id:string) {
        const blog = blogsDB.find((blog) => blog.id === id)
        if (!blog){return false}
        const index = blogsDB.findIndex(blog => blog.id === id);
        blogsDB.splice(index, 1);
        return true
    }

    static updateBlog(id: string, name:string, description:string, websiteUrl:string) {
        const blog = blogsDB.find((blog) => blog.id === id)
        if (!blog){return false}
        const index = blogsDB.findIndex(blog => blog.id === id);
        blogsDB[index].name = name
        blogsDB[index].description = description
        blogsDB[index].websiteUrl = websiteUrl

        postsDB.forEach((posts_inThatBlog) => {
            if(posts_inThatBlog.blogId === id){posts_inThatBlog.blogName = name}
        })

        return blogsDB[index]
    }

}

