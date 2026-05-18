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

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-16">
          <h1 className="text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
            Next.js Learning Journey
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            This project is a deep dive into the world of Next.js, exploring the intersection of modern frontend architecture and robust backend logic.
          </p>
        </header>

        {/* Learning Objectives Grid */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 border-b border-gray-800 pb-4 flex items-center gap-3">
            <span className="text-blue-500">01.</span> Core Concepts Explored
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-blue-500/50 transition-all group">
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">App Router</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Mastering file-based routing with layouts, nested routes, and specialized files like `error.tsx` and `loading.tsx`.</p>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-purple-500/50 transition-all group">
              <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">Server Components</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Leveraging React Server Components (RSC) to reduce client-side bundle size and improve initial load performance.</p>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-green-500/50 transition-all group">
              <h3 className="text-xl font-bold mb-3 group-hover:text-green-400 transition-colors">Route Handlers</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Building secure API endpoints directly within the Next.js app to handle authentication and database operations.</p>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-yellow-500/50 transition-all group">
              <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-400 transition-colors">JWT Auth</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Implementing stateless authentication with JSON Web Tokens stored in secure, HTTP-only cookies.</p>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-pink-500/50 transition-all group">
              <h3 className="text-xl font-bold mb-3 group-hover:text-pink-400 transition-colors">DB Integration</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Connecting Next.js with MongoDB using Mongoose, ensuring efficient connection pooling in serverless environments.</p>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-cyan-500/50 transition-all group">
              <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">Edge Middleware</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Using middleware to protect routes and handle redirects before the application renders on the client.</p>
            </div>
          </div>
        </section>

        {/* Technical Documentation Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 border-b border-gray-800 pb-4 flex items-center gap-3">
            <span className="text-purple-500">02.</span> Implementation Deep Dive
          </h2>
          
          <div className="space-y-12">
            {/* DB Architecture */}
            <div className="bg-zinc-900/50 rounded-3xl p-8 border border-zinc-800">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Database Singleton Pattern</h3>
              <p className="text-gray-400 mb-6 max-w-2xl">
                To prevent multiple connections during hot-reloads and serverless invocations, a singleton pattern is used to check for an existing connection state before establishing a new one.
              </p>
              <pre className="bg-black/80 p-6 rounded-xl border border-zinc-700 text-sm text-blue-200 overflow-x-auto">
                <code>{db_connection}</code>
              </pre>
            </div>

            {/* Auth Logic */}
            <div className="bg-zinc-900/50 rounded-3xl p-8 border border-zinc-800">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Authentication Flow (Login)</h3>
              <p className="text-gray-400 mb-6 max-w-2xl">
                The login process involves credential verification against hashed passwords, followed by the generation of a signed JWT token that is delivered via a secure cookie.
              </p>
              <pre className="bg-black/80 p-6 rounded-xl border border-zinc-700 text-sm text-purple-200 overflow-x-auto">
                <code>{login_route}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-20 border-t border-zinc-900">
          <p className="text-zinc-500 mb-2">Designed for the pursuit of Next.js mastery.</p>
          <div className="flex justify-center gap-6 text-zinc-400 text-sm">
            <span>Next.js 15+</span>
            <span>•</span>
            <span>TypeScript</span>
            <span>•</span>
            <span>Tailwind CSS</span>
            <span>•</span>
            <span>MongoDB</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
