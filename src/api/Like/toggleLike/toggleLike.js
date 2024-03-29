import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        toggleLike: async (_, args, { request }) => {
            isAuthenticated(request);
            const { postId } = args;
            const { user } = request;
            const filterOptions = {
                AND: [
                    {
                        user: {
                        id: user.id
                        }
                    },
                    {
                        post: {
                            id: postId
                        }
                    }
                ]
            };
            const existingLike = await prisma.$exists.like(filterOptions);
            try{
                if(existingLike) {
                    // TO DO
                    await prisma.deleteManyLikes(filterOptions);
                } else {
                    const newLike = await prisma.createLike({
                        user: {
                            connect: {
                                id: user.id 
                            }
                        },
                        post: {
                            connect: {
                                id: postId
                            }
                        }
                    
                    });
                }
                return true;
            }catch{
                return false;
            }
        }
    }
};