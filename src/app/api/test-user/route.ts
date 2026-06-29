import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET(){
    try {
        console.log('testing user model...')
        await dbConnect();
        const user = await User.findOneAndUpdate({email: "test@example.com"},{
            name: "Test User",
        email: "test@example.com",
        role: "customer",
        provider: "credentials",
        isActive: true,

        },
        {
        upsert: true,
    returnDocument: "after",
        });
        console.log('test user created:', user.email);
        return Response.json({
            success:true,
            message: 'user model is working',
            user
        });

        
    } catch (error) {
        console.error('user model test failed.', error);
        return Response.json(
      {
        success: false,
        message: "User model test failed",
      },
      { status: 500 }
    );
        
    }
}