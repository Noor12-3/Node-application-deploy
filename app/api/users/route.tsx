import { currentUser } from "@clerk/nextjs/server";
import { NextRequest , NextResponse } from "next/server";
import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
export async function POST(req:NextRequest) {
     const user=await currentUser();
    
     try{
    //  chheck if user already esixt
     const users = await db.select().from (usersTable)
     .where(eq(usersTable.email,user?.primaryEmailAddress?.emailAddress));
    // if not then create new user
 }
 catch (e) {
         return NextResponse.json(e);
 }
}