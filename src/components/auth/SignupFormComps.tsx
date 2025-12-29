'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type signupForm, signupFormSchema } from "./FormSchema";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { signUp } from "@/data/auths/auths";
import { ShacdnSignup } from "./ShacdnSignup";
import axios, { isAxiosError } from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

export function SignupFormComps() {
    const [loading, setLoading] = useState(false);
    const useNavigate = useRouter();

    const form = useForm<signupForm>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            email: '',
            password: '',
            gender: '',
            firstName: '',
            lastName: ''
        }
    })

    async function onSubmit(data: signupForm) {
        console.log('values', data);
        try {
            setLoading(true);
            const res = await axios.post('https://socket-backend-gp0t.onrender.com/auth/create', data);
            console.log('res', res);
            if (res) {
                toast.success(res.data.message);
                useNavigate.push('/login');
            }

        } catch (error) {
            console.log(error);
            let err = 'An error has occur'
            if (isAxiosError(error)) {
                err = error.response?.data.message;
                toast.error(err);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    {signUp.map((el) => (
                        <div key={el.name}>
                            <ShacdnSignup {...el} control={form.control} />
                        </div>
                    ))}
                    <Button
                        className={`w-full hover:bg-blue-600 hover:text-black ${loading ? 'bg-green-600' : 'bg-gray-800'
                            }`}
                        type="submit"
                    >
                        {loading ? 'Loading...' : 'Submit'}
                    </Button>

                    <Link href='/login'>
                        <div className="flex flex-wrap lg:flex justify-center gap-1.5 pb-8">
                            <span className="underline underline-offset-1 text-center">
                                <strong>Already have an account!</strong>
                            </span>
                            <span className="underline underline-offset-1 text-green-950">
                                <strong>sign in</strong>
                            </span>
                        </div>
                    </Link>
                </form>
            </Form>
        </div>
    )
}