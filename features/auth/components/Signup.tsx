"use client"
import z from "zod"
import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    CardFooter,
    CardAction,
    Card

} from "@/components/ui/card"
import {useForm} from "react-hook-form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import maggie_logo from "@/public/maggie_logo.svg"
import Link from "next/link";
import { authClient } from "@/lib/auth-client"
import { FormEvent } from "react"
import google_logo from "@/public/google_logo.svg"
import github_logo from "@/public/github_logo.svg"
import { useRouter } from "next/navigation"
import { toast } from "sonner"




const signupSchema=z.object({
    email:z.email(),
    password:z.string().min(8,"Password should be of minimum 8 characters"),
    confirmPassword:z.string()
}).refine((data)=>data.password===data.confirmPassword,{
  message:"Password do not match",
  path:['confirmPassword']
})

type signUpData=z.infer<typeof signupSchema>

function Signup() {
  const router=useRouter()

    const form = useForm({
        resolver:zodResolver(signupSchema),
        mode:"onChange",
        defaultValues:{
            email:"",
            password:"",
            confirmPassword:""
        }
    })
    const onSubmit=async(data:signUpData)=>{
      await authClient.signUp.email({
        name:data.email,
        email:data.email,
        password:data.password
      },
      {
        onSuccess:()=>{
          router.push("/")
        },
        onError:(err)=>{
          toast.error(err.error.message)
        }
      }

    )
    }

    const isPending=form.formState.isSubmitting


  return (
    <div className="justify-center items-center flex flex-col min-h-screen min-w-screen">
      <div className="flex justify-around mb-2">
        <Image src={maggie_logo} alt="Logo" width={50} height={50} />
        <h2 className="text-2xl font-bold">Welcome to Maggie</h2>
      </div>

    <Card className="w-full max-w-sm flex ">
      <CardHeader>
        <CardTitle>Sign up for an account</CardTitle>
        <CardDescription>
          Enter your email below to create an account
        </CardDescription>
        <CardAction>
          <Button asChild variant="link" className="group no-underline hover:no-underline px-0">
            <Link href="/login">
              <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-full after:origin-center after:scale-x-100 after:bg-primary after:transition-transform after:duration-300 group-hover:after:scale-x-0">
                LogIn
              </span>
            </Link>
          </Button>
        </CardAction>
      </CardHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.email.message}
                </p>
              )}

            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required placeholder="Password" {...form.register("password")}/>
              {form.formState.errors.password && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
              </div>
              <Input id="confirmPassword" type="password" required placeholder="********" {...form.register("confirmPassword")}/>
              {form.formState.errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
          </CardContent>
          <CardFooter className="flex-col gap-2 bg-gray-200 mt-2">
            <Button type="submit" className="w-full bg-amber-500" disabled={isPending}>
              Register
            </Button>
            <Button type='button' variant="outline" className="w-full ">
              <Image src={google_logo} alt="Google Logo" width={20} height={20} />
                Login with Google
            </Button>
            <Button type='button' variant="outline" className="w-full ">
              <Image src={github_logo} alt="Github Logo" width={20} height={20} />
                Login with Github
            </Button>
          </CardFooter>
        </form>
    </Card>
    </div>

  )
}

export default Signup

