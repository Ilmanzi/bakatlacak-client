import { TypeAnimation } from 'react-type-animation';

export default function TypeAnimate() {
    return (
        <>
            <TypeAnimation
                sequence={[
                    // Same substring at the start will only be typed once, initially
                    'Backend Developer',
                    3000,
                    'Frontend Developer',
                    3000,
                    'Digital Marketing',
                    3000,
                    'Data Analyst',
                    3000,
                    'Data Science',
                    3000,
                    'Product Manager',
                    3000,
                    'UI / UX Designer',
                    3000,
                    'Social Media Expert',
                    3000,
                ]}
                speed={10}
                className="sm:text-3xl md:text-4xl lg:text-7xl"
                repeat={Infinity}
            />
        </>
    )
}