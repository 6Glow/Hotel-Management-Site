export {default} from 'next-auth/middleware';

export const config = {
    mather: ["/user/:path*, '/api/:path*"], 
};