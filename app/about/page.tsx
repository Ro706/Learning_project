export default function About() {

  const db_connection = `
import mongoose from 'mongoose';

export async function connect() {
    try {
        if (mongoose.connection.readyState >= 1) {
            return;
        }
        await mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });
        connection.on('error', (err) => {
            console.error('MongoDB connection error: ' + err);
            process.exit();
        });
    } catch (error) {
        console.error("Something went wrong!");
        console.error(error);
    }
}
`;

  const model_code = `
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    IsAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});
`;

  const login_route = `
export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json()
        const {email,password} = reqBody

        const user = await UserModel.findOne({email})
        if(!user) return NextResponse.json({error: "User not found"}, {status: 400})

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) return NextResponse.json({error: "Invalid password"}, {status: 400})

        const tokenData = { id:user._id, username: user.username, email: user.email }
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1h" });

        const response = NextResponse.json({ message: "Login successful", success: true }) 
        response.cookies.set("token", token, { httpOnly: true })
        return response;
    } catch(error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
`;

  const signup_route = `
export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json()
        const {username,email,password} = reqBody

        const user = await UserModel.findOne({email})
        if(user) return NextResponse.json({error: "User exists"}, {status: 400})

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new UserModel({ username, email, password: hashedPassword })
        const savedUser = await newUser.save() 
        
        return NextResponse.json({ message: "User created", success: true, savedUser })   
    } catch(error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
`;

  const logout_route = `
export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        });
        response.cookies.set("token", "", { 
            httpOnly: true, 
            expires: new Date(0) 
        });
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
`;

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Codebase Technical Documentation
        </h1>
        <p className="text-center text-gray-400 mb-12">Detailed analysis and implementation of the authentication system.</p>

        <div className="space-y-16">
          {/* Section 1: DB */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-1 bg-blue-500 rounded-full"></div>
              <h2 className="text-3xl font-bold">Database Architecture</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-blue-400">Connection Logic</h3>
                <p className="text-gray-400 mb-4 text-sm">Uses a singleton pattern to maintain a single MongoDB connection across serverless invocations.</p>
                <pre className="bg-gray-950 p-4 rounded-xl border border-gray-800 text-xs text-blue-300 overflow-x-auto">
                  <code>{db_connection}</code>
                </pre>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-purple-400">User Schema</h3>
                <p className="text-gray-400 mb-4 text-sm">Defines properties for authentication, verification tokens, and administrative roles.</p>
                <pre className="bg-gray-950 p-4 rounded-xl border border-gray-800 text-xs text-purple-300 overflow-x-auto">
                  <code>{model_code}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Section 2: API Routes */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-1 bg-green-500 rounded-full"></div>
              <h2 className="text-3xl font-bold">API Route Implementation</h2>
            </div>
            
            <div className="space-y-10">
              <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
                <h3 className="text-2xl font-bold mb-4 text-green-400">1. Registration (Signup)</h3>
                <p className="text-gray-400 mb-6 italic">Validates user existence, salts and hashes the password, and persists the new user document.</p>
                <pre className="bg-black p-5 rounded-xl border border-gray-700 text-sm text-green-300 overflow-x-auto">
                  <code>{signup_route}</code>
                </pre>
              </div>

              <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
                <h3 className="text-2xl font-bold mb-4 text-yellow-400">2. Authentication (Login)</h3>
                <p className="text-gray-400 mb-6 italic">Verifies credentials, generates a JWT, and sets it as an HTTP-only cookie for secure session tracking.</p>
                <pre className="bg-black p-5 rounded-xl border border-gray-700 text-sm text-yellow-200 overflow-x-auto">
                  <code>{login_route}</code>
                </pre>
              </div>

              <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
                <h3 className="text-2xl font-bold mb-4 text-red-400">3. Termination (Logout)</h3>
                <p className="text-gray-400 mb-6 italic">Clears the authentication token by expiring the cookie immediately.</p>
                <pre className="bg-black p-5 rounded-xl border border-gray-700 text-sm text-red-300 overflow-x-auto">
                  <code>{logout_route}</code>
                </pre>
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-20 py-10 border-t border-gray-800 text-center">
          <p className="text-gray-600">This documentation is dynamically generated from the project's core files.</p>
        </footer>
      </div>
    </div>
  );
}