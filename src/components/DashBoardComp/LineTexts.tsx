

import { motion, Variants } from "framer-motion";

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

interface AnimatedTextProps {
    text: string;
    className?: string;
}

export const LineText = ({ text, className }: AnimatedTextProps) => {
    return (
        <p className={className} style={{ display: "inline-block" }}>
            {text.split("").map((char, i) => (
                <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariant}
                    animate="animate"
                    style={{ display: "inline-block", marginRight: "3px"  }}
                >
                    {char}
                </motion.span>
            ))}
        </p>
    );
};
