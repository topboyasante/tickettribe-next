export {default} from "next-auth/middleware"


//sets the pages we want to authenticate
export const config = {
    matcher:["/events/:path*","/tickets/:path*","/profile/:path*","/settings/:path*"]
}