import Link from 'next/link';

const BackToHomeButton = () => {
    return (
        <Link href="/" className="inline-block mt-6 px-4 py-2 bg-[#019992] text-white rounded-lg shadow hover:bg-[#017f7f]">
            Back to Homepage
        </Link>
    );
};

export default BackToHomeButton;