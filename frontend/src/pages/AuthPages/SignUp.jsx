import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import axios from "axios"
import { Eye, EyeOff } from "lucide-react"

export default function SignupForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", form)
      console.log(res.data)
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-8 py-12">
        <div className="w-full max-w-sm space-y-6 border border-gray-200 rounded-2xl px-8 py-10 shadow-sm">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-500 mt-1 text-sm">Sign up to start shopping</p>
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-md">{error}</p>
          )}

          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+92 300 1234567"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button className="w-full" onClick={handleSubmit} disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
          </div>

          <p className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-black font-medium underline">
              Login
            </a>
          </p>
        </div>
      </div>

      {/* Right Side - Gradient */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-gray-900 to-gray-700 flex-col items-center justify-center text-white px-12">
        <div className="space-y-6 text-center">
          <div className="text-6xl">🛍️</div>
          <h2 className="text-4xl font-bold">Welcome to OneBuy</h2>
          <p className="text-gray-300 text-lg">
            Discover thousands of products at unbeatable prices. Shop smarter, live better.
          </p>
          <div className="flex flex-col gap-3 mt-6 text-left">
            <div className="flex items-center gap-3">
              <span className="text-green-400 text-xl">✓</span>
              <span className="text-gray-200">Free delivery on orders above Rs. 2000</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-400 text-xl">✓</span>
              <span className="text-gray-200">Easy 7-day returns</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-400 text-xl">✓</span>
              <span className="text-gray-200">100% secure payments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}