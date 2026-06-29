import dbConnect from "@/lib/dbConnect";

export async function GET(){
    try {
        console.log('Testing mongodb connection...')
        await dbConnect();
        console.log('mongodb test route completed')
        return Response.json({
            success: true,
            message: "Mongodb connected successfully."
        })
        
    } catch (error) {
        console.error("mongodb connection test failed", error);
        return Response.json({
            success: false,
            message: "Mongodb Connection failed"
        },{status: 500})
    }
}