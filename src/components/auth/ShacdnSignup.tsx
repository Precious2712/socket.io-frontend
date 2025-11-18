import { userSignup } from "@/data/auths/auths";
import { Control } from "react-hook-form";
import { signupForm } from "./FormSchema";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { signUp } from "@/data/auths/auths";

interface applyNowProps extends userSignup {
    control: Control<signupForm>;
}

export function ShacdnSignup({
    name,
    label,
    holder,
    required,
    type,
    control,
    description,
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
                        name={name as keyof signupForm}
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
                                <FormDescription>{description}</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                );

            case "password":
                return (
                    <FormField
                        control={control}
                        name={name as keyof signupForm}
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

            case "select":
                return (
                    <FormField
                        control={control}
                        name={name as keyof signupForm}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{label}</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder={holder} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Gender</SelectLabel>
                                                {signUp[2].options?.map((el, i) => (
                                                    <SelectItem key={i} value={el}>
                                                        {el}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormDescription>{description}</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                );

            default:
                return null;
        }
    };

    return <div>{renderFormComp()}</div>;
}