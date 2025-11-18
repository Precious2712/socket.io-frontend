export interface userSignup {
    name: string;
    label: string;
    holder: string;
    required: boolean;
    type: string;
    options?: string[];
    description: string;
}

export const signUp: userSignup[] = [
    {
        name: "email",
        label: "Email Address",
        holder: "Enter your email address",
        required: true,
        type: "text",
        description: 'This is your email'
    },
    {
        name: "password",
        label: "Password",
        holder: "Enter your password",
        required: true,
        type: "password",
        description: 'This is your password'
    },
    {
        name: "gender",
        label: "Gender",
        holder: "Select your gender",
        required: true,
        type: "select",
        options: ["Male", "Female"],
        description: 'This is your gender'
    },
    {
        name: "firstName",
        label: "FirstName",
        holder: "Enter your first name",
        required: true,
        type: "text",
        description: 'This is your first name'
    },
    {
        name: "lastName",
        label: "LastName",
        holder: "Enter your first name",
        required: true,
        type: "text",
        description: 'This is your first name'
    },
];

export interface userLogin {
    name: string;
    label: string;
    holder: string;
    required: boolean;
    type: string;
}

export const portal: userLogin[] = [
    {
        name: "email",
        label: "Email Address",
        holder: "Enter your email address",
        required: true,
        type: "text",
    },
    {
        name: "password",
        label: "Password",
        holder: "Enter your password",
        required: true,
        type: "password",
    },
]
