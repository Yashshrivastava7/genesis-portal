'use server'
import { PrismaClient } from "@prisma/client";

export default async function submitProfile(props: any) {
    console.log(props)
    let user = null;

    const name = props.firstname + " " + props.lastname;
    const prisma = new PrismaClient();
    try {
         user = await prisma.user.update({
            where: {
                email: props.email
            },
            data: {
                name,
                gender: props.gender,
                number: props.number,
                linkedinlink: props.linkedin,
                githublink: props.github
            } as any
            
        })
    } catch (error) {
        console.log(error)
        return { message: "error" }
    }


    prisma.$disconnect(); 
    return { message: "success" }
} 