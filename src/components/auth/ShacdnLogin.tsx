import { userLogin } from "@/data/auths/auths";
import { Control } from "react-hook-form";
import { loginForm } from "./FormSchema";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useState } from "react";

interface applyNowProps extends userLogin {
    control: Control<loginForm>;
}

export function ShacdnLogin({
    name,
    label,
    holder,
    required,
    type,
    control
}: applyNowProps) {
    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(!show);
    };

    const renderFormComp = () => {
        switch (type) {
            case "text":
                return (
                    <FormField
                        control={control}
                        name={name as keyof loginForm}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{label}</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={holder}
                                        {...field}
                                        type="text"
                                        required={required}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                );

            case "password":
                return (
                    <FormField
                        control={control}
                        name={name as keyof loginForm}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{label}</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            placeholder={holder}
                                            {...field}
                                            required={required}
                                            type={show ? "text" : "password"}
                                            className="pl-9"
                                        />
                                        <div
                                            onClick={handleShow}
                                            className="absolute top-2 right-3 cursor-pointer rounded-full"
                                        >
                                            {show ? (
                                                <Eye className="h-5 w-5" />
                                            ) : (
                                                <EyeOff className="h-5 w-5" />
                                            )}
                                        </div>
                                        <LockKeyhole className="w-5 h-5 absolute top-2 left-2" />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                );
            default:
                return null;
        }
    };

    return renderFormComp()
}