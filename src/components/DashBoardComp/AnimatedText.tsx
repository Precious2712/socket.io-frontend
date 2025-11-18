
import { motion, Variants } from "framer-motion";

// ✅ Define the variant FIRST
const letterVariant: Variants = {
    animate: (i: number) => ({
        color: ["#0f5132", "#1e3a8a", "#dc2626", "#0f5132"],
        transition: {
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.15,
        },
    }),
};

// ✅ Properly typed props
interface AnimatedTextProps {
    text: string;
    className?: string;
}

// ✅ No more TypeScript errors
export const AnimatedText = ({ text, className }: AnimatedTextProps) => {
    return (
        <h1 className={className} style={{ display: "inline-block" }}>
            {text.split("").map((char, i) => (
                <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariant}
                    animate="animate"
                    style={{ display: "inline-block" }}
                >
                    {char}
                </motion.span>
            ))}
        </h1>
    );
};
