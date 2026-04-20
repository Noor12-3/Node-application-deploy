import { currentUser } from "@clerk/nextjs/server";
import { NextRequest , NextResponse } from "next/server";
import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
export async function POST(req:NextRequest) {
     const user=await currentUser();
    
     try{
    //  chheck if user already esixt
     const users = await db.select().from (usersTable)
//      @ts-ignore
     .where(eq(usersTable.email,user?.primaryEmailAddress?.emailAddress));
     if(users?.length == 0){
         const result=await db.insert(usersTable).values({
                name:user?.fullName,
                email:user?.primaryEmailAddress?.emailAddress,
                credits:10
         }).returning({ usersTable })
     return NextResponse.json(result[0].usersTable)

     }

     return NextResponse.json(users[0])
    // if not then create new user
 }
 catch (e) {
         return NextResponse.json(e);
 }
}