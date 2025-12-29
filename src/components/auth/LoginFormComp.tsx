'use client';

import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type loginForm, loginFormSchema } from "./FormSchema";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { portal } from "@/data/auths/auths";
import { ShacdnLogin } from "./ShacdnLogin";
import axios, { isAxiosError } from "axios";
import Link from "next/link";
import { toast } from "sonner";

export function LoginFormComp() {
    const [loading, setLoading] = useState(false);
    const useNavigate = useRouter();


    const form = useForm<loginForm>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })


    async function onSubmit(data: loginForm) {
        try {
            setLoading(true);

            const res = await axios.post(`https://socket-backend-gp0t.onrender.com/auth/sign-in`, data);

            const user = res.data.registeredUser;

            localStorage.setItem('user_id', user._id);
            localStorage.setItem('user-first-name', user.firstName);
            localStorage.setItem('user-last-name', user.lastName);
            localStorage.setItem('user-email', user.email);
            localStorage.setItem('user-gender', user.gender);

            const id = user._id;

            toast.success("Login successful", res.data.message);

            axios.put(`https://socket-backend-gp0t.onrender.com/auth/${id}`, { login: true })
           .catch(() => console.warn("loginStatus update failed"));

            useNavigate.push('/home');

        } catch (error) {
            let err = 'An error has occurred';
            if (isAxiosError(error)) err = error.response?.data.message;
            toast.error(err);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {portal.map((el) => (
                        <div key={el.name}>
                            <ShacdnLogin {...el} control={form.control} />
                        </div>
                    ))}
                    <Button
                        className={`w-full cursor-pointer hover:bg-blue-600 hover:text-black ${loading ? 'bg-green-600' : 'bg-red-500'
                            }`}
                        type="submit"
                    >
                        {loading ? 'Loading...' : 'Submit'}
                    </Button>

                    <Link href='/'>
                        <div className="flex justify-center gap-1.5">
                            <span className="underline underline-offset-1 text-center">
                                <strong>Don't have an account!</strong>
                            </span>
                            <span className="underline underline-offset-1 text-green-950">
                                <strong>sign up</strong>
                            </span>
                        </div>
                    </Link>

                </form>
            </Form>
        </div>
    )
} 